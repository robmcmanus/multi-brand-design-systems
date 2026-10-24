import type { Preview } from '@storybook/react'
import '../src/styles/index.css'

/**
 * Brand switcher toolbar.
 * Sets data-brand on the story root — matching the CSS selector
 * used in brand-1.css, brand-2.css, brand-3.css.
 */
const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: '1', title: 'Brand 1 — Portfolio' },
          { value: '2', title: 'Brand 2 — Movie finder' },
          { value: '3', title: 'Brand 3 — Internal tools' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Theme (Brand 3 only)',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark (default)' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    brand: '1',
    theme: 'dark',
  },

  decorators: [
    (Story, context) => {
      const brand = context.globals.brand ?? '1'
      document.documentElement.setAttribute('data-brand', brand)
      // Only Brand 3 has a light theme; dark is its default.
      if (brand === '3' && context.globals.theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
      return Story()
    },
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
