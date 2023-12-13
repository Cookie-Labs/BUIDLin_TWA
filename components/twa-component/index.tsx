'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useBackButton, useViewport, useWebApp } from '@tma.js/sdk-react';

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const backButton = useBackButton();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    const onBackButtonClick = () => handleBackButtonClick();
    backButton.on('click', onBackButtonClick);
    return () => {
      backButton.off('click', onBackButtonClick);
    };
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      backButton.hide();
    } else {
      backButton.show();
    }
  }, [backButton, pathname]);

  return null;
}

export function ReadyAndExpand() {
  const webapp = useWebApp();
  const viewport = useViewport();

  useEffect(() => {
    webapp.ready();
    viewport.expand();
  }, []);

  return null;
}

export default function TwaComponents() {
  return (
    <>
      <ReadyAndExpand />
      <BackButton />
    </>
  );
}
