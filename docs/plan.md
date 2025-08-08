# Implementation Plan (Foundational Release)

Status: DRAFT (Initial foundational planning based on PRD dated 2025-08-07)
Owner: Project Owner (with Copilot assistance)
Scope: Landing page + Storybook-driven component/style system only.

> This plan is derived from the PRD. It emphasizes a rigorous foundation, explicit Server vs Client boundaries, and future extensibility. All future sections listed in the PRD remain intentionally **unscaffolded**.

---

## 0. Assumptions & Version Targets

| Topic                | Assumption (Adjust if different)                                  | Action if Changed                                                   |
| -------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| Node.js              | 20.x LTS                                                          | Update CI + `.nvmrc` / engines in `package.json`                    |
| Next.js              | Using App Router (14.x+). No experimental RSC APIs beyond stable. | Revisit Storybook + server component integration                    |
| Package Manager      | npm (default from `create-next-app`).                             | If moving to pnpm/yarn: update CI + lockfile strategy               |
| Deployment           | Netlify using `@netlify/plugin-nextjs`.                           | If moving to Vercel: remove Netlify plugin + adjust image/CDN notes |
| Storybook            | Latest stable (expected 8.x).                                     | Verify config file naming differences (e.g. `main.ts`)              |
| Testing              | Introduce minimal unit + a11y lint first; deeper testing later.   | If end-to-end needed early: add Playwright setup                    |
| Styling              | Tailwind CSS with custom tokens; no design system lib initially.  | If adding shadcn/MUI: treat each experiment in A/B branches         |
| Analytics/Tracking   | None initially.                                                   | Later: add script via server layout + consent handling              |
| Internationalization | Not in scope now.                                                 | Revisit routing + content abstractions later                        |

---

## 1. High-Level Phases (Logical Order)

1. Confirm baseline repository hygiene & strengthen TypeScript / lint config.
2. Establish directory & naming conventions (including Server vs Client clarity).
3. Expand Tailwind config (design tokens, dark mode strategy, typography).
4. Introduce Storybook (component-first workflow) integrated with Tailwind + Next.
5. Implement Landing Page (static placeholder) using only approved patterns.
6. Add initial accessibility & performance safeguards.
7. Branching & A/B process documentation + lightweight tooling.
8. Add CI (build, type-check, lint, Storybook build) + Dependabot + status badges.
9. Add Netlify deployment config (production + preview) + environment parity notes.
10. Add minimal testing scaffolding (unit + component + a11y lint pass).
11. Documentation expansion (architecture, decisions, open questions).
12. Prepare backlog for next iteration (animations, dynamic content, etc.).

---

## 2. Directory & Conventions

Proposed structure (only add folders when first used):

```text
src/
  app/                 # App Router (server-first pages/layouts)
    layout.tsx         # Root layout (Server Component)
    page.tsx           # Landing page (Server Component)
  components/
    client/            # Interactive components requiring state/events
    server/            # Pure / data-presentational server components (optional subfolder)
    ui/                # Reusable primitives (buttons, typographic blocks)
  lib/                 # Server-only utilities (fetchers, config loaders)
  lib-client/          # Client-only utilities (browser APIs, localStorage helpers)
  styles/              # Tailwind entrypoints, global CSS, tokens (if layered)
  config/              # Central runtime config maps (feature flags, constants)
  types/               # Shared TypeScript types
  test/                # Test setup, mocks
  stories/ (optional)  # If not colocating stories; prefer colocated `*.stories.tsx`
```

Naming:

- Server Component default (no `use client`).
- Client Component must include explicit directive at top: `"use client"`.
- Optional suffix patterns (use if clarity needed): `Button.client.tsx`, `Hero.server.tsx`.
- Avoid mixing server-only code (filesystem access, secret keys) inside client folders.

Separation rules:

