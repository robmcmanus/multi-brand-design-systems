# Button (Brand 1)

> LLM documentation — use this to select and configure the Button component when generating UI.

**Figma:** [Button / Brand 1](https://www.figma.com/design/oZfES9yyWVNdmTVTIPcBS5/Design-System?node-id=2-741)

---

## Import

```tsx
import { Button } from '@folio/design-system'
```

---

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | `'primary'` | Visual weight and color. Required — always specify explicitly. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls height, padding, and font size. |
| `loading` | `boolean` | `false` | Disables interaction and signals async work. Prefer over `disabled` for async operations. |
| `iconLeft` | `ReactNode` | — | Icon before label. Use 16px icons for `sm`/`md`, 20px for `lg`. |
| `iconRight` | `ReactNode` | — | Icon after label. Same sizing rules as `iconLeft`. |
| `disabled` | `boolean` | `false` | Disables interaction. Use only when the action is structurally unavailable, not for loading states. |
| `children` | `ReactNode` | — | Button label. Plain text in sentence case. |

---

## Variants

### `primary`
Highest-emphasis action. Filled background (`color/action/background` — amber/gold), dark label (`color/action/foreground`).

**Use when:** This is the main call-to-action in a view — submitting a form, confirming a dialog, initiating the key workflow.

**Rules:**
- Maximum **one** `primary` button per view or section.
- Don't use for navigation. Use a link or anchor instead.

```tsx
<Button variant="primary">Save changes</Button>
<Button variant="primary" size="lg">Get started</Button>
```

---

### `secondary`
Supporting action. Subtle tinted background (`color/action/background-subtle`, 10% opacity), border and label both use `color/action/border`.

**Use when:** Pairing alongside a `primary` button — Cancel next to Save, or a secondary operation in a toolbar.

**Rules:**
- Can appear multiple times in a view.
- Don't use `secondary` as the only button in an isolated action area — it visually implies a `primary` counterpart exists.

```tsx
<Button variant="secondary">Cancel</Button>

{/* typical pairing */}
<div style={{ display: 'flex', gap: 8 }}>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save changes</Button>
</div>
```

---

### `ghost`
Lowest visual weight. No background, no border. Label uses `color/text/primary` (light on dark surfaces).

**Use when:** Tertiary or low-priority actions in dense layouts — card headers, sidebars, inline table rows, toolbar icon buttons.

**Rules:**
- Don't use `ghost` as the only interactive element in a standalone action area. It lacks sufficient affordance without surrounding context.
- Works well when the button sits adjacent to visible content that provides context.

```tsx
<Button variant="ghost">View details</Button>
<Button variant="ghost" iconLeft={<EditIcon />}>Edit</Button>
```

---

### `destructive`
Filled with the error/danger color (`color/feedback/error/border` — red #EF4444). Reserved for irreversible actions.

**Use when:** Permanently deleting content, removing a user, or any action that cannot be undone.

**Rules:**
- **Always** pair with a confirmation step (modal, popover, or inline confirm) — never trigger a destructive action on a single click.
- Don't use for reversible negative actions like "Archive", "Mute", or "Unsubscribe".
- Don't use as a general "decline" or "cancel" button.

```tsx
{/* inside a confirmation dialog */}
<Button variant="destructive" onClick={handleConfirmedDelete}>
  Delete project
</Button>
```

---

## Sizes

| Size | Height | Padding X | Font size | Token |
|------|--------|-----------|-----------|-------|
| `sm` | 28px | 12px | 12px | `button/padding/x-sm` |
| `md` | 36px | 16px | 14px | `button/padding/x-md` |
| `lg` | 44px | 20px | 16px | `button/padding/x-lg` |

All sizes share: corner radius `button/border-radius` (2px), Inter Semi Bold (600), centered label.

**Size selection guidance:**
- `md` — default for most contexts.
- `sm` — compact/dense layouts: data tables, sidebars, inline row actions.
- `lg` — hero CTAs, prominent form actions, onboarding flows.

---

## Design tokens (Brand 1)

| Token | Collection | Used by |
|-------|------------|---------|
| `color/action/background` | Semantic / Brand 1 | `primary` fill |
| `color/action/background-subtle` | Semantic / Brand 1 | `secondary` fill (10% opacity) |
| `color/action/border` | Semantic / Brand 1 | `primary` & `secondary` border; `secondary` label |
| `color/action/foreground` | Semantic / Brand 1 | `primary` label |
| `color/text/primary` | Semantic / Brand 1 | `ghost` label |
| `color/text/inverse` | Semantic / Brand 1 | `destructive` label |
| `color/feedback/error/border` | Semantic / Brand 1 | `destructive` fill & border |
| `button/border-radius` | Component / Brand 1 | All variants — corner radius (2px) |
| `button/padding/x-sm` | Component / Brand 1 | `sm` horizontal padding (12px) |
| `button/padding/x-md` | Component / Brand 1 | `md` horizontal padding (16px) |
| `button/padding/x-lg` | Component / Brand 1 | `lg` horizontal padding (20px) |

---

## Composition patterns

**Icon + label:**
```tsx
import { PlusIcon } from '@heroicons/react/16/solid'

<Button variant="primary" iconLeft={<PlusIcon />}>Add item</Button>
<Button variant="secondary" iconRight={<ChevronDownIcon />}>Options</Button>
```

**Icon-only (must include aria-label):**
```tsx
<Button variant="ghost" iconLeft={<CloseIcon />} aria-label="Close panel" />
```

**Loading state:**
```tsx
<Button variant="primary" loading={isSaving}>
  Save changes
</Button>
{/* label stays visible; aria-busy is set automatically */}
```

**Destructive with confirmation:**
```tsx
// 1. Trigger a confirm dialog on first click
// 2. Only on confirm, render:
<Button variant="destructive" onClick={onConfirmedDelete}>
  Delete project
</Button>
```

**Full-width in a form:**
```tsx
<Button variant="primary" size="lg" style={{ width: '100%' }}>
  Create account
</Button>
```

---

## Accessibility

- `disabled` and `loading` both set the native `disabled` attribute. `loading` additionally sets `aria-busy="true"`.
- Icon-only buttons **must** have `aria-label`. Without it screen readers announce nothing meaningful.
- Don't use `<Button>` for navigation. Use `<a>` or your router's `<Link>` component.
- Avoid nesting interactive elements inside `children`.

---

## Don'ts

- Don't place two `primary` buttons in the same section or dialog.
- Don't use `destructive` for reversible actions.
- Don't put JSX elements (divs, spans, other buttons) inside `children` — plain text only.
- Don't override `background`, `border-color`, or `color` directly via `className` or inline styles. Route all visual changes through `variant`.
- Don't use `ghost` as the sole action in a standalone area without surrounding context.
- Don't use `disabled` for loading states — use `loading` instead so `aria-busy` is communicated to assistive tech.
