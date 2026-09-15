# 06 — Community features (product design)

**Positioning:** Belonging without unsafe medical advice. Prefer Connect Groups + Buddy before a full forum.

**Funding gate:** Moderated forum, accounts, and realtime infra wait until grants/revenue support moderation hours + engineering. This section’s technical architecture is **future**.

---

## Product pillars

| Pillar | User value | Current surface | Phase |
|---|---|---|---|
| Connect Groups | Peer discussion by condition/topic | `/community/connect-groups`, `/connect` | Harden Phase 1–2 |
| Buddy Programme | 1:1 mentoring | `/buddy`, `/buddy/match` | Quality + safeguarding Phase 2 |
| Events & webinars | Live education | `/events` | Cadence Phase 1–2 |
| Helpline / support | Human response (stated SLA only if true) | `/helpline` | Process Phase 1 |
| Forum | Persistent threads | **FUTURE** `/community/forum` | Phase 3 / funded |
| Stories | Lived experience | `/stories` | Editorial Phase 1–2 |

---

## Safeguarding & clinical safety (all community)

1. No diagnosis, dosing, or “stop your DMARD” advice from peers or staff without clinical pathway.  
2. Crisis signposting: NHS 111 / 999 / Samaritans 116 123.  
3. Moderators trained; escalation to Louis for clinical risk.  
4. Clear community guidelines + report button.  
5. Under-18: do not build youth JA community without specialist safeguarding design.

---

## Forum — future product brief (when funded)

**Jobs:** Ask practical living questions; share wins; find local tips; escalate to resources.

**Non-goals:** Replace NHS care; unmoderated medical debate; SEO doorway content farms.

### High-level technical architecture (FUTURE — label clearly)

```
[Browser] → [Next.js or hardened SPA]
     → API (auth, posts, reports)
     → Postgres (Supabase or managed)
     → Moderation queue (human-in-loop)
     → Optional: toxicity classifier (assistive only)
```

**Do not** restore Supabase into the live Lovable repo as part of this strategy task. Adopt backend when rebuild is funded.

### Optional future DB sketch

```text
users(id, display_name, role, created_at)
groups(id, slug, title, condition_tags)
threads(id, group_id, author_id, title, created_at)
posts(id, thread_id, author_id, body, created_at)
reports(id, post_id, reporter_id, reason, status)
mod_actions(id, actor_id, target_type, target_id, action)
```

---

## Phase plan

| Phase | Deliverable |
|---|---|
| 1 | Clarify Connect/Buddy/Helpline IA; response-time honesty; report email process |
| 2 | Buddy matching quality; scheduled events; newsletter community segment |
| 3 | Forum MVP **if** moderation FTE/volunteer rota + eng funded |

*Next: [07-CONTENT-STRATEGY.md](./07-CONTENT-STRATEGY.md)*
