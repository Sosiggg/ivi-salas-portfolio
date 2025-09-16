import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { seoConfig } from '../utils/seoConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { fontVariables } from '../styles/fonts';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <div className={`${fontVariables} font-sans min-h-screen`}>  {/* Font variables + base font */}
          <DefaultSeo {...seoConfig} />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
