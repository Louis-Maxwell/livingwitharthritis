/** Arthritis support chat — Workers AI preferred, OpenAI-compatible fallback. */

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type EnvAI = {
  AI?: {
    run: (
      model: string,
      input: Record<string, unknown>,
    ) => Promise<ReadableStream | { response?: string } | string>;
  };
  OPENAI_API_KEY?: string;
  OPENAI_BASE_URL?: string;
  OPENAI_MODEL?: string;
};

/** Hard caps — charity-scale, keep costs and abuse low. */
export const MAX_CHAT_MESSAGE_CHARS = 2000;
export const MAX_CHAT_HISTORY = 10;
export const CHAT_PROVIDER_TIMEOUT_MS = 25_000;

export const SYSTEM_PROMPT = `You are the Living With Arthritis UK support assistant for registered charity 1218461 (Oswestry, England). You give clear, compassionate, UK-focused educational information about arthritis, frailty-related mobility challenges, and related joint health.

Tone: warm and human. Acknowledge that living with joint pain is exhausting and that the reader is not alone — without drama, pity, or invented testimonials. Prefer practical next steps they can try today. Prefer “we’re a young charity building this with you” honesty over scale claims.

Identity (accurate — do not invent a clinical team):
- Living With Arthritis is independent of Versus Arthritis / Arthritis UK.
- Founder clinician: Louis Maxwell, HCPC-registered physiotherapist (PH128483). There is no fake multi-clinician board — speak as the charity’s help assistant, not as a named clinician giving a personal consultation.
- Align general guidance with NICE / NHS where relevant; use UK English spelling. Motion is lotion — encourage gentle, paced movement when safe.

Hard rules:
- You are NOT a doctor and must NEVER prescribe, invent doses, or tell someone to start/stop/change medication.
- Never invent clinical doses, wait times, cure rates, donation percentages, clinic counts, or charity statistics.
- For medication questions (including methotrexate, NSAIDs, steroids, biologics): explain general categories and monitoring ideas only; always urge them to speak with their GP, pharmacist, or rheumatology team before changing anything.
- Prefer on-site guides with real paths when relevant: /diet, /exercises, /guides, /guides/benefits-pip, /blog, /search.
- If the user may be in an emergency (chest pain, sudden weakness, suicidal thoughts, hot swollen joint with fever), tell them to seek urgent NHS care (999 / 111 / A&E) and keep the reply short.
- Keep answers concise (roughly 150–350 words), use Markdown, and end medication-related answers with a short UK medical disclaimer.
- Optional visitor context may be supplied for personalisation (joints/conditions). Treat it as self-reported and incomplete; do not ask for NHS numbers or store PHI.`;

/** Build system prompt; optional client profileSummary is not persisted. */
export function buildSystemPrompt(profileSummary?: string): string {
  const trimmed = typeof profileSummary === "string" ? profileSummary.trim() : "";
  if (!trimmed) return SYSTEM_PROMPT;
  return (
    SYSTEM_PROMPT +
    "\n\nOptional visitor context (self-reported, may be incomplete — do not store; use only to tailor general guidance):\n" +
    trimmed.slice(0, 500)
  );
}

const DISCLAIMER =
  "\n\n---\n\n_Educational information only — not a prescription or personal medical advice. Speak with your GP, pharmacist or rheumatology team before changing medication or treatment._";

const SAFE_PROVIDER_ERROR =
  "The support assistant is temporarily unavailable. Please try again shortly, or browse /guides, /diet, /exercises, /blog, or /search.";

function needsMedDisclaimer(text: string): boolean {
  return /\b(medicin|medication|drug|dose|methotrexate|nsaid|ibuprofen|steroid|biologic|dmard|paracetamol|prescription|tablet|pill)\b/i.test(
    text,
  );
}

export function appendDisclaimerIfNeeded(answer: string, userText: string): string {
  if (answer.includes("not a prescription") || answer.includes("Educational information only")) {
    return answer;
  }
  if (needsMedDisclaimer(userText) || needsMedDisclaimer(answer)) {
    return answer.trimEnd() + DISCLAIMER;
  }
  return answer;
}

