'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { myTelegramData } from '@/states/formUserState';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';

export const TelegramOAuth = ({ eventId }: { eventId: string }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [myTelegram, setMyTelegram] = useRecoilState(myTelegramData);
  const telegramRedirectUrl =
    typeof window !== 'undefined'
      ? window?.origin.includes('localhost')
        ? `http://localhost:3000/event-apply/${eventId}`
        : `https://buidlin.vercel.app/event-apply${eventId}`
      : undefined;

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
        <div className="flex h-auto w-full items-center justify-center gap-[1.5rem]">
          <Image
            src={myTelegram?.photo_url}
            alt="telegram image url"
            priority
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            width={1000}
            height={1000}
          />
          <div className="flex h-auto w-auto items-center justify-center rounded-[2rem] bg-[#54a9eb] px-[2.1rem] py-[0.9rem]">
            <span className="text-center text-[1.6rem] font-medium text-white">
              {myTelegram?.first_name} Logged In!
            </span>
          </div>
        </div>
      ) : (
        <TelegramLoginButton
          dataAuthUrl={telegramRedirectUrl}
          dataOnauth={handleTelegramResponse}
          botName="BUIDLin_Testing_Bot"
          className="flex items-center justify-center"
        />
      )}
    </>
  );
};
