import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { seoConfig } from '../utils/seoConfig';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
