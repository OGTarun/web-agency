# OG Studios — Design System

Dark, minimal, luxury, cinematic. Premium over flashy; elegant over noisy.

## Tokens

Defined in `app/globals.css` under `@theme inline` and consumed as Tailwind utilities.

### Color

| Token | Value | Usage |
| --- | --- | --- |
| `bg-background` | `#010205` | Page canvas |
| `text-foreground` | `#ededed` | Primary text |
| `text-muted` | `#9aa1ad` | Secondary text |
| `text-faint` | `#5c6370` | Tertiary / captions |
| `border-line` | `rgba(255,255,255,0.08)` | Hairlines, card borders |
| `border-line-strong` | `rgba(255,255,255,0.14)` | Hover borders, emphasis |
| `bg-glass` | `rgba(255,255,255,0.035)` | Glass surface |
| `bg-glass-strong` | `rgba(255,255,255,0.06)` | Glass surface hover |
| `text-accent` | `#8b5cf6` | Primary accent |
| `text-accent-soft` | `#a78bfa` | Accent hover / highlights |
| `text-accent-cyan` | `#22d3ee` | Live-status accents (eyebrows, dots) |

Accent gradient for display words: `violet-300 → indigo-300 → sky-300`, clipped to text.

### Typography

| Token | Font | Usage |
| --- | --- | --- |
| `font-sans` | Geist Sans | Body, UI, headlines |
| `font-mono` | Geist Mono | Eyebrows, labels, indexes, metadata |
| `font-display` | Instrument Serif (italic) | Accent words, wordmark, large numerals |

Rules:

- Sans headings: tight tracking (`-0.035em` to `-0.05em`), `font-medium`, near-1 line-height.
- Serif italic: reserved for a single accent phrase per heading — never more than one.
- Eyebrows: `font-mono`, `text-[11px]`, `uppercase`, `tracking-[0.24em]`, preceded by a glowing `accent-cyan` dot.
- Fluid display scale: `clamp(2.6rem, 7vw, 5.4rem)`.

### Surface

Glass surfaces use `border-line + bg-glass + rounded-2xl/3xl`. Layering creates hierarchy — never apply glass everywhere. Cards lift on hover with `y: -6` and a `border-accent-soft/40` accent.

### Spacing

- Section padding: `py-28 md:py-36` (`py-40` for contact).
- Card grids: `gap-5`.
- Content container: `max-w-6xl px-6 sm:px-8`.

### Motion

- Entrance: fade + `y: 28 → 0`, `0.7s`, ease `[0.16, 1, 0.3, 1]`, staggered via `Reveal`.
- Magnetic buttons: spring `damping 18 / stiffness 260`, translate factor `0.12`.
- 3D emblem: quaternion slerp `1 - exp(-3.2 · delta)`, pointer-coupled.
- `prefers-reduced-motion` honored in DOM (`Reveal`), the 3D emblem (static pose), and the WebGL frameloop (`demand`).

## 3D scene tiers

`components/hero/quality.tsx` selects `high` / `low` from device concurrency, memory, and pointer type.

| Setting | High | Low |
| --- | --- | --- |
| Canvas DPR | `[1, 1.5]` | `[1, 1]` |
| Bloom | On | Off |
| Glass glyphs | Transmission PBR | Cheap dielectric |
| Galaxy / stars | 260 / 340 | 130 / 160 |
| Particles | 64 | 28 |
| Asteroids | 18 | 8 |
| Environment | 128 | 64 |
