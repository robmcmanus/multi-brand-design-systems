/**
 * Style Dictionary 4 build pipeline — Folio Design System
 *
 * Outputs:
 *   build/css/global.css      — :root { spacing, radius, type scale, motion }
 *   build/css/brand-1.css     — [data-brand="1"] { semantic tokens }
 *   build/css/brand-2.css     — [data-brand="2"] { semantic tokens }
 *   build/css/brand-3.css     — [data-brand="3"] { semantic tokens }
 *   build/css/brand-3-light.css — [data-brand="3"][data-theme="light"] { colour + shadow overrides }
 *   build/css/components.css  — :root { component tokens using var() references }
 *
 * Brand switching: set data-brand="1|2|3" on <html> or <body>.
 * Light mode (Brand 3 only): also set data-theme="light". Brand 3 is dark by default.
 * All brand files are loaded simultaneously; cascade does the rest.
 */

import StyleDictionary from 'style-dictionary'

const PREFIX = 'ds'
const BUILD_PATH = 'build/css/'

// ─── Global primitives ───────────────────────────────────────────────────────

const globalSD = new StyleDictionary({
  source: ['tokens/primitives/global.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: PREFIX,
      buildPath: BUILD_PATH,
      files: [
        {
          destination: 'global.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
      ],
    },
  },
})

await globalSD.buildAllPlatforms()

// ─── Per-brand semantic tokens ────────────────────────────────────────────────

const BRANDS = ['1', '2', '3']

for (const brand of BRANDS) {
  const sd = new StyleDictionary({
    // Primitives loaded as reference only (include), semantic as source
    include: [
      'tokens/primitives/global.json',
      `tokens/primitives/brand-${brand}.json`,
    ],
    source: [`tokens/semantic/brand-${brand}.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: PREFIX,
        buildPath: BUILD_PATH,
        files: [
          {
            destination: `brand-${brand}.css`,
            format: 'css/variables',
            // Only output tokens from the semantic file (not the included primitives)
            filter: (token) =>
              token.filePath === `tokens/semantic/brand-${brand}.json`,
            options: {
              selector: `[data-brand="${brand}"]`,
              outputReferences: false, // Resolve all values — no var() chains in brand files
            },
          },
        ],
      },
    },
  })

  await sd.buildAllPlatforms()
}

// ─── Light mode overrides ──────────────────────────────────────────────────────
//
// Only Brand 3 has a second theme. Its base is dark; brand-3-light.json holds
// colour and shadow overrides. The base file is included so SD can resolve references; only the
// light file's own tokens are output. The attribute selector is more specific
// than [data-brand="3"], so light values win when data-theme="light" is set.

const LIGHT_BRANDS = ['3']

for (const brand of LIGHT_BRANDS) {
  const sd = new StyleDictionary({
    include: [
      'tokens/primitives/global.json',
      `tokens/primitives/brand-${brand}.json`,
      `tokens/semantic/brand-${brand}.json`,
    ],
    source: [`tokens/semantic/brand-${brand}-light.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: PREFIX,
        buildPath: BUILD_PATH,
        files: [
          {
            destination: `brand-${brand}-light.css`,
            format: 'css/variables',
            filter: (token) =>
              token.filePath === `tokens/semantic/brand-${brand}-light.json`,
            options: {
              selector: `[data-brand="${brand}"][data-theme="light"]`,
              outputReferences: false,
            },
          },
        ],
      },
    },
  })

  await sd.buildAllPlatforms()
}

// ─── Component tokens ─────────────────────────────────────────────────────────
//
// Components reference semantic tokens (e.g. {color.action.background}).
// We include brand-1 semantic tokens so SD can resolve references,
// but we set outputReferences: true so the output stays as var(--ds-...)
// chains — meaning it responds to whichever brand is active at runtime.

const componentSD = new StyleDictionary({
  include: [
    'tokens/primitives/global.json',
    'tokens/primitives/brand-1.json',
    'tokens/semantic/brand-1.json', // Reference brand — not output, just for resolution
  ],
  source: ['tokens/component/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: PREFIX,
      buildPath: BUILD_PATH,
      files: [
        {
          destination: 'components.css',
          format: 'css/variables',
          filter: (token) => token.filePath.startsWith('tokens/component/'),
          options: {
            selector: ':root',
            outputReferences: true, // Keep var() refs so components respond to brand
          },
        },
      ],
    },
  },
})

await componentSD.buildAllPlatforms()

console.log('\n✓ Token build complete → build/css/')
console.log('  global.css, brand-1.css, brand-2.css, brand-3.css, brand-3-light.css, components.css\n')
