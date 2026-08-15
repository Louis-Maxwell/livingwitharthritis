# Contributing to Living With Arthritis

Thanks for your interest in contributing! We welcome issues, feature requests, and pull requests from the community.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Running Tests](#running-tests)
- [Code Style & Standards](#code-style--standards)
- [Pull Requests](#pull-requests)
- [Troubleshooting](#troubleshooting)
- [Security](#security)

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17+ or **Bun** 1.0+ (check with `node --version` or `bun --version`)
- **npm** 9+ or **Bun** (included with Bun installation)
- **Git** 2.30+ (`git --version`)
- A **GitHub account** for forking and creating pull requests
- **Git credentials** configured (`git config user.name` and `git config user.email`)

### macOS

```bash
# Using Homebrew
brew install node
# or for Bun
brew install bun
```

### Windows / Linux

- Download from [nodejs.org](https://nodejs.org/) or [bun.sh](https://bun.sh/)
- Or use version managers like `nvm` (Node) or `mise` (Node/Bun)

## Getting Started

### 1. Fork & Clone

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR-USERNAME/livingwitharthritis.git
cd livingwitharthritis
git remote add upstream https://github.com/Louis-Maxwell/livingwitharthritis.git
```

### 2. Install Dependencies

```bash
npm ci  # Clean install (preferred for CI/testing)
# or
npm install  # Standard install
```

### 3. Environment Setup

Copy the template and fill in your values:

```bash
cp .env.example .env.local
```

**Required for local development:**
- `VITE_SUPABASE_PROJECT_ID` — get from app.supabase.com > Settings > API
- `VITE_SUPABASE_URL` — your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` — public anon key from Supabase

**Optional but helpful:**
- `VITE_SENTRY_DSN` — for error tracking (can leave blank in dev)

### 4. Start Development Server

```bash
npm run dev
```

Opens at `http://localhost:8080` with hot module reloading.

## Project Structure

```
livingwitharthritis/
├── src/                    # Source code
│   ├── components/         # React components (UI, layout, features)
│   ├── pages/             # Page-level components (one per route)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities (API, database, helpers)
│   ├── api/               # API client code
│   ├── stores/            # State management (Zustand)
│   ├── types/             # TypeScript type definitions
│   ├── integrations/      # External service integrations
│   ├── App.tsx            # Root component
│   └── main.tsx           # Entry point
├── supabase/              # Supabase configuration
│   ├── migrations/        # Database migration files (SQL)
│   ├── functions/         # Edge functions (serverless)
│   └── config.toml        # Project configuration
├── tests/                 # Test files
├── e2e/                   # End-to-end tests (Playwright)
├── scripts/               # Build & utility scripts
├── docs/                  # Developer documentation
├── public/                # Static assets
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies & scripts
```

## Development Workflow

### Creating a Feature Branch

```bash
# Update main from upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feat/description-of-change

# Or for fixes:
git checkout -b fix/bug-description

# Or for docs:
git checkout -b docs/section-name
```

### Making Changes

1. **Edit files** in `src/` or `supabase/`
2. **Hot reload** happens automatically during `npm run dev`
3. **Test frequently** — see [Running Tests](#running-tests)
4. **Lint before committing** — run `npm run lint`

### Committing

Keep commits focused and descriptive:

```bash
# Good: specific, clear
git commit -m "Add export button to pain journal"

# Avoid: vague, large scope
git commit -m "Update stuff"
```

**Commit message guidelines:**
- Start with imperative verb: "Add", "Fix", "Update", "Remove", "Refactor"
- Be specific: mention *what* changed, not just the category
- Include *why* if the reason isn't obvious (in the body)
- Keep first line ≤ 50 characters
- Reference issues: "Fixes #123" or "Related to #456"

```bash
# Example with more detail:
git commit -m "Fix appointment display timezone bug

- Convert UTC timestamps to user's local timezone
- Update date formatting in AppointmentCard
- Fixes #789"
```

## Running Tests

### Linting & Type Checking

```bash
# Check code quality
npm run lint

# Type check (without building)
npx tsc --noEmit
```

### Unit & Integration Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Update test snapshots
npm run test:update
```

### Visual Regression Tests

```bash
# Run layout snapshots (Playwright)
npm run test:layout

# Update baseline snapshots after intentional changes
npm run test:layout:update
```

### Build & Verify

```bash
# Production build
npm run build

# Check bundle size & visual analysis
npm run build && npm run build:stats

# Preview production build locally
npm run preview
```

## Code Style & Standards

### TypeScript

- Prefer explicit types over inference when public APIs are involved
- Use interfaces for object types, types for unions/primitives
- Avoid `any` — use `unknown` if you must

```typescript
// Good
interface User {
  id: string;
  name: string;
}

// Avoid
const user: any = { id: '123' };
```

### React

- Functional components only (no class components)
- Use hooks for state and side effects
- Avoid inline styles — use Tailwind classes
- Keep components small and focused (under 300 lines ideally)

```typescript
// Good: small, focused, descriptive name
export function PainJournalEntry({ entry }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="space-y-2">
      {/* content */}
    </div>
  );
}

// Avoid: too large, does too much
export function AdminDashboard() { /* 500 lines */ }
```

### CSS / Tailwind

- Use Tailwind utility classes (never add custom CSS to `index.css`)
- Avoid deep nesting or media query hacks
- Use the design system colors from `tailwind.config.ts`
- Responsive classes: `md:`, `lg:`, etc. for breakpoints

```html
<!-- Good: Tailwind utilities -->
<button className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
  Click me
</button>

<!-- Avoid: custom CSS -->
<button style={{ backgroundColor: '#007bff' }}>Click me</button>
```

### File Organization

- One component per file (unless very small)
- Use `index.ts` for barrel exports
- Group related files in directories
- Use `.module.css` only for component-scoped styles (rarely needed)

## Pull Requests

### Before Opening

1. **Update your branch** from upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests locally:**
   ```bash
   npm run lint
   npm run test
   npm run build
   ```

3. **Review your own changes** — catch obvious issues first

### Opening a PR

**Title:** Clear, specific description
- ✅ "Add export button to pain journal"
- ❌ "Update UI"
- ❌ "Fixes stuff"

**Description:** Include:
- What problem does this solve?
- How did you approach it?
- Any known limitations?
- Testing done?
- Screenshots/videos for UI changes

**Checklist:**

```markdown
## Description
Fixes #[issue-number]. Briefly describe the change.

## Changes
- Change 1
- Change 2

## How to test
Steps to verify the change works:
1. Navigate to X
2. Click Y
3. Verify Z happens

## Screenshots
(Include if UI changes)

## Checklist
- [ ] Code builds locally
- [ ] Linting passes (`npm run lint`)
- [ ] Tests added/updated (if applicable)
- [ ] Documentation updated (if needed)
- [ ] No breaking changes (or clearly documented)
```

### During Review

- Respond to feedback gracefully — all feedback is about code, not you
- Re-request review after pushing changes
- Keep pushing new commits (don't force-push to rewrite history) until merge

## Troubleshooting

### Common Issues

**"Cannot find module" errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm ci
```

**Port 8080 already in use**
```bash
# Kill the process using the port (macOS/Linux)
lsof -i :8080 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or start on a different port
npm run dev -- --port 3000
```

**Vite build fails**
```bash
# Clear Vite cache
rm -rf dist .vite
npm run build
```

**Database connection issues**
- Verify `VITE_SUPABASE_PROJECT_ID` and keys are correct
- Check internet connection to Supabase
- Try running `supabase start` for local database

**Tests failing unexpectedly**
```bash
# Update snapshots if changes were intentional
npm run test:update

# Run single test file
npm test -- src/components/Button.test.tsx
```

### Getting Help

- Check existing issues: [GitHub Issues](https://github.com/Louis-Maxwell/livingwitharthritis/issues)
- Read documentation in `/docs` directory
- Ask in PR comments or create a discussion

## Security

**Reporting vulnerabilities:** Do not open a public issue. Contact the repository owner directly at **info@livingwitharthritis.org.uk** with details.

**Please include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

## Resources

- [Project README](./README.md) — Overview and installation
- [Database Migrations](./docs/DATABASE-MIGRATIONS.md) — How to manage schema changes
- [Core Web Vitals](./docs/CORE-WEB-VITALS.md) — Performance monitoring
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Thank you for contributing!** 🎉 Your help makes Living With Arthritis better for everyone.
