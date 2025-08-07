# Personal / Professional Website

## Project Overview

- **Stack:** Next.js (TypeScript, App Router), Tailwind CSS, ESLint, TurboRepo, import alias `@/*`
- **Hosting:** Netlify via GitHub
- **Initial Focus:** Mostly static site, with plans to embed apps, APIs, and more dynamic features over time.
- **Code Structure:** Clear distinction between server-side and client-side code, with well-defined rules.

## Initial Pages

1. **Landing Page:**
   - Welcome placeholder (no animations at first).
2. **Style Guide:**
   - Sections to organize fonts, components, buttons, and other visual elements.
   - Serves as a living reference for themes, colors, and styling.
   - Prefer in-code, real-time editable style guide over external tools (e.g., Netlify Visual Editor).
   - Open to exploring packages that help with style documentation, but want it close to the codebase.

## Development Foundations

- Prioritize foundational setup: rules, type safety, configuration, and project structure before major design or code implementation.
- Maintain a clear, organized, and type-safe codebase.

## Documentation & Resources

- Keep an organized section in `/docs` with official resources for troubleshooting and reference.
- Research and document:
  - Next.js and Netlify integration (media optimization, caching, etc.).
  - Any backend work handled by Netlify/Next.js, and identify gaps to fill without redundancy.

## Styling & Theming

- **Base:** Tailwind CSS.
- **A/B Testing:**
  - Create branches for preview and for testing opinionated UI packages (e.g., Material UI, shadcn).
  - Ensure all branches (main, preview, A/B) stay up-to-date and in sync, regardless of where changes originate.
  - Develop a workflow for merging and synchronizing branches to avoid falling behind or merge headaches.

## GitHub & Automation

- Plan to set up:
  - GitHub Actions for CI/CD.
  - Dependabot and other automation flows for PRs, issues, and workflow routines.
- Initial automation can wait until the site is stable and ready to go live.
- Intend to leverage more of GitHub’s automation features (actions, agents, etc.) beyond basic CI/CD.

## Creative Direction

- **Theme:** Immersive, creative, and interactive.
- **Concept:**
  - Start with a view of space.
  - Scroll to zoom into the galaxy, through clouds, into Earth’s atmosphere, down to map view, tree level, underground, and back out to space.
  - This journey will be visually represented as the site evolves.

## Planned Sections (for future development)

> _Note: Only the landing page and style guide will be created initially. The following sections are planned for later and should not be scaffolded yet._

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

> _Section names, order, and design will evolve as the project progresses._
