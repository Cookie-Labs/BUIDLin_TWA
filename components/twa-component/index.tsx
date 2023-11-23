'use client';

import { useEffect } from 'react';
import { useBackButton, usePostEvent } from '@tma.js/sdk-react';

export function BackButton() {
  const backButton = useBackButton();

  const handleBackButtonClick = () => {
    window.history.back();
  };

  useEffect(() => {
    const onBackButtonClick = () => handleBackButtonClick();
    backButton.on('click', onBackButtonClick);
    return () => {
      backButton.off('click', onBackButtonClick);
    };
  }, []);

  useEffect(() => {
    if (window.history.length > 1) {
      backButton.hide();
      return;
    }
    backButton.show();
  }, [backButton]);

  return null;
}

export function ReadyAndExpand() {
  const postEvent = usePostEvent();

  useEffect(() => {
    postEvent('web_app_ready');
    postEvent('web_app_expand');
  }, [])

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
