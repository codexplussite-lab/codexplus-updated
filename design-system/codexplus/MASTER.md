# CodeXplus Design System — Master Specification

**Project:** CodeXplus Digital Studio & Software Engineering  
**Version:** 1.0.0  
**Status:** Living Design System Source of Truth  
**Target Stack:** Next.js 15 (App Router), Tailwind CSS v3.4+, Framer Motion v12, React 19  
**Guidance Benchmark:** UI/UX Pro Max (B2B Digital Agency / SaaS & Engineering Studio)

---

## 1. Visual Direction & Design Philosophy

CodeXplus balances **engineered precision** with **contemporary digital studio depth**. Rather than generic neon SaaS gradients or illegible frosted glass, CodeXplus adopts **Architectural Obsidian**:

1. **High-Contrast Dark Canvas (Obsidian Base):** Pure dark foundations (`#030305`, `#09090D`, `#111118`) with calibrated luminance steps for layered hierarchy, avoiding light bleeding and muddy low-contrast grays.
2. **Signature Ultraviolet & Electric Iris:** Focused, high-value accents (`#6320EE`, `#8059E3`, `#A855F7`) used intentionally on interactive pathways, focal status indicators, and active CTA funnels.
3. **Structured Typography & Legibility:** Powered by `DM Sans` (with high geometric x-height and clear tabular figures) combined with monospace micro-tags (`JetBrains Mono` / `ui-monospace`) for technical authority.
4. **Performance-First Micro-Interactions:** Subtle, 60fps/120fps hardware-accelerated transforms (`transform: translate3d`, `opacity`) capped at 150ms–250ms with strict `@media (prefers-reduced-motion: reduce)` fallbacks.
5. **Restrained Depth:** Subdued 1px perimeter borders (`rgba(255, 255, 255, 0.08)` to `0.14`) and focused soft ambient backdrops rather than excessive blurs or heavy drop shadows.

---

## 2. Preserved Existing Design Decisions

The following elements from the original Webangles-inspired baseline are explicitly preserved:
* **The Brand Identity & Logo:** "CodeX+" logotype with gradient square icon mark and `#8059E3` plus symbol.
* **Atmospheric WebGL Shaders:** `Velaris.tsx` fluid mesh gradient in the Hero and `AmbientOrb.tsx` pre-footer accent, preserved with added reduced-motion static fallbacks.
* **Pill-Form Factor Accents:** Rounded pill tags and hero CTA buttons that anchor the studio look.
* **Dark Obsidian Aesthetic:** Black background with violet-accented card perimeters.

---

## 3. Design Tokens & Variables

### 3.1 Color Palette & Semantic Tokens

```css
:root {
  /* Surfaces & Backgrounds */
  --color-bg-canvas: #030305;       /* Primary page background */
  --color-bg-subtle: #08080C;       /* Secondary section alternating bg */
  --color-surface-card: #0D0D14;    /* Primary card surface */
  --color-surface-card-hover: #13131E; /* Elevated card surface */
  --color-surface-elevated: #181826;/* Modals, popovers, dropdowns */

  /* Text & Foreground (Strict WCAG 2.2 AA / AAA contrast) */
  --color-text-primary: #FFFFFF;    /* 21:1 against canvas - Headings & key copy */
  --color-text-secondary: #E2E8F0;  /* 14:1 against canvas - Body paragraphs */
  --color-text-muted: #94A3B8;      /* 6.3:1 against canvas - Captions, tags, labels (Passes AA 4.5:1) */
  --color-text-disabled: #475569;   /* 3.1:1 - Disabled controls only */

  /* Brand & Interactive Accents */
  --color-brand-primary: #6320EE;   /* Primary purple CTA base */
  --color-brand-hover: #7535F8;     /* Hover state */
  --color-brand-light: #9B72F4;     /* Eyebrow text, active borders */
  --color-brand-glow: rgba(99, 32, 238, 0.22); /* Ambient backdrops */

  /* Borders & Dividers */
  --color-border-subtle: rgba(255, 255, 255, 0.07);
  --color-border-default: rgba(255, 255, 255, 0.12);
  --color-border-hover: rgba(255, 255, 255, 0.22);
  --color-border-focus: #9B72F4;

  /* Feedback & Utility States */
  --color-success: #10B981;
  --color-success-bg: rgba(16, 185, 129, 0.12);
  --color-warning: #F59E0B;
  --color-warning-bg: rgba(245, 158, 11, 0.12);
  --color-error: #EF4444;
  --color-error-bg: rgba(239, 68, 68, 0.12);
  --color-info: #0284C7;
  --color-info-bg: rgba(2, 132, 199, 0.12);
}
```

