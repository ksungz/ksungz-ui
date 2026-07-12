import type { Preview } from '@storybook/react-vite'
import '../src/styles/tokens.css'
import '../src/styles/global.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    options: {
      storySort: {
        order: ['Overview', 'Foundations', 'Components', 'Patterns', 'Case Studies'],
      },
    },
  },
}

export default preview
