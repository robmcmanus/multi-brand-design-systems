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
          { value: '1', title: 'Brand 1 — Dev Tool' },
          { value: '2', title: 'Brand 2 — Wellness' },
          { value: '3', title: 'Brand 3 — Enterprise' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    brand: '1',
  },

  decorators: [
    (Story, context) => {
      const brand = context.globals.brand ?? '1'
      document.documentElement.setAttribute('data-brand', brand)
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
