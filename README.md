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
[![Storybook](https://img.shields.io/badge/Storybook-8-FF4785?logo=storybook)](https://storybook.js.org/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify)](https://www.netlify.com/)

## ✨ Features

- **⚡ Next.js 15** with App Router for optimal performance
- **🎯 TypeScript** strict mode for bulletproof code
- **🎨 Tailwind CSS** for beautiful, responsive design
- **📚 Storybook** for isolated component development
- **🔄 Automated Preview** branch sync with GitHub Actions
- **🚀 Netlify Deployment** with automatic previews

## 🏗️ Architecture

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

# Launch Storybook
npm run storybook

# Build for production
npm run build
```

## 🌟 Development Workflow

- **`main`** → Production stable branch
- **`preview`** → Auto-synced integration branch
- **Storybook** → Component development & documentation
- **TypeScript** → Strict type checking with `npm run type-check`
- **ESLint** → Code quality with `npm run lint`

## 📖 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- [Project Plan](./docs/plan.md)
- [Branch Sync Process](./docs/branch-sync.md)
- [Bootstrap Guide](./docs/bootstrap.md)

## 🎨 Design Philosophy

Built with a vision of **interconnectedness and cyclical nature** - starting simple with a solid foundation, ready to evolve into an immersive visual journey.

---

**[Live Site](https://jamesnavinhill.netlify.app)** • **[Storybook](https://jamesnavinhill-storybook.netlify.app)** • **[Documentation](./docs/)**
