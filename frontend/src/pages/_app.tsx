
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import SEO_CONFIG from '../utils/seoConfig';
import '../styles/globals.css';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<DefaultSeo {...SEO_CONFIG} />
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}
