import { type Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#002B5B',
        'accent-green': '#00B17C',
        'accent-red': '#E04848',
        'gray-700': '#344054',
        'gray-500': '#667085',
        'gray-200': '#EAECF0',
        'yellow-400': '#FEC84B'
      },
      borderRadius: {
        DEFAULT: '12px'
      },
      boxShadow: {
        DEFAULT: '0 0 0 1px rgba(16,24,40,0.06), 0 4px 6px 0 rgba(16,24,40,0.04)'
      }
    }
  },
  plugins: []
};

export default config;