function sseData(obj: unknown): string {
  return `data: ${JSON.stringify(obj)}\n\n`;
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}

/** Parse OpenAI-style SSE into plain text chunks. */
async function* readOpenAiSse(
  stream: ReadableStream<Uint8Array>,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      if (signal?.aborted) {
        try {
          await reader.cancel("aborted");
        } catch {
          /* ignore */
        }
        throw new Error("stream aborted");
      }
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n");
      buffer = parts.pop() ?? "";
      for (const line of parts) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") return;
        try {
          const json = JSON.parse(payload) as {
            choices?: Array<{ delta?: { content?: string }; message?: { content?: string } }>;
            response?: string;
          };
          const delta =
            json.choices?.[0]?.delta?.content ??
            json.choices?.[0]?.message?.content ??
            json.response;
          if (delta) yield delta;
        } catch {
          // ignore partial JSON
        }
      }
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      /* ignore */
    }
  }
}

/** Parse Workers AI SSE / newline JSON stream. */
async function* readWorkersAiStream(
  stream: ReadableStream,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      if (signal?.aborted) {
        try {
          await reader.cancel("aborted");
        } catch {
          /* ignore */
        }
        throw new Error("stream aborted");
      }
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value as Uint8Array, { stream: true });
      const parts = buffer.split("\n");
      buffer = parts.pop() ?? "";
      for (const line of parts) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        const payload = trimmed.startsWith("data:") ? trimmed.slice(5).trim() : trimmed;
        if (payload === "[DONE]") return;
        try {
          const json = JSON.parse(payload) as { response?: string; text?: string };
          const chunk = json.response ?? json.text;
          if (chunk) yield chunk;
        } catch {
          // ignore
        }
      }
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      /* ignore */
    }
  }
}

function sseResponse(readable: ReadableStream, requestId?: string): Response {
  const headers: Record<string, string> = {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-store, no-transform",
    Connection: "keep-alive",
    // Discourage intermediary buffering so tokens reach the browser promptly.
    "X-Accel-Buffering": "no",
  };
  if (requestId) headers["x-request-id"] = requestId;
  return new Response(readable, { headers });
}

function pumpSse(
  requestId: string | undefined,
  run: (write: (obj: unknown) => Promise<void>) => Promise<void>,
): Response {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const write = async (obj: unknown) => {
    await writer.write(encoder.encode(sseData(obj)));
  };

  void (async () => {
    try {
      await run(write);
      await write({ type: "done" });
    } catch (err) {
      console.error("chat SSE pump failed", err);
      try {
        await write({ type: "error", error: SAFE_PROVIDER_ERROR });
      } catch {
        /* ignore */
      }
    } finally {
      try {
        await writer.close();
      } catch {
        /* ignore */
      }
    }
  })();

  return sseResponse(readable, requestId);
}

async function streamOpenAiCompatible(
  env: EnvAI,
  messages: ChatMessage[],
  requestId?: string,
): Promise<Response | null> {
  if (!env.OPENAI_API_KEY) return null;
  const base = (env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = env.OPENAI_MODEL || "gpt-4o-mini";

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CHAT_PROVIDER_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, messages, stream: true, temperature: 0.4 }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    const aborted =
      (err instanceof Error && err.name === "AbortError") || controller.signal.aborted;
    console.error("OpenAI-compatible fetch failed", aborted ? "timeout/abort" : err);
    throw new Error(aborted ? "provider_timeout" : "provider_unreachable");
  }

  // Keep abort armed while streaming so hung token streams die.
  if (!res.ok || !res.body) {
    clearTimeout(timer);
    const errText = await res.text().catch(() => "");
    console.error("OpenAI-compatible HTTP", res.status, errText.slice(0, 200));
    throw new Error("provider_http_error");
  }

  const userText = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const body = res.body;

  return pumpSse(requestId, async (write) => {
    let full = "";
    try {
      for await (const chunk of readOpenAiSse(body, controller.signal)) {
        full += chunk;
        await write({ type: "token", content: chunk });
      }
      const finalText = appendDisclaimerIfNeeded(full, userText);
      if (finalText.length > full.length) {
        await write({ type: "token", content: finalText.slice(full.length) });
      }
    } finally {
      clearTimeout(timer);
    }
  });
}

