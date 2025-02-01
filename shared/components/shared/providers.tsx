'use client';

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

import type { PropsWithChildren } from 'react';

interface ProvidersProps extends PropsWithChildren {}

export const Providers = (props: ProvidersProps) => {
  const { children } = props;

  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <NextTopLoader />
    </>
  );
};
