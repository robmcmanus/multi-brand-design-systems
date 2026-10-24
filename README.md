# Multi-brand design systems

Three design systems for three invented brands, built from one shared token architecture. A brand toggle on the case study page switches the whole interface between them.

The brands differ in more than colour. Each has its own palette, type, spacing, radius and motion, and its own set of components.

| Brand | Character |
|---|---|
| Brand 1 | Light, restrained. White canvas, near-black type, cool greys, indigo accent. Square controls. |
| Brand 2 | Warm and bold. Warm neutrals, yellow action colour, condensed display type. |
| Brand 3 | Dark and technical. Deep blue-black canvas, cyan glow accents, Space Grotesk. Dark by default, with a light mode. |

## Repository layout

```
packages/design-system/     Tokens, build script, components, Storybook
  tokens/
    primitives/             Raw values: global scales + one file per brand
    semantic/               Purpose-based tokens, one file per brand (+ brand-3-light overrides)
    component/              Component tokens (button, input, card, ...)
  build-tokens.mjs          Style Dictionary build -> build/css/
apps/website/               Case study site
.github/workflows/          CI
```

## Token architecture

Tokens follow the W3C Design Tokens format and have three tiers.

1. **Primitives** hold raw values, for example `color.neutral.500`.
2. **Semantic tokens** describe purpose and are the only layer that differs per brand, for example `color.action.background`.
3. **Component tokens** scope semantic tokens to a component, for example `button.primary.background`.

Radius is role-based: `border-radius.control` covers buttons, text fields, dropdowns and tabs. `border-radius.container` covers cards, modals and panels. Brands change their character by changing a few role values, not one value per component.

## Brand switching

The build outputs one CSS file per brand, scoped to an attribute:

```html
<html data-brand="1"> <!-- 1, 2 or 3 -->
```

All brand files load together, and the attribute decides which one applies.

Brand 3 is dark by default and also has a light mode, applied on top of its dark base:

```html
<html data-brand="3" data-theme="light">
```

`brand-3-light.json` holds colour and shadow overrides only. Brands 1 and 2 have one theme each.

## Getting started

Requires Node.js 22 or later.

```bash
npm install --legacy-peer-deps
npm run tokens --workspace=packages/design-system      # build the CSS tokens
npm run storybook --workspace=packages/design-system   # run Storybook
```

## Source of truth

The token files in this repository are the source of truth. The Figma variables mirror them by name:

- `Brand N / Primitives` and `Brand N / Semantic` in Figma map to `primitives/brand-N.json` and `semantic/brand-N.json`.
- Change tokens here first, then update the matching Figma variable. If you change Figma first, copy the change into the JSON in the same session.

## Continuous integration

Every push and pull request runs the token build (`.github/workflows/build-tokens.yml`). A broken token reference fails the run.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow, token rules and component rules.

## Licence

MIT. See [LICENSE](LICENSE).
