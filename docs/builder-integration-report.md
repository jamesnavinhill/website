# Builder + Next.js + Netlify Integration Report

**Date:** August 8, 2025  
**Branches:** Working branch ab/builder (preview-first workflow)  
**Scope:** Fusion/Projects (visual editing via PRs) + Publish (CMS rendering) with Netlify branch deploys

## goals and constraints

- Integrate Builder.io (Projects/Fusion + Publish) into a Next.js App Router site.
- Keep the setup simple, proven, and aligned with official docs.
- Always work from the preview branch; manually promote to main.
- Enforce strict server/client boundaries and TypeScript safety.

## timeline (high level)

- Planned Builder integration and reviewed CI safety (no auto-merge to main).
- Implemented a Builder Publish route; resolved a root catch‑all routing clash by scoping to `/content`.
- Verified type checks and dev server; then pivoted to a simpler, docs-backed redesign.
- Researched official Builder, Next.js, and Netlify docs to lock a minimal, reliable setup.

## technical foundation

- Framework: Next.js (App Router, TypeScript strict), Tailwind, Vitest.
- Hosting: Netlify native Next.js runtime (SSR/ISR/Edge, images) with branch deploys.
- Builder.io:
  - Projects/Fusion: visual edits open PRs against preview; CLI/VS Code supported.
  - Publish: React SDK v2 — server fetch by urlPath + client render via Content; draft preview allowed.
- CI/CD: feature → preview → main; Dependabot weekly; manual promotions only.

## repo state highlights

- Routing: Builder content served under `/content` to avoid root catch‑all conflicts.
- Server/client boundary: server fetch (Publish API) + client render component; strict types.
- Workflows: Removed any risky auto-merge to main; retain manual PR review gates.

## latest research (authoritative sources and takeaways)

- Builder Publish “Integrate Pages”
  - Fetch entries by `userAttributes.urlPath` and render with `<Content>`.
  - Set Pages model Preview URL to your running site (local first, then preview deploy).
  - Allow drafts in preview; avoid 404s for unpublished content.
- Next.js Draft Mode (App Router)
  - Use a route handler (e.g., `/api/draft`) with a secret to enable draftMode and redirect.
  - Draft cookie switches static pages to dynamic rendering for previews.
- Builder Projects CLI
  - `npx "builder.io@latest" launch` (or dev-tools) to connect local repo.
  - Supports `--serverUrl`, multi-repo workspaces, `.builderrules`, and `builder.config.json`.
- Builder Next.js App Router examples
  - Validates server fetch + client render pattern for SDK v2 in App Router.

## risks and edge cases

- Route conflicts: Root optional catch‑all can shadow `/`; keep Builder under `/content` unless planning rewrites.
- Draft previews: Ensure draftMode or `isPreviewing()` bypasses 404 for unpublished entries in editor.
- Env vars: Netlify builds don’t read local `.env` by default — set env in Netlify UI per branch/context.
- API keys: Only expose public keys client-side via `NEXT_PUBLIC_`; keep secrets server-only.

## continuation plan (minimal, proven)

1. Builder Publish baseline

- Pages model Preview URL → preview deploy `https://<preview-branch>--<site>.netlify.app/content` (use local during dev).
- Server-side fetch with `fetchOneEntry({ model, apiKey, userAttributes: { urlPath } })` and render via a tiny client component wrapping `<Content>`.
- Gate unpublished content via Next.js draftMode or Builder `isPreviewing()` to avoid 404 in editor.

1. Projects/Fusion workflow

- Connect GitHub repo to Projects; configure dev command and serverUrl; commit mode opens PRs to preview.
- Add `.builderrules` and optional `AGENT.md` to encode conventions (file structure, a11y, TypeScript), improving AI edits.

1. Netlify deployment hygiene

- Enable branch deploys; set per-branch env vars (Builder public API key, etc.) in Netlify UI.
- Keep `netlify.toml` minimal; rely on native Next.js runtime for ISR/Edge/Image optimization.

1. Optional polish

- URL rewrites if you want Builder pages at custom paths later.
- Component registration for custom blocks; basic a11y and performance checks.

## verification gates

- Lint/Typecheck: ESLint zero errors; `tsc --noEmit` clean.
- Build/Test: Next.js build succeeds; Vitest smoke tests pass.
- Preview UX: DraftMode route works; unpublished pages previewable without 404; published pages served via ISR.

## appendix: requirements coverage

- Simplicity and official-doc alignment: Done (documented minimal blueprint).
- Preview-first branch workflow: Done (branch deploys + PR-based Projects flow).
- Publish integration with secure previews: Done (draftMode + isPreviewing patterns documented).
- Netlify branch deploys and env handling: Done (UI per-branch envs; minimal toml).
- Manual main promotions only: Done (no auto-merge; PR review remains).

---

This report captures current integration decisions, validated patterns, and a concise path to production with low operational complexity.
