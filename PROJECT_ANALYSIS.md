# OG Studios — Project Analysis

## Scope and audit notes

This analysis covers every authored file and folder in the repository as of 31 July 2026. `node_modules/` (32,630 installed package files) and `.next/` (769 generated Next.js files) are present but are dependency/build outputs rather than project source; they are therefore represented here, not individually enumerated. No existing project code was modified for this audit.

## Project purpose

OG Studios is an early-stage premium digital agency website. Its stated target is an Awwwards-calibre experience with a dark, minimal, luxury and cinematic visual language. The current implementation is a single hero-led home page that combines Framer Motion with a React Three Fiber AI-core visual.

The intended future site includes services, portfolio, process, testimonials, contact, footer, loading screen, custom cursor, SEO, and performance work. Those sections have not yet been implemented.

## Complete folder structure

```text
web-agency/
├── .git/                         # Git metadata (100 files; not application source)
├── .next/                        # Generated Next.js output (769 files; ignored)
├── node_modules/                 # Installed dependencies (32,630 files; ignored)
├── app/
│   ├── favicon.ico               # Route favicon
│   ├── globals.css               # Global Tailwind import, theme tokens, body styles
│   ├── layout.tsx                # Root document shell, fonts, metadata
│   └── page.tsx                  # `/` route composition
├── components/
│   ├── hero/
│   │   ├── AnimatedHeadline.tsx  # Four-line animated hero title
│   │   ├── FloatingGlassCard.tsx # Reusable floating metric card
│   │   ├── Hero.tsx              # Hero compositor and section layout
│   │   ├── HeroBackground.tsx    # Aurora, vignette, grid, and star field
│   │   ├── HeroButtons.tsx       # Primary/secondary hero actions
│   │   ├── HeroStats.tsx         # Hero metric cards
│   │   ├── MouseSpotlight.tsx    # Spring-smoothed cursor glow
│   │   ├── Particles.tsx         # DOM particle layer
│   │   └── Scene.tsx             # R3F canvas and internal AI Core
│   └── navbar/
│       └── Navbar.tsx            # Fixed animated navigation bar
├── public/
│   ├── file.svg                  # Unused Next.js starter asset
│   ├── globe.svg                 # Unused Next.js starter asset
│   ├── next.svg                  # Unused Next.js starter asset
│   ├── vercel.svg                # Unused Next.js starter asset
│   └── window.svg                # Unused Next.js starter asset
├── .gitignore                    # Git exclusions
├── AGENTS.md                     # Next.js-version instruction for contributors
├── CLAUDE.md                     # Delegates to AGENTS.md
├── CODING_WORKFLOW.md            # Required development workflow
├── eslint.config.mjs             # Next Core Web Vitals and TypeScript lint config
├── next-env.d.ts                 # Generated Next.js TypeScript declarations
├── next.config.ts                # Empty/default Next.js configuration
├── OG_RULES.md                   # Brand, quality, motion, and Three.js rules
├── package-lock.json             # Locked npm dependency graph
├── package.json                  # Scripts and dependency manifest
├── postcss.config.mjs            # Tailwind v4 PostCSS plugin
├── PROJECT_CONTEXT.md            # Product vision and planned structure
├── README.md                     # Uncustomized Create Next App instructions
└── tsconfig.json                 # Strict TypeScript and `@/*` alias configuration
```

## Architecture and component hierarchy

The App Router provides one route. `app/layout.tsx` owns document-level concerns (HTML language, font variables, global CSS, and metadata); `app/page.tsx` owns the page shell. The page uses a server component by default, but both direct children are client components, so their interactive subtrees are hydrated in the browser.

```text
RootLayout
└── Home (`/`)
    ├── Navbar [client]
    │   ├── animated OG Studios wordmark
    │   ├── desktop link list (Home, Services, Portfolio, About, Contact)
    │   └── Start Project button
    └── Hero [client]
        ├── HeroBackground [client]
        │   ├── animated violet glow
        │   ├── animated cyan glow
        │   ├── vignette / grid / horizon / fades
        │   └── 120 animated stars
        ├── MouseSpotlight [client]
        ├── Particles [client] (40 particles)
        ├── Scene [client]
        │   └── Canvas
        │       ├── lights and night environment
        │       ├── Core (internal component)
        │       │   ├── floating transmission sphere
        │       │   ├── emissive inner sphere
        │       │   ├── two animated torus rings
        │       │   └── 180 sparkles
        │       ├── 250 scene sparkles
        │       └── bloom postprocessing
        ├── FloatingGlassCard ×2 [client; desktop only]
        ├── AnimatedHeadline [client]
        ├── HeroButtons [client]
        └── HeroStats [client]
```

## Data flow and runtime behavior

There is no remote data layer, API route, CMS, persistent state, form submission, or shared application store. All displayed copy, links, metrics, and visual settings are component-local constants or props.

| Origin | Flow | Result |
| --- | --- | --- |
| `page.tsx` | Renders `Navbar` and `Hero` | Establishes the only page composition. |
| `Hero.tsx` | Imports and stacks visual/content components with z-indexes | Controls hero layering and passes three strings to each `FloatingGlassCard`. |
| `FloatingGlassCard` props | `title`, `value`, `icon` → rendered UI | The only explicit component prop flow beyond framework `children`. |
| Browser scroll | `Navbar` scroll listener → `scrolled` React state | Enables the nav’s border, translucent background, and blur after 20px. |
| Browser mouse | `MouseSpotlight` event → Framer motion values → springs | Moves the fixed violet cursor glow. |
| R3F frame loop | elapsed time and normalized canvas mouse → group/ref transforms | Continuously rotates and offsets the 3D core and rings. |
| Module/render random values | `Particles` module constant; `HeroBackground` render calls | Generates positions, sizes, durations, and delays for decorative elements. |

## Current strengths

- The project uses a sensible component boundary for the current scope: each hero concern has a focused file, while `Hero.tsx` remains a readable compositor.
- TypeScript is strict and the ESLint config includes Next.js Core Web Vitals and TypeScript presets.
- The visual hierarchy is already intentional: background effects, 3D core, floating cards, and content are separated by z-index and pointer-event rules.
- Interaction is progressively isolated: scroll, pointer glow, and per-frame 3D transforms are not lifted into a global state store, avoiding broad React rerenders.
- Framer Motion choices mostly use transform/opacity-based animation, which is typically GPU-friendly.
- The 3D implementation has a clear visual concept (glass shell, emissive core, orbiting rings, bloom) aligned with the product brief.
- `next/font` is configured at the root, which is a sound basis for optimized font delivery.
- Desktop-only floating cards prevent the side-card layout from crowding smaller screens.

## Weaknesses and functional gaps

- The site is currently only a hero and navigation; the planned content sections and all real information architecture are absent.
- Navigation links use `href="#"`, so they do not navigate or scroll to content. Both calls-to-action are buttons without handlers or destinations.
- The navbar has no mobile navigation pattern: the desktop links disappear below `md`, leaving only the wordmark and CTA.
- Root metadata still says “Create Next App” with a generated description. The README is also the unchanged starter document.
- Global CSS conflicts with the root font setup: `layout.tsx` provides Geist variables, but `body` explicitly uses Arial/Helvetica. The root colour tokens default to a light background while the page is manually dark.
- The declared `@/*` import alias is not used; components rely on relative imports.
- The public directory contains only unused starter SVGs. No optimized project imagery, OG social image, or brand asset set exists.
- `CODING_WORKFLOW.md` is untracked in Git at audit time; the report should be reviewed with the intended Git status before a commit.
- The two visible `icon` strings in `Hero.tsx` are mojibake (`ðŸ¤–`, `âš¡`) rather than correctly encoded emoji, which will render as corrupted text in many environments.
- Accessibility foundations are incomplete: neither decorative visual subsystem expresses reduced-motion behaviour; buttons have no action semantics beyond their labels; and the moving background has no device/capability fallback.

## Performance bottlenecks and risks

| Area | Evidence | Impact / recommendation |
| --- | --- | --- |
| 3D geometry | Two spheres use `128 × 128` segments; tori use 250 radial segments. | The central scene spends substantial CPU/GPU work on geometry that is unlikely to be visually distinguishable at its rendered size. Reduce segment counts after visual comparison. |
| Transmission material | `MeshTransmissionMaterial` with distortion, chromatic aberration, anisotropy and temporal distortion. | This is a costly refractive material, especially on integrated/mobile GPUs. Add a quality tier or simpler mobile material. |
| Postprocessing | Full-canvas bloom plus transmission, environment, 430 total sparkles, and continuous `useFrame`. | The hero is always active and can become the page’s dominant GPU cost. Lazy-load the scene, pause/offload it when not visible, and provide a static/CSS fallback. |
| Canvas background | A black `background` primitive is attached while the canvas has `alpha: true`. | The opaque canvas can conceal the lower-z background, spotlight, and DOM particles, making their render cost ineffective. Verify visually; remove the background primitive if transparent compositing is intended. |
| DOM motion count | 120 stars plus 40 particles each run independent infinite animations. | 160 animated elements add style/compositing work. Use a seeded CSS/canvas layer, lower the count, or disable it for reduced motion and small devices. |
| Hydration determinism | `HeroBackground` calls `Math.random()` during render; `Particles` randomizes at module initialization. | Server and client can produce different markup/styles, risking hydration warnings and visual shifts. Use deterministic seeded data or generate after mount. |
| Pointer/scroll listeners | Listeners are scoped and cleaned up, but process every mouse move/scroll. | Reasonable at this scale, but use a passive scroll listener and avoid state writes if the threshold value has not changed when expanding the site. |
| Loading strategy | `Scene` is synchronously imported into the hero. | The largest interactive dependency is part of initial client work. Use a client-only dynamic import with a deliberate visual placeholder. |

## Animation opportunities

- Make the two CTAs genuinely magnetic using a small cursor-relative translation, with a restrained maximum distance; this is part of the stated hero vision and would be more distinctive than scale-only hover.
- Couple the AI core’s glow, ring speed, and background aurora subtly to pointer proximity or scroll progress, while preserving a static reduced-motion mode.
- Introduce a single orchestrated entrance timeline for headline, paragraph, actions, metrics, and side cards. Current components animate independently with manually coordinated delays, which becomes harder to tune as content grows.
- Use section-transition choreography once future sections exist: a quiet hero exit and staggered content reveal would make the page cinematic without adding loud effects.
- Add `prefers-reduced-motion` behaviour across Framer Motion and R3F: no infinite float/particle movement, no mouse-following glow, and a still core treatment.
- Reserve high-frequency animation for the 3D object; make background stars/particles slower and fewer so motion feels authored rather than uniformly active.

## UI consistency issues

- The brief calls for minimal, premium restraint, but the hero simultaneously combines aurora glows, a grid, 120 stars, 40 particles, two sparkle fields, bloom, animated cards, a spotlight, and gradients. This risks visual competition rather than a clear focal point.
- Glass treatment is repeated across cards, stats, nav, and secondary CTA. It needs a small tokenized surface system (border opacity, fill, blur, radius, shadow) so “glass” creates hierarchy instead of becoming a default.
- Radius, type, and spacing scales are not centralized: cards use `rounded-2xl` and `rounded-3xl`; headings use hard-coded sizes; main content and nav have independent spacing choices.
- Accent colours drift among violet, fuchsia, cyan, and indigo. A defined primary/accent palette and semantic usage rules would make the visual language more coherent.
- The global stylesheet and page use conflicting background/foreground/font decisions, which makes future routes likely to look inconsistent.
- The nav appears production-like but its placeholder links and absent mobile menu undermine the perceived finish.
- The hero claims “premium typography,” but its font is effectively Arial because of the global body override; its multi-line treatment is strong but needs a deliberate final typeface and responsive line-length/scale system.

## Suggested improvements, in priority order

1. Establish core production foundations: real metadata, a branded README, accessible destinations/forms, real route or anchor targets, and a mobile navigation/menu.
2. Define design tokens in the Tailwind v4/global layer for background, text, glass surfaces, radii, spacing, shadows, and a constrained violet/cyan accent system. Align `globals.css` with the font variables already installed.
3. Correct the corrupted card icons and replace starter public assets with intentional brand, social-preview, and project media assets.
4. Make decorative data deterministic and add a complete reduced-motion policy. This addresses hydration stability, accessibility, and visual predictability together.
5. Profile and tier the 3D hero. Reduce geometry density, limit or conditionally disable expensive transmission/postprocessing, dynamically load the canvas, and implement a polished non-WebGL/mobile fallback.
6. Audit the canvas compositing order. Preserve either the CSS background layers or intentionally move them inside the scene; avoid rendering obscured visual layers.
7. Centralize hero content (nav links, hero actions, metrics, side-card data) in typed data modules before the site expands, so future sections can reuse models and actions rather than accumulating hard-coded strings.
8. Build the planned sections using the same compositional pattern, then add section-aware navigation, semantic landmarks, responsive layouts, SEO metadata, and performance budgets.
9. Replace independent entrance delays with shared motion variants and use animation sparingly around the 3D core. This will better support the requested cinematic, not-flashy, feel.
10. Add verification to the workflow: lint, production build, responsive/manual visual QA, keyboard navigation checks, reduced-motion checks, and WebGL performance testing on mid-range mobile hardware. `npm.cmd run lint` was run for this audit and reports six existing `react-hooks/purity` errors in `HeroBackground.tsx`, all caused by `Math.random()` calls during render.

## Tech stack summary

- **Framework/runtime:** Next.js 16.2.12 App Router, React 19.2.4, TypeScript 5 (strict).
- **Styling:** Tailwind CSS 4 via PostCSS, plus inline styles for complex gradients.
- **Motion:** Framer Motion 12.43.0; `react-countup` and `react-intersection-observer` are installed but unused.
- **3D:** Three.js 0.185.1, React Three Fiber 9.6.1, Drei 10.7.7, React Three Postprocessing 3.0.4, postprocessing 6.39.4, and maath (installed but unused directly).
- **Utilities/icons:** `clsx` and `lucide-react` are installed but unused directly.
- **Tooling:** ESLint 9 with Next.js Core Web Vitals/type presets, `next/font`, npm lockfile, and a default Next.js config.
