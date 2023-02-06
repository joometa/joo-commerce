import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SessionProvider } from 'next-auth/react';
import Header from '@components/Header';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div className="w-full h-full">
          <Header />
          <div className="w-full max-w-7xl mx-auto mt-100pxr">
            <Component {...pageProps} />
          </div>
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}
