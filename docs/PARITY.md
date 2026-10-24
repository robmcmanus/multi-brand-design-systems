# Figma and code parity report

Checked 2026-10-24 against release 1.0.0. The repository is the source of truth; Figma mirrors it.

## 1. Tokens: pass

Every Figma variable collection was compared with its token files by variable name and by fully resolved value (aliases followed to their final colour, number or string; units such as `px` and `em` normalised).

| Figma collection | Repo source | Variables | Result |
|---|---|---|---|
| Brand 1 / Primitives | `primitives/brand-1.json` | 40 | Match |
| Brand 1 / Semantic | `semantic/brand-1.json` | 100 | Match |
| Brand 2 / Primitives | `primitives/brand-2.json` | 48 | Match |
| Brand 2 / Semantic | `semantic/brand-2.json` | 107 | Match |
| Brand 3 / Primitives | `primitives/brand-3.json` | 48 | Match |
| Brand 3 / Semantic (dark, default) | `semantic/brand-3.json` | 100 | Match |
| Brand 3 Light / Semantic | `semantic/brand-3-light.json` | 50 | Match |

Known representation differences that are not drift: Figma stores spacing, radius and type sizes as unitless numbers where the repo uses `px`; letter spacing is a number in Figma and `em` in the repo; duration and easing tokens are literal strings in Figma and references in the repo.

Not covered by this check: the legacy collections `Colors`, `Typography`, `Border Radius` and `Spacing`, and the `_Scale` collections. They are kept on purpose and are not part of the brand architecture.

## 2. Components: partial

Figma variant properties compared with the React props. Interaction states in Figma (hover, focus, pressed, visited) are CSS pseudo-classes in code, so they are not props.

| Component | Figma | Code | Status |
|---|---|---|---|
| Button | Variant, Size, State | `variant`, `size`, pseudo-class states | Aligned. Code adds `loading`, `iconLeft` and `iconRight`, which Figma does not show. |
| Input Field | Label, Helper Text, Leading Icon, Trailing Icon, State (incl. Read-only, Loading, Skeleton) | `label`, `helperText`, `errorText`, `iconLeft`, native `readOnly` and `disabled` | Gaps: no trailing icon, loading or skeleton in code. |
| Select | Label, Helper Text, Leading Icon, State (incl. Open, Selected, Loading, Skeleton) | `label`, `helperText`, `errorText`, `options`, `value`, `disabled` | Gaps: no leading icon, read-only, loading or skeleton in code. |
| Tabs | Tab: Label, State | `items`, `value`, disabled items | Aligned. |
| Link | Type (Inline, Standalone, External), State | `variant` (inline, standalone) plus `external` boolean | Naming differs: External is a Type in Figma and a flag in code. |
| Tag | Type (Static, Interactive), State, Size | `size`, `selected`, interactive when `onClick` is set | Aligned. |
| Accordion | State, Panel | `items`, `multiple`, `defaultOpen`, disabled items | Aligned. |
| Site Header and Nav Item | Viewport, State (Current) | `items` with `current`, responsive menu | Aligned. |
| Lists, Prose, Case study metadata, Figure, Table of contents, Callout, Pull quote, Code block, Pagination | Built | Not built | Figma only. Tokens exist for all of them. |

Fixed during this check: the `List Links` Figma component had two properties both named `Description`; the text property is now `Description text`.

## 3. Not set up

- Code Connect mappings (needs a Figma plan with Dev Mode and Code Connect).
- An automated parity check. This report was produced by hand and should be repeated before each tagged release.
