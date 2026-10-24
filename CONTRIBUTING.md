# Contributing

This repository is the source of truth for the tokens and components. Figma mirrors it. Change the repo first, then update Figma.

## Workflow

1. Create a branch from `main` (`token/…`, `component/…` or `fix/…`).
2. Make the change and run the token build:
   ```bash
   npm install --legacy-peer-deps
   npm run tokens --workspace=packages/design-system
   ```
3. Open a pull request using the template. The `build-tokens` check must pass before merge.
4. After merge, update the matching Figma variables or components and note it in the pull request.

## Token rules

- Three tiers: primitives, semantic, component. Components reference semantic tokens only. Semantic tokens reference primitives.
- Use role-based radius tokens (`border-radius.control`, `border-radius.container`). Do not add per-component radius tokens.
- Renaming or removing a token is a breaking change. Do not remove unused tokens without agreeing it first.
- Token names in code match variable names in Figma.
- Brands 1 and 2 have one theme each. Brand 3 is dark by default, with light overrides in `brand-3-light.json` (colour and shadow only).

## Component rules

- Bind to component tokens. No raw values inside components.
- Prop names and values match the Figma variant properties.
- Cover default, hover, focus, active and disabled states, plus error where it applies.
- Keyboard operation, focus visibility and contrast (WCAG 2.2 AA) are part of done.

## Commit messages

Short, imperative, and specific: `Brand 3: dark default with light overrides`.

## Reporting issues

Use the issue templates for bugs and for new component requests.
