import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google';

export const headingFont = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

export const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

// Convenience export for composing classNames.
export const fontVariables = `${headingFont.variable} ${sansFont.variable} ${monoFont.variable}`;
