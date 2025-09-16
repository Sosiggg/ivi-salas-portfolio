import React from 'react';
import { NextPageContext } from 'next';

interface ErrorProps {
  statusCode?: number;
}

function getMessage(statusCode?: number) {
  if (!statusCode) return 'An unexpected error occurred.';
  if (statusCode === 404) return 'Page not found.';
  if (statusCode === 500) return 'Internal server error.';
  return `An error ${statusCode} occurred.`;
}

const ErrorPage = ({ statusCode }: ErrorProps) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-8">
    <h1 className="font-heading text-5xl font-bold mb-4">{statusCode || 'Error'}</h1>
    <p className="text-lg mb-8">{getMessage(statusCode)}</p>
    <a href="/" className="px-6 py-2 rounded bg-brand-500 text-white font-semibold shadow hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">Go Home</a>
  </div>
);

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default ErrorPage;
