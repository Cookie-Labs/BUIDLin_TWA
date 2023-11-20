'use client';

import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { myTelegramData, myFormData } from '@/states/formUserState';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';
import { getParticipant, createNewParticipant } from '@/services/dynamoDB';

export const TelegramOAuth = ({ eventId }: { eventId: string }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [myTelegram, setMyTelegram] = useRecoilState(myTelegramData);
  const setMyFormData = useSetRecoilState(myFormData);

  useEffect(() => {
    if (myTelegram?.id !== 0) {
      setLoggedIn(true);
    }
  }, [myTelegram]);

  const handleGetAndSetData = async (telegramId: number) => {
    try {
      let user = await getParticipant({
        tableName: eventId,
        userTelegramId: telegramId,
      });
      console.log(user);
      if (user === null) {
        const items = { userTelegramId: telegramId, lastAccess: Date.now() };
        await createNewParticipant({
          tableName: eventId,
          participantData: items,
        });
        setMyFormData(items);
        console.log('NEW USER!');
      } else {
        setMyFormData(user);
        console.log('EXISTING USER!');
      }
    } catch (error) {
      console.error('Error!', error);
    }
  };

  const handleTelegramResponse = async (response: TelegramUser) => {
    setMyTelegram(response);
    setLoggedIn(true);
    handleGetAndSetData(response.id);
  };

  const handleTestButton = async () => {
    const response = {
      id: 145136631,
      first_name: 'K.',
      username: 'jack',
      photo_url: '',
      auth_date: 252452542,
      hash: '',
    };
    setMyTelegram(response);
    setLoggedIn(true);
    handleGetAndSetData(response.id);
  };

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
      <button onClick={handleTestButton}>
        TEST BUTTON
      </button>
    </>
  );
};