async function streamWorkersAi(
  env: EnvAI,
  messages: ChatMessage[],
  requestId?: string,
): Promise<Response | null> {
  if (!env.AI) return null;
  const model = "@cf/meta/llama-3.1-8b-instruct";
  const streamAbort = new AbortController();
  const streamTimer = setTimeout(() => streamAbort.abort(), CHAT_PROVIDER_TIMEOUT_MS);

  let result: ReadableStream | { response?: string } | string;
  try {
    result = await withTimeout(
      env.AI.run(model, {
        messages,
        stream: true,
        max_tokens: 900,
      }),
      CHAT_PROVIDER_TIMEOUT_MS,
      "Workers AI",
    );
  } catch (err) {
    clearTimeout(streamTimer);
    console.error("Workers AI run failed", err);
    throw err;
  }

  const userText = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  if (!(result instanceof ReadableStream)) {
    clearTimeout(streamTimer);
    const text =
      typeof result === "string"
        ? result
        : (result as { response?: string })?.response || "";
    const finalText = appendDisclaimerIfNeeded(text, userText);
    return pumpSse(requestId, async (write) => {
      await write({ type: "token", content: finalText });
    });
  }

  const stream = result;
  return pumpSse(requestId, async (write) => {
    let full = "";
    try {
      for await (const chunk of readWorkersAiStream(stream, streamAbort.signal)) {
        full += chunk;
        await write({ type: "token", content: chunk });
      }
      const finalText = appendDisclaimerIfNeeded(full, userText);
      if (finalText.length > full.length) {
        await write({ type: "token", content: finalText.slice(full.length) });
      }
    } finally {
      clearTimeout(streamTimer);
    }
  });
}

export function aiConfigured(env: EnvAI): { workersAi: boolean; openai: boolean } {
  return {
    workersAi: Boolean(env.AI),
    openai: Boolean(env.OPENAI_API_KEY),
  };
}

export async function handleChatStream(
  env: EnvAI,
  messages: ChatMessage[],
  profileSummary?: string,
  requestId?: string,
): Promise<Response> {
  const cfg = aiConfigured(env);
  if (!cfg.workersAi && !cfg.openai) {
    return jsonError(
      503,
      "AI chat is not configured. Enable Workers AI on this Worker, or set the OPENAI_API_KEY secret.",
      "not_configured",
      requestId,
    );
  }

  const withSystem: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt(profileSummary) },
    ...messages.filter((m) => m.role !== "system").slice(-MAX_CHAT_HISTORY),
  ];

  // Prefer Workers AI binding; fall back to OpenAI-compatible secret.
  try {
    const aiRes = await streamWorkersAi(env, withSystem, requestId);
    if (aiRes) return aiRes;
  } catch (err) {
    console.error("Workers AI failed, trying OpenAI-compatible", err);
    if (!cfg.openai) {
      return jsonError(502, SAFE_PROVIDER_ERROR, "provider_error", requestId);
    }
  }

  try {
    const openAiRes = await streamOpenAiCompatible(env, withSystem, requestId);
    if (openAiRes) return openAiRes;
  } catch (err) {
    console.error("OpenAI-compatible chat failed", err);
    return jsonError(502, SAFE_PROVIDER_ERROR, "provider_error", requestId);
  }

  return jsonError(
    503,
    "AI chat is not configured. Enable Workers AI on this Worker, or set the OPENAI_API_KEY secret.",
    "not_configured",
    requestId,
  );
}

function jsonError(status: number, error: string, code: string, requestId?: string): Response {
  const body: Record<string, unknown> = { ok: false, error, code };
  if (requestId) body.requestId = requestId;
  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };
  if (requestId) headers["x-request-id"] = requestId;
  return new Response(JSON.stringify(body), { status, headers });
}
