# jnh

```ascii
     ██ ███    ██ ██   ██
     ██ ████   ██ ██   ██
     ██ ██ ██  ██ ███████
██   ██ ██  ██ ██ ██   ██
 █████  ██   ████ ██   ██
```

> A modern, creative, and interactive personal website built with precision and care.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify)](https://www.netlify.com/)

## ✨ Features


 

This project emphasizes **foundation first, features second** with a clear separation between server and client components:

```text
src/
├── app/             # Next.js App Router (pages & layouts)
├── components/
│   ├── client/      # Interactive components
│   ├── server/      # Static/data components
│   └── ui/          # Reusable primitives
├── lib/             # Server-only utilities
├── lib-client/      # Client-only utilities
└── styles/          # Tailwind & global styles
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev


# Build for production
npm run build
```

## 🌟 Development Workflow

- **`main`** → Production stable branch
- **`preview`** → Auto-synced integration branch
- **TypeScript** → Strict type checking with `npm run type-check`
- **ESLint** → Code quality with `npm run lint`

## 📖 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- [Project Plan](./docs/plan.md)
- [Branch Sync Process](./docs/branch-sync.md)
- [Bootstrap Guide](./docs/bootstrap.md)

## 🎨 Design Philosophy - test change

Built with a vision of **interconnectedness and cyclical nature** - starting simple with a solid foundation, ready to evolve into an immersive visual journey.

---

**[Live Site](https://jamesnavinhill.netlify.app)** • **[Documentation](./docs/)**
