# Free security tools for Living With Arthritis

Reviewed 26 November 2026. These are developer tools, not open-weight AI models.
No extra service account, paid model, Lovable credit or third-party site scan is enabled.

## Added

- **Semgrep Community Edition 1.187.0**: six local JavaScript/TypeScript rules check
  dynamic code execution, string timers, disabled TLS verification, wildcard
  postMessage, document.write and interpolated shell commands. Detection and
  safe-code fixtures run before every scan. Local rule configuration means no
  Semgrep account or cloud rules are needed. Metrics and version checks are off.
  Scans cover `src` and `scripts`, excluding test directories. This is a small,
  tested rule set, not equivalent to every Semgrep rule or a full security audit.
- **Trivy 0.76.2**: scans both Bun and npm lockfiles, including development
  dependencies, for high/critical vulnerabilities with available fixes. No
  credential validation or live application probing. Database/check downloads
  are needed; private application source is not sent to a scanning service.
- **Cloudflare Security Audit Skill**: pinned upstream MIT resource in
  `.agents/skills/security-audit`, with licence, provenance and SHA-256 integrity
  checking. Compatible coding agents can discover the repository-local skill.
  This is audit guidance, not a running AI service. No model access is configured
  and no paid audit runs are started. Its sandbox and independent-validation
  requirements still apply before using the complete audit workflow.

The checks run on PRs, main pushes, weekly and by manual dispatch. Read-only
repository permissions, pinned scanner versions and job timeouts are explicit.
They complement the existing CodeQL, Gitleaks and npm audit workflows.

### Findings fixed during setup

Trivy found `body-parser` 1.20.6 in the Bun development/prerender dependency tree
(Express via the prerenderer). Bun's targeted update moved it to 1.20.9, fixing
CVE-2026-111181. The npm lockfile was already clean. This is a build dependency
finding, not evidence that the published static site was remotely exploitable.

Seven TSX files use equivalent `&amp;` entities in plain text, fixing Semgrep's
parser ambiguity without changing rendered words. No medical claims changed.

### Coverage limits

No findings does not mean no vulnerabilities. Semgrep excludes tests and has its
normal generated/large-file skips. Trivy cannot semantically match the local
`file:vendor` overrides; existing dedicated braces/picomatch regression tests and
CodeQL remain important. Unfixed, medium and lower severity issues are not made
blocking by this new Trivy gate. No infrastructure config targets were detected,
so a nominal configuration-scanning job was not added.

## Reviewed, not enabled

| Repository | Decision |
| --- | --- |
| [Strix](https://github.com/usestrix/strix) | Agent-driven penetration testing needs a model endpoint and Docker. No model cost or live testing enabled. |
| [Nuclei](https://github.com/projectdiscovery/nuclei) | Active endpoint scanner. No unattended live-target scans authorised. |
| [Infisical](https://github.com/Infisical/infisical) | Secrets platform would add infrastructure or account/migration work, not improve this frontend by installation alone. |
| [TruffleHog](https://github.com/trufflesecurity/trufflehog) | Existing Gitleaks already checks Git history. Avoid another overlapping scanner and secret-verification network calls. |
| [NVIDIA SkillSpector](https://github.com/NVIDIA/SkillSpector) | Useful for agent-skill ecosystems, not the website runtime. Static-only inspection is possible, but another Python/YARA toolchain is not added for one pinned resource; upstream provenance/integrity is checked instead. |
| [Codex Security](https://github.com/openai/codex-security) | Its action requires model-provider access; budget limits are not a free-use guarantee. |
| [Claude Code Security Review](https://github.com/anthropics/claude-code-security-review) | Requires an Anthropic API key and model usage. |
| [PyRIT](https://github.com/microsoft/PyRIT) | AI red-team framework. The site's chatbot is not a connected model service. No suitable model target to deploy this against. |
| [Comp AI](https://github.com/trycompai/comp) | Compliance platform, not a vulnerability fix. Self-hosting/integrations add operational work and no automatic compliance guarantee. |

## Upstream sources and local commands

- https://github.com/cloudflare/security-audit-skill
- https://github.com/aquasecurity/trivy
- https://github.com/aquasecurity/trivy-action
- https://github.com/semgrep/semgrep
- https://semgrep.dev/docs/semgrep-ce

With Semgrep installed at the pinned version:

```sh
semgrep --test --config .semgrep/lwa.yml .semgrep/tests/lwa.ts --metrics=off --disable-version-check
semgrep scan --config .semgrep/lwa.yml --metrics=off --disable-version-check --strict --error --exclude '**/__tests__/**' --exclude 'scripts/tests/**' src scripts
trivy fs --scanners vuln --severity HIGH,CRITICAL --ignore-unfixed --include-dev-deps --exit-code 1 --skip-dirs .git --skip-dirs node_modules --skip-dirs dist .
node scripts/verify-security-audit-resource.mjs
```

Upstream updates are deliberate reviewed changes. Do not replace the pinned
Cloudflare files or scanner versions with an unreviewed latest install.
