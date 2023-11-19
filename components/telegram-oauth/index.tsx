'use client';

import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { myTelegramData } from '@/states/formUserState';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';

export const TelegramOAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [myTelegram, setMyTelegram] = useRecoilState(myTelegramData);

  useEffect(() => {
    if (myTelegram?.id !== 0) {
      setLoggedIn(true);
    }
  }, [myTelegram]);

  const handleTelegramResponse = async (response: TelegramUser) => {
    setMyTelegram(response);
  };

  return (
    <>
      {loggedIn ? (
        <div className="flex items-center justify-center">
          {myTelegram?.id}
          {myTelegram?.first_name}
        </div>
      ) : (
        <TelegramLoginButton
          dataOnauth={handleTelegramResponse}
          botName="BUIDLin_Testing_Bot"
          className="flex items-center justify-center"
        />
      )}
    </>
  );
};