| Concern                                          | Server Component / Server Utility  | Client Component / Client Utility                       |
| ------------------------------------------------ | ---------------------------------- | ------------------------------------------------------- |
| Data Fetching (remote APIs)                      | Yes (preferred)                    | No (except client-specific cached fetch via public API) |
| Environment Secrets                              | Yes                                | No                                                      |
| Event Handlers / Hooks (`useState`, `useEffect`) | No                                 | Yes                                                     |
| Theming (CSS Vars via Layout)                    | Yes (inject vars)                  | Yes (toggle interactions)                               |
| Feature Flag Eval (initial)                      | Yes (deterministic render)         | Hydration follow-up only if needed                      |
| Local Storage, Window APIs                       | No                                 | Yes                                                     |
| Analytics Bootstrapping                          | Layout server inserts script shell | Client initiates runtime events                         |

---

## 3. TypeScript & Lint Hardening

Tasks:

- Enable strictest TS mode (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- Add path aliases (already `@/*`). Ensure Storybook resolves same alias.
- ESLint: augment with plugins:
  - `eslint-plugin-import` (ordering & boundaries)
  - `@typescript-eslint` (already via Next config) – ensure latest
  - `eslint-plugin-jsx-a11y`
  - `eslint-plugin-react-hooks` (already from Next) – verify
  - `eslint-plugin-tailwindcss` (class ordering & errors)
  - Optional: `eslint-plugin-security` (light baseline) / `eslint-plugin-unused-imports`
- Add custom ESLint rule sets for server vs client (folder-based constraints) via overrides:
  - Disallow `useState`, `useEffect` in `src/components/server/**`.
  - Disallow importing `lib/` (server) from any `client/` file.

Deliverables:

- Updated `tsconfig.json`
- `eslint.config.mjs` modifications with overrides & new plugins

---

## 4. Tailwind Strategy

Steps:

- Extend `tailwind.config.js` (currently `.mjs` if ESM) with:
  - Design tokens: color palette (semantic tiers), spacing scale extension, typography.
  - `darkMode: 'class'` (explicit toggling) or `'media'` – choose (OPEN QUESTION below).
  - Plugins: `@tailwindcss/typography`, `@tailwindcss/forms` (if forms appear soon), `@tailwindcss/animate` (optional), safelist for dynamic classes (if any planned early?).
- Create `styles/tokens.css` (optional) for CSS custom properties if needed for A/B theme switching.
- Document theming approach in `docs/style-tokens.md` (future).
- Provide a `ThemeProvider` (client) to toggle class on `<html>` or `<body>`.

Dependencies to add (phase 1 or when used):

```bash
npm i -D @tailwindcss/typography @tailwindcss/forms @tailwindcss/animate
```

---

## 5. Storybook Setup

Objectives:

- Single source of truth for components + style.
- Work with Next.js App Router + Tailwind.

Steps:

1. Install Storybook with framework preset: `npx storybook@latest init --builder vite` (or webpack if issues). Vite builder recommended for speed (check official Storybook + Next docs; adapt if any incompatibility with server components—fallback to Webpack if required).
2. Add `@storybook/addon-a11y`, `@storybook/addon-interactions`, `@storybook/addon-essentials` (should be default), `@storybook/addon-styling` (if needed for Tailwind global injection).
3. Configure `.storybook/preview.ts` to import `src/app/globals.css` (Tailwind base) and set global parameters (a11y, layout, backgrounds, dark mode toggle).
4. Add alias resolution to `.storybook/main.ts` to mirror `@/*`.
5. Pattern: Prefer colocated stories `Component.stories.tsx` adjacent to source. For purely server components, create a small wrapper or mark them as client if necessary (OPEN QUESTION: accept temporary client wrappers?).
6. Add a `Docs` entry (`Introduction.mdx`) summarizing design tokens.
7. Add build script: `"storybook": "storybook dev -p 6006", "build-storybook": "storybook build"`.
8. Optional (future): Chromatic / Netlify Storybook deploy.

Dependencies:

```bash
npm i -D @storybook/react-vite @storybook/test @storybook/addon-a11y @storybook/addon-interactions @storybook/addon-styling
```

(Adjust if official CLI selects updated package names.)

---

## 6. Landing Page Implementation (MVP)

Characteristics:

- Server Component `app/page.tsx`.
- Purely static content (no dynamic fetch).
- Use semantic landmarks: `<header>`, `<main>`, `<footer>`.
- Include placeholder hero section referencing forthcoming journey theme (text only).
- Provide foundational typography scale via Tailwind classes.

Steps:

1. Draft content MD-like (can later be moved to MDX if needed; not now).
2. Add `<Metadata>` export in `page.tsx` for SEO baseline (title, description, no indexing restrictions).
3. Ensure minimal CLS: pre-sized assets or none.

---

## 7. Accessibility & Performance Baseline

Tasks:

- Add ESLint `jsx-a11y` plugin.
- Add Storybook a11y addon to surface violations early.
- Provide internal checklist: color contrast, focus order, prefers-reduced-motion respect (when animations added later), alt text policy.
- Add `next.config.ts` performance options: `images: { domains: [], formats: ['image/avif','image/webp'] }` (keep empty until needed).
- Consider enabling `reactStrictMode` (usually default) and `experimental.optimizePackageImports` (verify stability before enabling—OPEN QUESTION).

---

## 8. Branching & A/B Testing Strategy

Branches:

- `main`: production stable.
- `preview`: integration branch aggregating feature branches before merge to main.
- `ab/<experiment-name>`: short-lived experiment branches (derived from `preview`; periodically rebased onto `main` or `preview`).

Workflow:

1. Feature begins from latest `preview`.
2. PR merges into `preview` after review + CI green.
3. `preview` periodically merges (not rebases) into `main` for release tagging (or fast-forward if linear).
4. After `main` update, automation (script or manual) updates all active `ab/*` via `git fetch && git rebase main`.

Tooling (future additions):

- Script `scripts/update-ab-branches.ts` (Node) to iterate remote branches and rebase.
- Pre-commit hooks (Husky) to run lint/type-check quickly.

---

## 9. CI / Automation (Phase 1 Minimal)

GitHub Actions Workflows:

1. `ci.yml` (trigger: PR + push):
   - Install (cache `~/.npm`), `npm run lint`, `npm run type-check`, `npm run build`.
   - Separate job: `storybook-build` (depends on build) to run `npm run build-storybook`.
2. `dependabot.yml` for `npm` daily (or weekly) updates; group minor dev-only updates.
3. (Optional later) `preview-deploy.yml` (if using custom preview naming—Netlify can auto-deploy branches).

Badges: Add to `README.md` after workflows exist.

---

## 10. Netlify Deployment

Steps:

- Add `@netlify/plugin-nextjs` as dev dependency.
- Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

- Set Node version in Netlify UI (20.x) or `.node-version` / `engines` field.
- Enable branch deploys for `preview` + `ab/*` (wildcard). Document naming convention.

- Environment Variables (placeholder list):
  - `NEXT_PUBLIC_...` (for any eventual public config) – none yet.
  - Secret variables avoided until dynamic features introduced.
- Confirm image optimization + ISR handled by plugin (no further config initially).

---

## 11. Minimal Testing Setup

Initial scope:

- Type-level: `tsc --noEmit` (already part of build or separate script `type-check`).
- Unit / component tests (later) could use **Vitest** + **@testing-library/react** for speed (works well with Vite). If Storybook uses Vite builder, synergy.
- For now: Plan placeholder only (no immediate test scaffolding required if out-of-scope). Optionally add a single sample test to enforce harness validity.

Proposed dependencies (when activated):

```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom axe-core
```

Add `test` script: `"test": "vitest run"`, `"test:watch": "vitest"`.

---

## 12. Scripts (Proposed Additions)

| Script               | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `build`              | Next.js production build                    |
| `dev`                | Next dev server                             |
| `lint`               | ESLint across source & stories              |
| `type-check`         | `tsc --noEmit`                              |
| `storybook`          | Run Storybook dev                           |
| `build-storybook`    | Static Storybook build                      |
| `analyze` (optional) | Bundle analysis with `next build --analyze` |
| `format`             | Prettier write (if adopted)                 |
| `format:check`       | Prettier check                              |
| `precommit` (hook)   | Lint staged + type check (fast-path)        |

---

## 13. Dependency Plan

Current (from create-next-app baseline) – verify before adding:

- `next`, `react`, `react-dom`, `typescript`, `eslint`, `tailwindcss`, `postcss`, `autoprefixer`.

Add in phases:

Phase 1 (Foundation / Lint / Tokens):

```bash
npm i -D eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-tailwindcss eslint-plugin-unused-imports @tailwindcss/typography @tailwindcss/forms @tailwindcss/animate
```

Phase 2 (Storybook):

```bash
npm i -D @storybook/react-vite @storybook/addon-a11y @storybook/addon-interactions @storybook/addon-styling @storybook/test
```

Phase 3 (CI enhancements / Netlify / Optional):

```bash
npm i -D @netlify/plugin-nextjs
```

Phase 4 (Testing – when activated):

```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom axe-core
```

Optional Future (Not now):

- `zod` (runtime validation), `next-auth` / auth provider, `contentlayer` or `@next/mdx` for MDX, analytics SDK.

---

## 14. Server vs Client Logic Rules (Policy)

1. Default to Server Components (SSR or static) for pages and layouts.
2. Any component importing React client hooks must have `"use client"` directive at top.
3. Shared UI primitives should prefer server compatibility; only mark as client if truly interactive.
4. Data fetching: Use async Server Components + `fetch` with appropriate caching (`{ cache: 'force-cache' }` for static, `revalidate` for incremental). Avoid duplicating data fetching in client.
5. Avoid environment leakage: only expose via `NEXT_PUBLIC_` prefix variables.
6. Large computation: run on server; if user-interactive transformation needed, create paired server utility and thin client harness.
7. Directory-level checks enforced by ESLint custom rule patterns.
8. Storybook: if server component cannot easily render, supply a lightweight client wrapper that receives props and renders the server component's output (OPEN DECISION).

---

## 15. Documentation Artifacts to Add

| File                           | Purpose                                      |
| ------------------------------ | -------------------------------------------- |
| `docs/architecture.md`         | High-level system & RSC boundaries           |
| `docs/branching.md`            | Detailed branch + A/B workflow with examples |
| `docs/style-tokens.md`         | Design tokens + theming decisions            |
| `docs/decisions/` (ADR folder) | Individual architectural decision records    |
| `docs/testing.md`              | Testing layers, when to add integration/e2e  |

---

## 16. Quality Gates Definition

| Gate                   | Definition for Passing (Phase 1)                                        |
| ---------------------- | ----------------------------------------------------------------------- |
| Build                  | `next build` completes with no errors                                   |
| Lint                   | ESLint clean (no errors; warnings acceptable temporarily if documented) |
| Types                  | `tsc --noEmit` zero errors                                              |
| Storybook              | `build-storybook` completes (no broken stories)                         |
| Accessibility (basic)  | No critical a11y violations in key stories (hero, button, layout)       |
| Performance (baseline) | Lighthouse (local) passes core thresholds: FCP < 2s (local dev)         |

---

## 17. Risks & Mitigations

| Risk                             | Impact                             | Mitigation                                                 |
| -------------------------------- | ---------------------------------- | ---------------------------------------------------------- |
| Server/Client boundary confusion | Hydration mismatches, bundle bloat | Explicit folder rules + ESLint + documentation             |
| Early dependency sprawl          | Maintenance cost                   | Phase gates for adding libs; ADR before major lib adoption |
| Storybook + RSC rough edges      | Slowed component dev               | Use wrappers; track upstream Storybook RSC progress        |
| Branch drift in A/B              | Merge conflicts                    | Scheduled rebase script + max lifespan policy (<2 weeks)   |
| Netlify plugin version mismatch  | Deployment failures                | Pin plugin version; monitor release notes                  |

---

## 18. Backlog (Post-Foundation)

- Add MDX or content system.
- Add animation framework (e.g., `framer-motion`) for scroll journey.
- Introduce design token synchronization (maybe Style Dictionary) if scaling.
- Edge functions usage (feature flags, personalized responses).
- Integration tests (Playwright) once dynamic flows emerge.
- Visual regression (Chromatic) once components stabilize.

---

## 19. Open Questions / Ambiguities (Need Decisions)

| #   | Question                                          | Suggested Options                                        |
| --- | ------------------------------------------------- | -------------------------------------------------------- |
| 1   | Dark mode strategy?                               | `class` toggle                                           |
| 2   | Storybook deployment?                             | integrate Chromatic                                      |
| 3   | Adopt Prettier or rely on ESLint formatting only? | Add Prettier for consistency                             |
| 4   | Testing framework timeline?                       | Defer until after landing page                           |
| 5   | Do we enforce commit conventions?                 | Add Commitlint + Husky                                   |
| 6   | RSC Storybook approach?                           | THIS IS IMPORTANT _NEEDS DONE PROPERLY_ NO WORKAROUNDS |
| 7   | Analytics / telemetry early?                      | simple privacy-friendly (e.g., Plausible)                |
| 8   | Feature flag mechanism?                           | Simple config object                                     |
| 9   | Node version pin source?                          | Netlify only                                             |
| 10  | Semantic release automation?                      | Add later                                                |
| 11  | A/B naming convention?                            | BEST PRACTICE _ DOESNT MATTER                            |
| 12  | CSS variable strategy?                            | TailwindCSS with additional styling to be tested         |
| 13  | Accessibility target standard?                    | SANDARD                                                  |
| 14  | Use import alias for test utilities?              | LOGICAL - SIMPLE - CLEAN                                 |
| 15  | Performance budgets?                              | Add bundlesize / Lighthouse CI                           |

---

## 20. Immediate Next Actions (Execution Order Checklist)

- [ ] Decide on dark mode & theming toggle method (#1).
- [ ] Add strict TS options + update `tsconfig.json`.
- [ ] Enhance ESLint config (plugins, overrides for server/client separation).
- [ ] Extend Tailwind config (tokens, dark mode setting).
- [ ] Initialize Storybook + integrate Tailwind + alias.
- [ ] Create initial foundational components (Typography primitives) + stories.
- [ ] Implement static Landing page content.
- [ ] Add `@netlify/plugin-nextjs` and `netlify.toml`.
- [ ] Draft `ci.yml` (build, lint, type-check, storybook build) + activate.
- [ ] Add `dependabot.yml`.
- [ ] Draft `docs/branching.md` & finalize branch naming.
- [ ] Record ADR for theming + lint boundary decisions.
- [ ] Answer open questions list; update plan accordingly.

---

## 21. Change Management

This `plan.md` should evolve through small PRs after each major decision (linking ADRs). Keep a CHANGELOG or include a dated appendix if drift occurs.

---

## 22. Appendix (Reference Links to Consult When Implementing)

(Do NOT copy docs verbatim; refer to official latest pages.)

- Next.js App Router: <https://nextjs.org/docs/app>
- Server Components Guidelines: <https://nextjs.org/docs/app/building-your-application/rendering/server-components>
- Tailwind Config: <https://tailwindcss.com/docs/configuration>
- Storybook for Next.js: <https://storybook.js.org/docs/react/get-started>
- Netlify Next.js Plugin: <https://github.com/netlify/next-runtime>
- ESLint Tailwind Plugin: <https://github.com/francoismassart/eslint-plugin-tailwindcss>
- Dependabot Config: <https://docs.github.com/code-security/dependabot>

---

END OF PLAN
