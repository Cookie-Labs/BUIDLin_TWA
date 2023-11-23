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
    if (
      document.referrer &&
      document.referrer.indexOf('https://t.me/buidlin_bot/app') != -1
    ) {
      backButton.show();
    } else {
      location.href = 'https://t.me/buidlin_bot/app';
      backButton.hide();
    }
  }, [backButton, document.referrer]);

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
