import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { seoConfig } from '../utils/seoConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { fontVariables } from '../styles/fonts';

const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then(mod => mod.ReactQueryDevtools),
  { ssr: false }
);

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <div className={`${fontVariables} font-sans min-h-screen`}>  {/* Font variables + base font */}
          <DefaultSeo {...seoConfig} />
          <Component {...pageProps} />
          {/* Only render devtools on client to avoid SSR crash */}
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
