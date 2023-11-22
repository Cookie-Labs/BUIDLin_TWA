'use client';

import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { myFormData } from '@/states/formUserState';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';
import { getParticipant, createNewParticipant } from '@/services/dynamoDB';

export const TelegramOAuth = ({
  eventId,
  allChecked,
  setAllChecked,
}: {
  eventId: string;
  allChecked: boolean;
  setAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [telegramResponse, setTelegramResponse] = useState<TelegramUser>({
    id: 0,
    first_name: '',
    username: '',
    photo_url: '',
    auth_date: 0,
    hash: '',
  });
  const setFormData = useSetRecoilState(myFormData);
  const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : '';
  const params = new URLSearchParams(hash);
  const initData = new URLSearchParams(params.get('tgWebAppData') ?? '');
  // if (Object.keys(initData).length !== 0) TWA
  // else WEB

  const handleTelegramResponse = async (response: TelegramUser) => {
    try {
      setTelegramResponse(response);

      let user = await getParticipant({
        tableName: eventId,
        userTelegramId: response.id,
      });

      if (user?.Item === undefined) {
        await createNewParticipant({
          tableName: eventId,
          participantData: {
            userTelegramId: response.id,
            userIsSubmitted: false,
          },
        });
        setIsSubmitted(false);
        setAllChecked(true);
        setFormData({
          userTelegramId: response.id,
          userIsSubmitted: false,
        });
      } else {
        if (user?.Item.userIsSubmitted) {
          setIsSubmitted(true);
          setAllChecked(false);
          setFormData({
            userTelegramId: 0,
            userIsSubmitted: false,
          });
        } else {
          setIsSubmitted(false);
          setAllChecked(true);
          setFormData(user?.Item);
        }
      }
    } catch (error) {
      console.error('Error!', error);
    }
  };

  return (
    <>
      {isSubmitted ? (
        <div className="flex h-auto w-full items-center justify-center">
          <span className="text-center text-[2rem] font-semiBold text-white">
            🎉 Already submitted the form. 🎉
          </span>
        </div>
      ) : allChecked ? (
        <div className="flex h-auto w-auto items-center justify-center rounded-[2rem] bg-[#54a9eb] px-[2.1rem] py-[0.9rem]">
          <span className="text-center text-[1.6rem] font-medium text-white">
            {telegramResponse.first_name} Logged In!
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