### 3.2 Typography Scale

* **Primary Sans:** `DM Sans` (Google Fonts, `var(--font-dm-sans)`, weights: 400, 500, 600, 700)
* **Code / Technical Mono:** `JetBrains Mono`, `ui-monospace`, monospace (weights: 400, 500)

| Token | Size | Line Height | Tracking | Weight | Semantic Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display` | 4.25rem (68px) | 1.08 | -0.035em | 700 / 800 | Hero primary statement |
| `h1` | 3.25rem (52px) | 1.15 | -0.03em | 700 | Primary page headings |
| `h2` | 2.25rem (36px) | 1.25 | -0.025em | 700 | Section titles |
| `h3` | 1.5rem (24px) | 1.35 | -0.02em | 600 | Card & feature headings |
| `h4` | 1.125rem (18px) | 1.45 | -0.01em | 600 | Subsection headers |
| `body-lg` | 1.125rem (18px) | 1.65 | 0 | 400 / 500 | Hero intros, lead paragraphs |
| `body` | 1.0rem (16px) | 1.60 | 0 | 400 | Standard body copy |
| `body-sm` | 0.875rem (14px) | 1.50 | 0 | 400 / 500 | Card descriptions, form labels |
| `caption` | 0.75rem (12px) | 1.40 | +0.02em | 500 | Metadata, helper texts |
| `mono-eyebrow` | 0.6875rem (11px) | 1.30 | +0.08em | 600 | Uppercase badges, tech categories |

### 3.3 Spacing & Layout Architecture

* **Base Unit:** 4px grid (`0.25rem`)
* **Spacing Scale:**
  * `space-1`: 4px (`0.25rem`)
  * `space-2`: 8px (`0.5rem`)
  * `space-3`: 12px (`0.75rem`)
  * `space-4`: 16px (`1.0rem`)
  * `space-6`: 24px (`1.5rem`)
  * `space-8`: 32px (`2.0rem`)
  * `space-12`: 48px (`3.0rem`)
  * `space-16`: 64px (`4.0rem`)
  * `space-24`: 96px (`6.0rem`)
  * `space-32`: 128px (`8.0rem`)
* **Container Breakpoints:**
  * Small: `sm` = `640px` (padding: `16px`)
  * Medium: `md` = `768px` (padding: `24px`)
  * Large: `lg` = `1024px` (padding: `32px`)
  * Extra Large: `xl` = `1280px` (padding: `32px`, max container: `1200px`)
  * Studio Wide: `2xl` = `1536px` (max container: `1340px`)
* **Section Rhythm:**
  * Desktop Section Padding: `py-24` (96px) or `py-28` (112px)
  * Mobile Section Padding: `py-16` (64px)

### 3.4 Radii & Elevation (Borders & Shadows)

* **Border Radii:**
  * Pill / Full: `9999px` (Primary buttons, floating navbar, badges)
  * Large Card: `1.25rem` (20px) (`rounded-2xl`)
  * Standard Control: `0.75rem` (12px) (`rounded-xl` for form inputs, modals)
  * Micro Control: `0.5rem` (8px) (`rounded-lg` for icon containers, tooltips)
* **Shadows & Elevation:**
  * Flat Card: `border: 1px solid var(--color-border-subtle)`
  * Hover Card: `box-shadow: 0 12px 36px -8px rgba(0, 0, 0, 0.7), 0 0 0 1px var(--color-border-hover)`
  * Primary Button Shadow: `box-shadow: 0 4px 20px -2px rgba(99, 32, 238, 0.45)`
  * Modal Overlay: `box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1)`

---

## 4. Component Specifications

### 4.1 Navigation (`Navbar`)
* **Desktop:** Floating pill container, fixed at `top-4`, max-width `68rem` (1088px), height `56px` (`h-14`), backdrop filter `blur-xl bg-[#09090D]/85 border border-white/10`.
* **Mobile (< 768px):** Retains floating compact pill (`h-14`) with logo + primary CTA + accessible Hamburger toggle button. Tapping opens a full-screen or slide-down navigation sheet with `aria-modal="true"`, focus trap, and keyboard `Escape` dismissal.
* **Touch Targets:** All nav items feature at least `44x44px` hit areas.

### 4.2 Buttons & Interactive Controls

1. **Primary Button (Purple Pill CTA):**
   * Default: `background: linear-gradient(180deg, #6320EE 0%, #8059E3 100%)`, color: `#FFFFFF`, font-weight: 600, padding: `12px 28px`, border-radius: `9999px`.
   * Hover: Brightness `110%`, translate `translateY(-1px)`, shadow intensified.
   * Active: Translate `translateY(1px)`, scale `0.98`.
   * Focus-Visible: `outline: 2px solid #FFFFFF; outline-offset: 3px;` (WCAG 2.2 AA compliant).
   * Disabled: `opacity: 0.45; cursor: not-allowed; pointer-events: none;`.

2. **Secondary Button (Frosted Border):**
   * Default: `background: rgba(255, 255, 255, 0.05)`, border: `1px solid rgba(255, 255, 255, 0.15)`, text: `#E2E8F0`.
   * Hover: `background: rgba(255, 255, 255, 0.10)`, text: `#FFFFFF`, border-color: `rgba(255, 255, 255, 0.25)`.
   * Active: `background: rgba(255, 255, 255, 0.14)`.

3. **Icon Action Button (Socials & Arrow links):**
   * Size: `44x44px` minimum interactive target (internal icon: `16px` to `20px`).
   * Accessibility: Must possess explicit `aria-label` identifying destination (e.g. `aria-label="View CodeXplus on GitHub"`).

### 4.3 Content Cards & Surfaces (`webangles-card`)
* Background: `linear-gradient(180deg, rgba(16, 16, 24, 0.8) 0%, rgba(9, 9, 14, 0.95) 100%)`.
* Border: `1px solid rgba(255, 255, 255, 0.08)`.
* Hover State: Smooth border transition (`border-color: rgba(155, 114, 244, 0.4)`), translateY `-3px` (disabled under reduced motion).

### 4.4 Form Controls & States (`ContactForm`)
* **Label Association:** Every input possesses explicit `<label htmlFor="field-id">` matching `<input id="field-id">`.
* **Container:** Padding `14px 18px`, `background: rgba(255, 255, 255, 0.04)`, `border: 1px solid rgba(255, 255, 255, 0.10)`, font-size: `15px`.
* **States:**
  * Default: Text `#FFFFFF`, placeholder `#64748B` (meets 4.5:1 on focus).
  * Hover: `border-color: rgba(255, 255, 255, 0.20)`.
  * Focus: `border-color: #9B72F4`, ring `0 0 0 3px rgba(99, 32, 238, 0.25)`.
  * Error State: `border-color: #EF4444`, ring `0 0 0 3px rgba(239, 68, 68, 0.20)`, accompanied by an inline error message with `aria-live="polite"`.
  * Loading / Submitting State: Disabled inputs, spinner inside CTA, `aria-busy="true"`.
  * Success Notification: Elevated banner with `#10B981` border and check icon.

### 4.5 Badges & Pills
* **Pill Category Badge:**
  * Gradient fill: `linear-gradient(180deg, #6320EE 0%, #8059E3 100%)`.
  * Text: `10px` or `11px`, uppercase, letter-spacing `+0.08em`, font-weight 700.
* **Secondary Tag / Counter:**
  * Background: `rgba(255, 255, 255, 0.05)`, border: `1px solid rgba(255, 255, 255, 0.08)`, text: `#94A3B8`.

---

## 5. Accessibility (WCAG 2.2 AA) & Reduced Motion Specifications

### 5.1 Focus Management & Visual Focus Indicators
* No removing outline (`outline: none`) without replacement.
* All interactive elements define:
  ```css
  :focus-visible {
    outline: 2px solid #FFFFFF;
    outline-offset: 3px;
  }
  ```
* Modal dialogues and drawers trap tab focus and return focus to the trigger on exit.

### 5.2 Motion Rules & `prefers-reduced-motion`
* Animation timing curve: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out).
* Duration defaults: Micro-interactions `150ms–200ms`, drawer/modal transitions `250ms`.
* **Reduced Motion Rule:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    .animate-marquee {
      animation: none !important;
      overflow-x: auto !important;
    }
  }
  ```
* When `prefers-reduced-motion: reduce` is detected:
  * WebGL canvases (`Velaris`, `AmbientOrb`) pause frame renders and display a static background mesh gradient.
  * Marquee replaces continuous linear scrolling with a static wrapped grid or keyboard-navigable overflow row.

---

## 6. Pre-Implementation Checklist

- [x] Base colors and contrast verified (all body/caption text > 4.5:1, headings > 14:1).
- [x] Clear 44x44px minimum touch targets defined.
- [x] Accessible form labels and error feedback patterns specified.
- [x] Visible keyboard focus ring established (`outline: 2px solid #FFFFFF; offset: 3px;`).
- [x] Prefers-reduced-motion overrides defined for WebGL and marquee.
- [x] Verified zero destruction of existing project branding or structure.
