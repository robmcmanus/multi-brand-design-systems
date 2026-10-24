# Button (Brand 3)

> LLM documentation — use this to select and configure the Button component when generating UI for Brand 3.

**Figma:** [Button / Brand 3](https://www.figma.com/design/oZfES9yyWVNdmTVTIPcBS5/Design-System?node-id=2-793)

**Visual character:** Square corners (border-radius: 0), IBM Plex Sans SemiBold, standard horizontal padding. Blue action color palette.

---

## Import

```tsx
import { Button } from '@folio/design-system'
```

---

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | `'primary'` | Visual weight and color. Always specify explicitly. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls height, padding, and font size. |
| `loading` | `boolean` | `false` | Disables interaction and signals async work. Prefer over `disabled` for async operations. |
| `iconLeft` | `ReactNode` | — | Icon before label. Use 16px icons for `sm`/`md`, 20px for `lg`. |
| `iconRight` | `ReactNode` | — | Icon after label. Same sizing rules as `iconLeft`. |
| `disabled` | `boolean` | `false` | Use only when the action is structurally unavailable, not for loading states. |
| `children` | `ReactNode` | — | Button label. Plain text in sentence case. |

---

## Variants

### `primary`
Filled blue background (`color/action/background`), white label (`color/action/foreground`).

**Use when:** The main call-to-action in a view — form submit, dialog confirm, key workflow start. Max one per section.

**Rules:**
- Maximum **one** `primary` button per view or section.
- Don't use for navigation — use a link instead.

```tsx
<Button variant="primary">Save changes</Button>
<Button variant="primary" size="lg">Get started</Button>
```

---

### `secondary`
Light blue background (`color/action/background-subtle`), blue border and label (`color/action/border`).

**Use when:** Supporting actions alongside a `primary` — Cancel next to Save, secondary toolbar operations.

**Rules:**
- Can appear multiple times in a view.
- Don't use as the sole button in an area — implies a `primary` counterpart.

```tsx
<Button variant="secondary">Cancel</Button>

<div style={{ display: 'flex', gap: 8 }}>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save changes</Button>
</div>
```

---

### `ghost`
No background, no border. Dark label (`color/text/primary`).

**Use when:** Tertiary or low-priority actions in dense layouts — card headers, sidebars, inline table rows.

**Rules:**
- Don't use as the only interactive element in a standalone action area — lacks affordance without surrounding context.

```tsx
<Button variant="ghost">View details</Button>
<Button variant="ghost" iconLeft={<EditIcon />}>Edit</Button>
```

---

### `destructive`
Filled orange-red background and border (`color/feedback/error/border`), white label (`color/text/inverse`). Reserved for irreversible actions.

**Use when:** Permanently deleting content, removing a user, or any action that cannot be undone.

**Rules:**
- **Always** pair with a confirmation step — never fire on first click.
- Don't use for reversible actions (archive, mute) or as a cancel button.

```tsx
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

All sizes share: corner radius `button/border-radius` (0 — square corners), IBM Plex Sans SemiBold (600).

**Size selection guidance:**
- `md` — default for most contexts.
- `sm` — compact/dense layouts: data tables, sidebars, inline row actions.
- `lg` — hero CTAs, prominent form actions, onboarding flows.

---

## Design tokens (Brand 3)

| Token | Collection | Used by |
|-------|------------|---------|
| `color/action/background` | Semantic / Brand 3 | `primary` fill |
| `color/action/background-subtle` | Semantic / Brand 3 | `secondary` fill (light blue) |
| `color/action/border` | Semantic / Brand 3 | `primary` & `secondary` border; `secondary` label |
| `color/action/foreground` | Semantic / Brand 3 | `primary` label |
| `color/text/primary` | Semantic / Brand 3 | `ghost` label |
| `color/text/inverse` | Semantic / Brand 3 | `destructive` label |
| `color/feedback/error/border` | Semantic / Brand 3 | `destructive` fill & border |
| `button/border-radius` | Component / Brand 3 | All variants — square corners (0) |
| `button/padding/x-sm` | Component / Brand 3 | `sm` horizontal padding (12px) |
| `button/padding/x-md` | Component / Brand 3 | `md` horizontal padding (16px) |
| `button/padding/x-lg` | Component / Brand 3 | `lg` horizontal padding (20px) |

---

## Composition patterns

**With icons:**
```tsx
<Button variant="primary" iconLeft={<PlusIcon />}>Add item</Button>
<Button variant="secondary" iconRight={<ChevronDownIcon />}>Options</Button>
```

**Icon-only (must include aria-label):**
```tsx
<Button variant="ghost" iconLeft={<CloseIcon />} aria-label="Close panel" />
```

**Loading state:**
```tsx
<Button variant="primary" loading={isSaving}>Save changes</Button>
```

---

## Accessibility

- `disabled` and `loading` both set the native `disabled` attribute. `loading` additionally sets `aria-busy="true"`.
- Icon-only buttons **must** have `aria-label`.
- Don't use `<Button>` for navigation — use `<a>` or your router's `<Link>`.

---

## Don'ts

- Don't place two `primary` buttons in the same section.
- Don't use `destructive` for reversible actions.
- Don't put JSX elements inside `children` — plain text only.
- Don't override colors directly — always route through `variant`.
- Don't use `disabled` for loading states — use `loading` instead.
