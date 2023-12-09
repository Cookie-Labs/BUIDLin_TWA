'use client';

import { useState, useEffect } from 'react';
import { ApplyForm } from '../event-interface';
import EachQuestionForm from './eachQuestionForm';

import { myAPPStep, myFormData, applyForEvent } from '@/states/formUserState';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import ScrollToTop from './scrollToTop';

import { submitParticipant, addUserParticipated } from '@/services/dynamoDB';

const ConsentApplyForm = ({
  section,
  form,
}: {
  section: number;
  form: ApplyForm;
}) => {
  const eventId = useRecoilValue(applyForEvent);
  const setTab = useSetRecoilState(myAPPStep);
  const [formData, setFormData] = useRecoilState(myFormData);
  const [allChecked, setAllChecked] = useState(false);
  const [fullAgree, setFullAgree] = useState(false);
  const [eachAgree, setEachAgree] = useState<boolean[]>(
    Array(form.questions?.length).fill(false),
  );
  const eachRequired = form.questions?.map((question) => question.required);

  console.log(eachAgree);

  const handleClickLink = (url: string) => {
    window.open(url, '_blank');
  };

  const handleFullAgreementClick = () => {
    setFullAgree(!fullAgree);
    setEachAgree(Array(form.questions?.length).fill(!fullAgree));
  };

  const handleClickBackButton = () => {
    setTab((prevTab) => prevTab - 1);
  };

  const handleClickSubmitButton = async () => {
    if (fullAgree) {
      try {
        await submitParticipant({
          tableName: eventId,
          userTelegramId: formData.userTelegramId,
        });
        await addUserParticipated({
          userTelegramId: formData.userTelegramId,
          participatedEvent: eventId,
        });
        setFormData((prevState) => ({
          ...prevState,
          userIsSubmitted: true,
        }));
        setTab((prevTab) => prevTab + 1);
      } catch (error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    const allQuestionsAgreed = eachAgree.every(
      (value: boolean) => value === true,
    );

    let allChecked = true;
    for (let i = 0; i < eachAgree.length; i++) {
      if (eachRequired?.[i]) {
        if (eachAgree[i] === false) {
          allChecked = false;
          break;
        }
      }
    }

    setAllChecked(allChecked);
    setFullAgree(allQuestionsAgreed);
  }, [eachAgree]);

  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-between bg-primary p-[1.6rem] pt-[3.2rem]">
      <div className="mb-[3.7rem] flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
        <div className="flex flex-col items-start justify-center gap-[0.8rem]">
          <span className="text-[2rem] font-medium text-white">
            Section: {section}
          </span>
          <span className="text-[2rem] font-medium text-white">
            {form.title}
          </span>
          {form.introduction && (
            <span className="whitespace-pre-line text-[1.4rem] font-regular leading-8 text-gray08">
              {form.introduction}
            </span>
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
        <div className="flex flex-col items-start justify-center gap-[2rem]">
          {form.questions?.map((q, i) => {
            return (
              <EachQuestionForm
                key={q.question}
                each={q}
                eachState={eachAgree[i]}
                setEachState={(value: any) => {
                  const updatedEachAgree = [...eachAgree];
                  updatedEachAgree[i] = value;
                  setEachAgree(updatedEachAgree);
                }}
              />
            );
          })}
        </div>
        <div className="mt-[1.2rem] flex items-center justify-center">
          <div className="flex h-auto w-auto items-start justify-center gap-[2.1rem]">
            <label className="relative flex cursor-pointer items-center justify-center">
              <input
                type="checkbox"
                checked={fullAgree}
                onChange={handleFullAgreementClick}
                className="before:content[''] hover:before:opacity-10 peer relative h-[2rem] w-[2rem] cursor-pointer appearance-none rounded-md border border border-[0.3rem] border-solid border-gray12 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-secondary before:opacity-0 before:transition-opacity checked:border-secondary checked:bg-blue07 checked:before:bg-blue07"
              />
              <div className="pointer-events-none absolute left-[50%] top-[50%] -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[100%] w-[100%]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center text-[1.4rem] font-regular leading-7 ${
                fullAgree ? 'text-blue07' : 'text-white'
              }`}
              onClick={handleFullAgreementClick}
            >
              Full Agreement
            </label>
          </div>
        </div>
      </div>
      <div className="flex h-auto w-full items-center justify-center gap-[1.6rem]">
        <button
          className="flex h-[6rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem] bg-gray10 duration-200 hover:scale-105 active:scale-100"
          onClick={handleClickBackButton}
        >
          <span className="text-center font-[semiBold] text-[1.8rem] text-white">
            Back
          </span>
        </button>
        <button
          disabled={!allChecked}
          className={`flex h-[6rem] w-full items-center justify-center rounded-[1.2rem] ${
            allChecked
              ? 'cursor-pointer bg-blue07 duration-200 hover:scale-105 active:scale-100'
              : 'bg-gray14'
          }`}
          onClick={handleClickSubmitButton}
        >
          <span
            className={`text-center font-[semiBold] text-[1.8rem] ${
              allChecked ? 'text-white' : 'text-gray10'
            }`}
          >
            Submit
          </span>
        </button>
        <ScrollToTop />
      </div>
    </div>
  );
};

export default ConsentApplyForm;
