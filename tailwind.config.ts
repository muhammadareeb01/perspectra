import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Arial', 'sans-serif'],
        serif: ['var(--font-source-serif)', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
};

export default config;
