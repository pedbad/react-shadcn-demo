# bun-react-tailwind-shadcn-template

![Bun](https://img.shields.io/badge/Bun-1.3.1-000000?logo=bun&logoColor=ffffff)
![React](https://img.shields.io/badge/React-19.0.0-20232a?logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-0F172A?logo=tailwindcss&logoColor=38B2AC)

This project was created with `bun init` using the React + Tailwind + shadcn preset. Follow the steps below to download, install, and run it locally.

## Prerequisites

- [Bun](https://bun.com) **v1.3.1** or newer installed on your machine
- Git access to `git@github.com:pedbad/react-shadcn-demo.git`

## Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:pedbad/react-shadcn-demo.git
   cd react-shadcn-demo
   ```
2. **Install dependencies**
   ```bash
   bun install
   ```
3. **Start the development server**
   ```bash
   bun dev
   ```
   Bun serves the app at the URL printed in the terminal and reloads on changes.

4. **(Optional) Run the production build locally**
   ```bash
   bun run build.ts
   bun start
   ```
   `bun run build.ts` outputs static assets into `dist/` and `bun start` serves them with the Bun runtime.

## Theming & Tailwind configuration

- **Global color tokens** live in `styles/globals.css`. The `@theme inline` block maps Tailwind utilities (e.g., `bg-background`, `text-primary`) to CSS custom properties, while the `:root` and `.dark` sections provide the light/dark palettes shadcn components consume.
- **Dark mode** is controlled by toggling a `.dark` class on the root element. Because both palettes expose the same CSS variables, switching modes automatically updates every Tailwind utility and shadcn component referencing them.
- **Fonts** are set globally in `src/index.css` via `@layer base`. Update the `font-sans` family inside the inline theme or define custom `@font-face` rules in `styles/globals.css` to change typography everywhere.
- **No `tailwind.config.js`** is required with Tailwind v4—theme customization happens directly inside `styles/globals.css`, keeping design tokens close to the CSS that consumes them.

### Current theme: Cambridge University palette

The default palette now mirrors Cambridge University branding:

- **Light mode** blends Cambridge Blue interactive elements with a cream backdrop for academic presentation while maintaining WCAG AA contrast (oklch-based tokens in `:root`).
- **Dark mode** swaps to a deep navy base with brightened Cambridge Blue primaries for readability (tokens in the `.dark` block).
- Custom vars like `--cambridge-blue`, `--cambridge-cream`, and `--cambridge-dark-navy` keep the palette centralized and easy to tweak.
