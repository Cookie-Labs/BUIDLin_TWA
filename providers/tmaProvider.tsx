'use client';

import { type PropsWithChildren } from 'react';
import { SDKProvider } from '@tma.js/sdk-react';

export function TmaProvider({ children }: PropsWithChildren) {
  return (
    <SDKProvider initOptions={{ debug: true, cssVars: true }}>
      {children}
    </SDKProvider>
  );
}
