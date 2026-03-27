import type { Preview, Decorator } from '@storybook/nextjs-vite';
import '../app/globals.css';

// Applies data-theme="dark" / light to <html> when toolbar theme is toggled
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';
  const root = document.documentElement;
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
  } else {
    root.removeAttribute('data-theme');
    root.classList.remove('dark');
  }
  return Story();
};

const preview: Preview = {
  decorators: [withTheme],

  globalTypes: {
    theme: {
      description: 'Design system theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark'  },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#ffffff' },
        { name: 'page',    value: '#fafafa' },
        { name: 'dark',    value: '#171717' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
