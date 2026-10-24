# Token Architecture

## Overview

This system uses a 3-tier token model shared across 3 brands. Switching brands requires only changing a `data-brand` attribute on the root element — no component code changes.

```
[data-brand="1"] → Brand 1 CSS variables load
[data-brand="2"] → Brand 2 CSS variables load
[data-brand="3"] → Brand 3 CSS variables load
```

---

## Tier 1: Primitives

Raw values with no semantic meaning. Never used directly in components.

**Global** (`primitives/global.json`) — shared across all brands:
- Spacing scale (4px base, t-shirt sizing)
- Radius scale (0 → 9999px)
- Font size scale (10px → 72px)
- Font weights, line heights, letter spacing
- Z-index scale
- Motion duration + easing

**Brand-specific** (`primitives/brand-{n}.json`) — unique per brand:
- Full color palette (named by hue + step, e.g. `color.amber.400`)
- Font family definitions

### Naming

```
{category}.{name}.{step}

color.amber.400
color.gray.950
font-size.16
spacing.8
radius.full
```

---

## Tier 2: Semantic

Intent-based names that reference primitives. This is where brands diverge — each brand maps the same semantic names to different primitive values.

Files: `semantic/brand-{n}.json`

### Color groups

| Group | Purpose |
|---|---|
| `color.background.*` | Page, surface, elevated, overlay, emphasis |
| `color.text.*` | Primary, secondary, tertiary, disabled, inverse, link |
| `color.border.*` | Subtle, default, strong, emphasis |
| `color.action.*` | Primary button/CTA states |
| `color.feedback.*` | Success, warning, error, info — background/text/border/icon |

### Typography groups

| Group | Purpose |
|---|---|
| `typography.font-family.*` | base, mono, display |
| `typography.size.*` | xs → 4xl (mapped from scale to intent) |
| `typography.weight.*` | body, emphasis, heading, display |
| `typography.line-height.*` | display, heading, body, label |
| `typography.letter-spacing.*` | display, heading, body, label, mono |

### Other groups

| Group | Purpose |
|---|---|
| `border-radius.*` | sm, md, lg, xl, full — brands vary dramatically here |
| `shadow.*` | sm, md, lg (+ brand-specific extras e.g. glow) |
| `motion.*` | duration.fast/normal/slow, easing.default/spring |
| `spacing.component.*` | xs → 2xl — internal component padding/gap |
| `spacing.layout.*` | xs → 2xl — page-level spacing |

### Naming

```
{group}.{subgroup}.{variant}

color.background.canvas
color.text.primary
color.action.background-hover
color.feedback.error.text
typography.font-family.mono
border-radius.lg
shadow.glow
spacing.component.md
```

---

## Tier 3: Component

Component-scoped tokens that reference semantic tokens. Never reference primitives directly.

Files: `component/{name}.json`

Components: `button`, `input`, `card`, `nav`, `link`, `list`, `badge`, `typography`

### Naming

```
component.{name}.{variant}.{property}

component.button.primary.background
component.button.primary.border-radius
component.input.border-focus
component.card.shadow
component.nav.item.foreground-active
```

---

## Build output

Style Dictionary compiles tokens into scoped CSS custom properties:

```css
/* build/css/global.css */
:root {
  --ds-spacing-4: 16px;
  --ds-radius-full: 9999px;
  /* ... */
}

/* build/css/brand-1.css */
[data-brand="1"] {
  --ds-color-background-canvas: #0D0D16;
  --ds-color-text-primary: #F0EDE8;
  /* ... */
}

/* build/css/components.css */
:root {
  --ds-component-button-primary-background: var(--ds-color-action-background);
  --ds-component-button-primary-border-radius: var(--ds-border-radius-md);
  /* ... */
}
```

All brand CSS files are loaded simultaneously. The `data-brand` attribute determines which set of values is active via CSS cascade.

---

## Brand personalities

| | Brand 1 | Brand 2 | Brand 3 |
|---|---|---|---|
| **Archetype** | Dev tool, optimistic | Consumer wellness, extreme | Enterprise B2B, extreme |
| **Mode** | Dark | Light | Light |
| **Accent** | Amber / gold | Sage + terracotta | Corporate blue |
| **Type — UI** | Inter + JetBrains Mono | DM Sans | IBM Plex Sans |
| **Type — display** | JetBrains Mono | Playfair Display | IBM Plex Sans |
| **Type — body** | Inter | Lora (serif) | IBM Plex Sans |
| **Radius** | Sharp (2–8px) | Very rounded (16–32px, pill) | None to minimal (0–4px) |
| **Density** | Moderate | Spacious, editorial | Dense, utilitarian |
| **Shadows** | Dark + amber glow | Soft, warm | None or flat border |
