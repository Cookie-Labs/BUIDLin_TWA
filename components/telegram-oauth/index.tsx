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
    setLoggedIn(true);
  };

  return (
    <>
      {loggedIn ? (
        <div className="bg-[#54a9eb] flex h-auto w-auto items-center justify-center rounded-circle px-[2.1rem] py-[0.9rem]">
          <span className="text-[1.6rem] font-medium text-white text-center">
            {myTelegram?.first_name} Logged In!
          </span>
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
