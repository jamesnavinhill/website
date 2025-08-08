# Product Requirements Document (PRD)

## Project: Personal / Professional Website

---

## 1. Overview

A modern, creative, and interactive personal/professional website built with Next.js (TypeScript, App Router), Tailwind CSS, ESLint, TurboRepo, and Netlify hosting. The site will start as a mostly static site, with a clear distinction between server-side and client-side code, and will evolve to include embedded apps, APIs, and dynamic features. The initial focus is on foundational setup, type safety, and maintainability.

---

## 2. Goals & Objectives

- Launch a visually appealing, performant, and maintainable website.
- Establish a strong foundation for future expansion (apps, APIs, dynamic content).
- Maintain clear code structure and documentation.
- Enable easy A/B testing and theming.
- Leverage automation for CI/CD and dependency management.

---

## 3. Features & Requirements

### 3.1 Initial Pages

#### 3.1.1 Landing Page

- Simple welcome placeholder (no animations initially).
- Accessible from root URL (`/`).
- Clean, minimal design.

#### 3.1.2 Component Library & Style Documentation

- Components will be developed and documented alongside the app.
- Visual and accessibility testing handled via Vitest/Playwright in-app.
- The system will provide:
  - Visual previews of all components and their states/variants
  - Live playground for tweaking props and styles
  - Documentation for usage, props, and best practices
  - A living style guide for the project
- No custom in-app style guide page will be created unless a lightweight reference is needed for end-users (not for internal development).
- Docz and similar tools will not be used.

### 3.2 Code Structure & Foundations

- All app code in `src/` directory.
- Use TypeScript for type safety.
- Enforce clear separation of server-side and client-side code.
- Prioritize configuration, linting, and type safety before design or feature work.
- Mobile responsiveness and accessibility are prioritized from the start.

### 3.3 Documentation & Resources

- Maintain `/docs` directory with:
  - Official resources for Next.js, Netlify, and other techs.
  - Integration notes (media optimization, caching, etc.).
  - Identify and document any backend work handled by Netlify/Next.js, and any gaps to fill.
- No special Netlify features need to be configured up front; official documentation will be referenced to avoid redundant work and fill any gaps.

### 3.4 Styling & Theming

- Use Tailwind CSS as the base.
- Support for A/B testing:
  - Branches for preview and for testing UI packages (e.g., Material UI, shadcn).
  - Workflow for keeping all branches (main, preview, A/B) up-to-date and in sync. All branches must catch up with main whenever it is updated, regardless of the source of the change. Merges should flow through preview when possible, but direct updates to main must be reflected in all branches to avoid drift.
  - A/B testing and theming changes will be frequent at first, especially during initial styling and theme development. Once the base is settled, A/B will focus on advanced features (e.g., 3D effects, canvas, etc.).
  - Document the branch management and merge process to avoid confusion.
  - All theme and style changes should be reflected in the app and shared docs for review and documentation.

### 3.5 GitHub & Automation

- Plan for:
  - GitHub Actions for CI/CD.
  - Dependabot for dependency management.
  - Additional automation for PRs, issues, and workflow routines.
- Initial automation setup can wait until the site is stable and ready to go live. Standard flows will be used at first; advanced automation will be added after the project is ready to "publish."
- Staging environment on Netlify will be enabled for preview branches.
- Stakeholders and reviewers: project owner and Copilot.

### 3.6 Creative Direction

- Immersive, creative, and interactive theme.
- Visual journey: start in space, zoom into the galaxy, through clouds, into Earth’s atmosphere, down to map view, tree level, underground, and back out to space.
- This journey is a long-term vision; only the landing and style guide pages are in scope for initial release.
- The experience should feel smooth, relevant, and tell a story of interconnectedness and the cyclical nature of life.

### 3.7 Planned Sections (Future Development)

> _Do not scaffold these yet. Only landing and style guide pages are in scope for now._

- Landing page with advanced scroll animations
- About Me / Site (domain ideas, digital future, personal story)
- Passions / Projects (charity work, personal projects)
- Professional / Work (work history, resume)
- Artist / Art-Music-Design-Image-Videos (music player, image gallery, inspiration)
- Gamer / Game Dev (resources, links)
- Developer / Development (links, resources)
- Thinker / Blog (longform, research topics)
- Resourceful / Resources (goodies)
- Community / Contact (links, contacts, community boards)

---

## 4. Out of Scope (for Initial Release)

- Any pages or features beyond the landing page and style guide.
- Animations, advanced interactivity, or embedded apps/APIs.
- Automation beyond basic CI/CD setup.

---
