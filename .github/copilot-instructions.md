# GitHub Copilot Instructions

## Project Overview

This is a modern, creative, and interactive personal/professional website built with Next.js (TypeScript, App Router), Tailwind CSS, ESLint, and Netlify hosting. The project emphasizes type safety, maintainability, and clear separation between server-side and client-side code.

## Key Technologies & Framework

- **Next.js 14+** with App Router
- **TypeScript** (strict mode enabled)
- **Tailwind CSS** for styling
- **Storybook** for component development and documentation
- **ESLint** with strict configuration
- **Netlify** for hosting with `@netlify/plugin-nextjs`

## Code Structure & Conventions

### Directory Structure

```
src/
  app/                 # App Router (server-first pages/layouts)
  components/
    client/            # Interactive components requiring state/events
    server/            # Pure/data-presentational server components
    ui/                # Reusable primitives (buttons, typography)
  lib/                 # Server-only utilities (fetchers, config)
  lib-client/          # Client-only utilities (browser APIs, localStorage)
  styles/              # Tailwind entrypoints, global CSS, tokens
  config/              # Central runtime config maps
  types/               # Shared TypeScript types
```

### Server vs Client Component Rules

**CRITICAL**: Maintain strict separation between server and client code.

#### Server Components (Default)

- No `"use client"` directive needed
- Use for pages, layouts, and static content
- Can perform data fetching with `fetch()`
- Can access environment secrets and server-only APIs
- Cannot use React hooks or browser APIs

#### Client Components

- **MUST** include `"use client"` directive at the top
- Use for interactive components requiring state/events
- Can use React hooks (`useState`, `useEffect`, etc.)
- Can access browser APIs, localStorage, etc.
- Cannot access server-only code or secrets

#### Directory-Based Rules

- Components in `src/components/client/` MUST be client components
- Components in `src/components/server/` MUST be server components
- Code in `src/lib/` is server-only and CANNOT be imported by client code
- Code in `src/lib-client/` is client-only

### Naming Conventions

- Use descriptive component names: `HeroSection`, `NavigationMenu`
- Optional suffixes for clarity: `Button.client.tsx`, `Hero.server.tsx`
- Server Components are the default (no special naming required)
- Client Components should be clearly marked

## TypeScript Configuration

- Use **strict mode** with all strict options enabled
- Enable `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`
- Use path aliases: `@/*` maps to `src/*`
- Ensure type safety is prioritized over convenience

## Styling Guidelines

### Tailwind CSS

- Use Tailwind utility classes as the primary styling method
- Extend `tailwind.config.js` with custom design tokens
- Support dark mode with `class` strategy
- Use semantic color names in custom palette

### Component Development

- **Storybook is the single source of truth** for component development
- All UI components MUST have corresponding `.stories.tsx` files
- Develop components in isolation using Storybook first
- Document props, variants, and usage patterns in stories

## Current Project Scope

### In Scope (Initial Release)

- Landing page (static placeholder)
- Storybook setup with component library
- TypeScript and ESLint configuration
- Basic Tailwind setup with design tokens
- Server/client component separation

### Out of Scope (Future Development)

- Advanced animations or scroll effects
- Dynamic content or APIs
- User authentication
- Database integration
- Advanced theming beyond basic dark/light mode

## Branching Strategy

- `main`: Production stable
- `preview`: Integration branch for features
- `ab/<experiment-name>`: A/B testing branches for UI experiments

## Code Quality Standards

### Required Checks

- ESLint must pass with zero errors
- TypeScript compilation with `tsc --noEmit` must pass
- Storybook build must complete successfully
- Basic accessibility checks (jsx-a11y rules)

### ESLint Rules

- Import ordering and boundaries enforced
- Tailwind class ordering
- React hooks rules
- Accessibility rules (jsx-a11y)
- Custom rules to prevent server/client boundary violations

## Performance & Accessibility

- Mobile-first responsive design
- Accessibility is a priority from the start
- Use semantic HTML landmarks
- Ensure proper focus management
- Respect `prefers-reduced-motion`
- Optimize images using Next.js Image component

## Deployment

- Primary deployment on Netlify using `@netlify/plugin-nextjs`
- Automatic preview deployments for `preview` and `ab/*` branches
- Environment variables prefixed with `NEXT_PUBLIC_` for client access

## Dependencies

### Current Core Dependencies

- next, react, react-dom, typescript
- tailwindcss, postcss, autoprefixer
- eslint with Next.js configuration

### Planned Additions

- Storybook with React Vite builder
- ESLint plugins: import, jsx-a11y, tailwindcss
- Tailwind plugins: typography, forms, animate
- Netlify plugin for Next.js

## Code Generation Guidelines

When generating code:

1. **Always** consider if a component should be server or client
2. **Default to server components** unless interactivity is required
3. **Include proper TypeScript types** for all props and functions
4. **Use Tailwind utility classes** for styling
5. **Create corresponding Storybook stories** for new components
6. **Follow the established directory structure**
7. **Add JSDoc comments** for component props and complex functions
8. **Ensure accessibility** with proper ARIA labels and semantic HTML
9. **Handle loading and error states** appropriately
10. **Use Next.js best practices** for routing, metadata, and optimization

## Creative Vision (Long-term)

The site will eventually feature an immersive visual journey starting in space, zooming through galaxy, clouds, Earth's atmosphere, down to map view, tree level, underground, and back to space. This represents interconnectedness and the cyclical nature of life. Current work should keep this vision in mind but focus only on foundational elements.

## Documentation Requirements

- Update Storybook documentation for new components
- Add comments for complex logic
- Document architectural decisions in `docs/decisions/`
- Keep `docs/` directory updated with integration notes

Remember: **Foundation first, features second**. Prioritize type safety, maintainability, and clear architecture over rapid feature development.
