import { DefaultSeoProps } from 'next-seo';

export const seoConfig: DefaultSeoProps = {
  titleTemplate: '%s | Ivi Salas',
  defaultTitle: 'Ivi Salas Portfolio',
  description: 'Full-stack developer portfolio showcasing projects, skills, and experience.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Ivi Salas Portfolio',
  },
  twitter: {
    handle: '@yourhandle',
    site: '@yourhandle',
    cardType: 'summary_large_image',
  },
};
