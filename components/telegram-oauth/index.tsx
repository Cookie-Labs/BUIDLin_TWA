'use client';

import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { myFormData } from '@/states/formUserState';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';
import { getParticipant, createNewParticipant } from '@/services/dynamoDB';

import { FaTelegramPlane } from 'react-icons/fa';

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

  console.log(params);
  console.log(initData);

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
      ) : Object.keys(initData).length === 0 ? (
        <TelegramLoginButton
          dataOnauth={handleTelegramResponse}
          botName="buidlin_bot"
          className="flex items-center justify-center"
        />
      ) : (
        <button className="flex h-auto w-auto items-center justify-center rounded-[2rem] bg-[#54a9eb] px-[2.1rem] py-[0.9rem] gap-[1.3rem]"
          onClick={() => {
            handleTelegramResponse({
              id: initData.get('id') !== null ? Number(initData.get('id')) : 0,
              first_name: initData.get('first_name') ?? '',
              username: initData.get('username') ?? '',
              photo_url: '',
              auth_date: 0,
              hash: '',
            });
          }}
        >
          <FaTelegramPlane className="h-[1.6rem] w-[1.6rem] text-white"/>
          <span className="text-center text-[1.6rem] font-medium text-white">
            Sign In
          </span>
        </button>
      )}
    </>
  );
};
