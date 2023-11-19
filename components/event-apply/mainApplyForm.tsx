'use client';

import { useEffect } from 'react';
import { TelegramOAuth } from '../telegram-oauth';
import { ApplyForm } from '@/mock/eventInterface';
import { useRecoilValue } from 'recoil';
import { myTelegramData } from '@/states/formUserState';

const MainApplyForm = ({
  form,
  setAllChecked,
}: {
  form: ApplyForm;
  setAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const myTelegram = useRecoilValue(myTelegramData);
  const myTelegramJSON = myTelegram !== null ? JSON.parse(myTelegram) : null;

  console.log(myTelegramJSON);

  useEffect(() => {
    if (myTelegramJSON === null) {
      setAllChecked(false);
    } else {
      setAllChecked(true);
    }
  }, [myTelegramJSON]);

  const handleClickLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="mb-[3.2rem] flex h-auto w-full flex-col items-center justify-center gap-[3.2rem]">
      <span className="text-center text-[2.4rem] font-semiBold text-white">
        {form.title}
      </span>
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
        {form.introduction && (
          <>
            <span className="text-[2rem] font-medium text-white ">
              Introduction
            </span>
            <span className="whitespace-pre-line text-[1.4rem] font-regular leading-8 text-gray08">
              {form.introduction}
            </span>
          </>
        )}
        {form.link?.map((l) => {
          return (
            <button
              key={l.url}
              className="flex h-auto w-auto cursor-pointer items-center overflow-hidden"
              onClick={() => {
                handleClickLink(l.url);
              }}
            >
              <span className="text-[1.3rem] font-semiBold text-[#FF803E] underline">
                {l.name ? l.name : l.url}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex h-auto w-auto items-center justify-center">
        <TelegramOAuth />
      </div>
      <span className="whitespace-pre-line text-[1.4rem] font-bold leading-8 text-gray08">
        ※ You can save the submission form for the corresponding page each time
        you press the "Next" button at the bottom. Start by pressing the
        Telegram login button right above.
      </span>
    </div>
  );
};

export default MainApplyForm;
