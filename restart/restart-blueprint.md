# Project Restart Blueprint: Next.js + Builder.io + Netlify

**Date:** August 8, 2025  
**Purpose:** Clean-slate, best-practices relaunch of the website project, integrating all lessons learned to avoid prior pitfalls.

---

## 1. Executive Summary

This blueprint defines a proven, minimal, and maintainable workflow for a Next.js site powered by Builder.io and deployed on Netlify. It is designed to:

- Eliminate routing/env/preview/CI confusion
- Empower both developers and content creators
- Keep all configuration and branching simple, safe, and auditable

**Core principles:**

- Visual-first: Builder.io is the source of truth for content and page structure
- Next.js App Router for all custom logic and components
- Netlify for branch-based deploys and environment management
- GitHub for all code, with a strict preview/main promotion model

---

## 2. Technologies & Integration

- **Next.js (App Router, TypeScript strict)**
  - Use a single catch-all route (e.g. `app/[[...slug]]/page.tsx`) for Builder pages
  - All custom React components in `src/components/`
- **Builder.io (Projects + Publish)**
  - Visual editing, content models, and PR-based code edits
  - API keys managed per environment (never hardcoded)
  - Webhooks trigger Netlify builds on publish
- **Netlify**
  - Native Next.js runtime (no custom adapters needed)
  - Branch deploys for preview/main; env vars set in UI
- **GitHub**
  - `main` = production, `preview` = integration, feature branches for all work

---

## 3. Lessons Learned & What to Avoid

- **Never use a root-level catch-all route that conflicts with `/`**: Always scope Builder to a subpath or use a single, well-defined catch-all.
- **Do not rely on .env files for Netlify builds**: Always set env vars in the Netlify UI for each branch/context.
- **Never expose secrets to the client**: Only use `NEXT_PUBLIC_` for public keys; keep all others server-only.
- **Avoid auto-merging to main**: All promotions must be manual and reviewed.
- **Always gate unpublished content with draftMode or isPreviewing**: Prevents 404s in the Builder editor.
- **Keep CI/CD minimal and explicit**: No magic, no hidden workflows.

---

## 4. Step-by-Step Restart Plan

1. **Delete the old repo and create a new, empty one on GitHub.**
2. **Initialize a new Next.js project:**

```bash
npx create-next-app@latest --typescript
```

3. **Install dependencies:**

```bash
npm install @builder.io/sdk-react tailwindcss @netlify/plugin-nextjs
npx tailwindcss init -p
```

4. **Configure Next.js and Netlify:**

- Add a minimal `next.config.ts` (enable strict mode, etc.)
- Add a minimal `netlify.toml` (if needed; otherwise rely on Netlify’s auto-detect)

5. **Set up Builder.io:**

- Create a new Builder space
- Define your content models (e.g. Page)
- Get your public API key(s)

6. **Create the catch-all route for Builder pages:**

- `app/[[...slug]]/page.tsx` (or `/content/[[...slug]]/page.tsx` if you want to scope)
- Use `fetchOneEntry` and `<Content />` from Builder SDK
- Gate unpublished content with `isPreviewing()` or Next.js draftMode

7. **Register custom components in Builder.io:**

- Build in `src/components/`
- Register in Builder for visual editing

8. **Configure environment variables in Netlify UI:**

- Set `NEXT_PUBLIC_BUILDER_API_KEY` for each branch/context

9. **Set up webhooks:**

- In Builder.io, add a webhook to trigger Netlify builds on publish

10. **Adopt strict branching:**

- `main`: production only, updated via PR from `preview`
- `preview`: all integration, always deployed to preview URL
- Feature branches: all work starts here, PRs target `preview`

11. **Enable Netlify branch deploys:**

- Use Netlify UI to ensure both `main` and `preview` have their own deploys

12. **Test the full flow:**

- Create a page in Builder, preview on preview branch, publish, verify production

13. **Document everything:**

- Add a `docs/` folder with this blueprint, setup guides, and workflow notes

---

## 5. Best Practices Checklist

- [ ] All env vars set in Netlify UI, never in code
- [ ] No root-level catch-all route conflicts
- [ ] All unpublished content previewable (no 404 in editor)
- [ ] Manual, reviewed promotions to main only
- [ ] Minimal, explicit CI/CD (no hidden magic)
- [ ] All custom components registered in Builder
- [ ] All docs up to date in `docs/`

---

## 6. Quick Reference

- **Start dev server:**

  ```bash
  npm run dev
  ```

- **Typecheck:**

  ```bash
  npm run type-check
  ```

- **Lint:**

  ```bash
  npm run lint
  ```

- **Test:**

  ```bash
  npm run test
  ```

---

By following this blueprint, you will have a robust, maintainable, and frustration-free foundation for your Builder.io + Next.js + Netlify site, with all prior lessons integrated and no hidden complexity.
