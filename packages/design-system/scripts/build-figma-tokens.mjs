/**
 * Builds Figma-ready DTCG payloads from the repo token files.
 * The repo stays the source of truth; Figma is a generated mirror.
 *
 * Usage:  node scripts/build-figma-tokens.mjs 2      (brand 1 | 2 | 3)
 * Output: build/figma/brand-{n}.json
 *         Top-level keys become Figma collections: Primitives, Semantic, Component.
 *
 * Conversions Figma variables need (CSS output is unaffected):
 *   - fontFamily  → $extensions.figma.fontFamily (bare family name; Figma can't use a CSS stack)
 *   - cubicBezier → CSS keywords / cubic-bezier() converted to [x1, y1, x2, y2]
 *   - shadow, other ($type) → dropped; shadows live in Figma as effect styles
 *   - $description → stripped to keep the payload small
 *
 * Import with figma-console-mcp: figma_import_tokens({ format: 'dtcg', payload }).
 * Aliases resolve across collections by path, e.g. {color.action.background}.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const tokens = (p) => JSON.parse(fs.readFileSync(path.join(root, 'tokens', p), 'utf8'))

const brand = process.argv[2]
if (!['1', '2', '3'].includes(brand)) {
  console.error('Usage: node scripts/build-figma-tokens.mjs <1|2|3>')
  process.exit(1)
}

// Component token files per brand file. Core set is shared; brand packages add their own.
const CORE = ['button', 'input', 'select', 'radio', 'tabs', 'link', 'nav', 'typography', 'badge', 'card', 'accordion', 'chip']
const COMPONENTS = {
  1: [...CORE, 'list', 'case-study-metadata', 'figure', 'toc', 'callout', 'code-block', 'pagination'],
  2: CORE,
  3: CORE,
}

const EASING = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
}
const DROP_TYPES = new Set(['shadow', 'other'])

function toFigma(node) {
  const out = {}
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith('$')) continue
    if (val && typeof val === 'object' && '$value' in val) {
      if (DROP_TYPES.has(val.$type)) continue
      let value = val.$value
      if (val.$type === 'fontFamily' && val.$extensions?.figma?.fontFamily) {
        value = val.$extensions.figma.fontFamily
      }
      if (val.$type === 'cubicBezier' && typeof value === 'string' && !value.startsWith('{')) {
        const m = value.match(/cubic-bezier\(([^)]+)\)/)
        value = m ? m[1].split(',').map(Number) : EASING[value]
        if (!value) throw new Error(`Unknown easing "${val.$value}" at ${key}`)
      }
      out[key] = { $value: value, $type: val.$type }
    } else if (val && typeof val === 'object') {
      const child = toFigma(val)
      if (Object.keys(child).length) out[key] = child
    }
  }
  return out
}

function merge(a, b) {
  for (const [k, v] of Object.entries(b)) {
    if (a[k] && typeof a[k] === 'object' && typeof v === 'object' && !('$value' in v)) merge(a[k], v)
    else a[k] = v
  }
  return a
}

const payload = {
  Primitives: toFigma(merge(tokens('primitives/global.json'), tokens(`primitives/brand-${brand}.json`))),
  Semantic: toFigma(tokens(`semantic/brand-${brand}.json`)),
  Component: COMPONENTS[brand].reduce((acc, c) => merge(acc, toFigma(tokens(`component/${c}.json`))), {}),
}

const outDir = path.join(root, 'build', 'figma')
fs.mkdirSync(outDir, { recursive: true })
const outFile = path.join(outDir, `brand-${brand}.json`)
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2))

const count = (o) => Object.values(o).reduce((n, v) => n + ('$value' in v ? 1 : count(v)), 0)
console.log(`Brand ${brand} → ${path.relative(root, outFile)}`)
for (const [name, set] of Object.entries(payload)) console.log(`  ${name}: ${count(set)}`)
