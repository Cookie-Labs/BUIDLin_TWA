'use client';

import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { myTelegramData } from '@/states/formUserState';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';
import { getParticipant, createNewParticipant } from '@/services/dynamoDB';

export const TelegramOAuth = ({eventId} : {eventId: string}) => {
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
  const myData = getParticipant({
    tableName: eventId,
    // userTelegramId: String(myTelegram?.id),
    userTelegramId: "1",
  });
  const myData2 = getParticipant({
    tableName: eventId,
    // userTelegramId: String(myTelegram?.id),
    userTelegramId: '2',
  });
  console.log(myData);
  console.log(myData2);

  return (
    <>
      {loggedIn ? (
        <div className="flex h-auto w-auto items-center justify-center rounded-[2rem] bg-[#54a9eb] px-[2.1rem] py-[0.9rem]">
          <span className="text-center text-[1.6rem] font-medium text-white">
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
