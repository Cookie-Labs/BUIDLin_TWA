'use client';

import { useEffect, useState } from 'react';
import { useBackButton, useMainButton } from '@tma.js/sdk-react';

export default function MainButton() {
  const mainButton = useMainButton();
  const backButton = useBackButton();

  const [count, setCount] = useState(0);

  useEffect(() => {
    const onMainButtonClick = () => setCount((prevCount) => prevCount + 1);
    const onBackButtonClick = () => setCount((prevCount) => prevCount - 1);

    mainButton.enable().show();
    mainButton.on('click', onMainButtonClick);
    backButton.on('click', onBackButtonClick);

    return () => {
      mainButton.off('click', onMainButtonClick);
      mainButton.hide();
      backButton.off('click', onBackButtonClick);
    };
  }, []);

  useEffect(() => {
    mainButton.setText(`Count is ${count}`);
  }, [mainButton, count]);

  useEffect(() => {
    if (count === 0) {
      backButton.hide();
      return;
    }
    backButton.show();
  }, [backButton, count]);

  return null;
}