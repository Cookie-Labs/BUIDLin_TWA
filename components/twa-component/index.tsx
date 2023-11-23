'use client';

import { useEffect, useMemo, useState } from 'react';
import { useBackButton, useInitData, useMainButton, usePostEvent } from '@tma.js/sdk-react';
import { initUserData, User } from '@/states/formUserState';
import { useSetRecoilState } from 'recoil';

export function MainButtonTest() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export function InitData() {
  const initData = useInitData();
  const setInitUserData = useSetRecoilState(initUserData);

  useEffect(() => {
    if (initData && initData.user) {
      setInitUserData(initData.user);
    }
  }, [initData]);

  // const initDataJson = useMemo(() => {
  //   if (!initData) {
  //     return 'Init data is empty.';
  //   }
  //   const {
  //     authDate,
  //     chat,
  //     hash,
  //     canSendAfter,
  //     queryId,
  //     receiver,
  //     user,
  //     startParam,
  //   } = initData;

  //   return JSON.stringify(
  //     {
  //       authDate,
  //       chat,
  //       hash,
  //       canSendAfter,
  //       queryId,
  //       receiver,
  //       user,
  //       startParam,
  //     },
  //     null,
  //     ' ',
  //   );
  // }, [initData]);

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
      {/* <MainButtonTest /> */}
      <InitData />
    </>
  );
}
