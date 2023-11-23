'use client';

import { useMemo } from 'react';
import { useInitData } from '@tma.js/sdk-react';

export default function InitData() {
  const initData = useInitData();

  const initDataJson = useMemo(() => {
    if (!initData) {
      return 'Init data is empty.';
    }
    const {
      authDate,
      chat,
      hash,
      canSendAfter,
      queryId,
      receiver,
      user,
      startParam,
    } = initData;

    return JSON.stringify(
      {
        authDate,
        chat,
        hash,
        canSendAfter,
        queryId,
        receiver,
        user,
        startParam,
      },
      null,
      ' ',
    );
  }, [initData]);

  return initDataJson;
}
