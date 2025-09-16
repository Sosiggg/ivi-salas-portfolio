import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        heading: ['var(--font-heading)', 'var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        brand: {
          50: '#f5faff',
          100: '#e0f2ff',
          200: '#b9e4ff',
          300: '#7cd0ff',
          400: '#38b6ff',
          500: '#0894e7',
          600: '#0075c4',
          700: '#005a99',
          800: '#004a7d',
          900: '#00365a',
        },
      },
    },
  },
  plugins: [],
};
export default config;
