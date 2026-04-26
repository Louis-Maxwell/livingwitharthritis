// Mock for npm:@lovable.dev/email-js used by smoke tests.
export async function sendLovableEmail(..._args: unknown[]) {
  return { id: "smoke-message-id" };
}
