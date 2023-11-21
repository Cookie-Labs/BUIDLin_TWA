'use client';

import { useEffect, useState } from 'react';
import { TelegramOAuth } from '../telegram-oauth';
import { ApplyForm } from '@/mock/eventInterface';
import { applyForEvent, myFormData, myAPPStep } from '@/states/formUserState';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import ScrollToTop from './scrollToTop';

const MainApplyForm = ({ form }: { form: ApplyForm }) => {
  const formData = useRecoilValue(myFormData);
  const setTab = useSetRecoilState(myAPPStep);
  const applyForEventId = useRecoilValue(applyForEvent);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (formData?.userTelegramId === 0) {
      setAllChecked(false);
    } else {
      setAllChecked(true);
    }
  }, [formData]);

  const handleClickLink = (url: string) => {
    window.open(url, '_blank');
  };

  const handleClickStartButton = async () => {
    if (allChecked) {
      setTab((prevTab) => prevTab + 1);
      setAllChecked(false);
    } else {
      null;
    }
  }

  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-between bg-primary p-[1.6rem] pt-[3.2rem]">
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
          <TelegramOAuth eventId={applyForEventId} allChecked={allChecked} setAllChecked={setAllChecked} />
        </div>
        <span className="whitespace-pre-line text-[1.4rem] font-bold leading-8 text-gray08">
          ※ You can save the submission form for the corresponding page each
          time you press the "Next" button at the bottom. Start by pressing the
          Telegram login button right above.
        </span>
      </div>
      <button
        disabled={!allChecked}
        className={`flex h-[6rem] w-full items-center justify-center rounded-[1.2rem] ${
          allChecked
            ? 'cursor-pointer bg-blue07 duration-200 hover:scale-105 active:scale-100'
            : 'bg-gray14'
        }`}
        onClick={handleClickStartButton}
      >
        <span
          className={`text-center font-[semiBold] text-[1.8rem] ${
            allChecked ? 'text-white' : 'text-gray10'
          }`}
        >
          Start
        </span>
        <ScrollToTop />
      </button>
    </div>
  );
};

export default MainApplyForm;
