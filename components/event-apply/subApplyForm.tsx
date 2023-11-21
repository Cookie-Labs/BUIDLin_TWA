'use client';

import { useState, useEffect } from 'react';
import { ApplyForm } from '@/mock/eventInterface';
import EachQuestionForm from './eachQuestionForm';

import { myFormData, myAPPStep, applyForEvent } from '@/states/formUserState';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import ScrollToTop from './scrollToTop';

import { deleteParticipant, updateParticipant } from '@/services/dynamoDB';

const SubApplyForm = ({
  section,
  form,
}: {
  section: number;
  form: ApplyForm;
}) => {
  const [formData, setFormData] = useRecoilState(myFormData);
  const eventId = useRecoilValue(applyForEvent);
  const setTab = useSetRecoilState(myAPPStep);
  const [allChecked, setAllChecked] = useState(false);
  const eachQuestions = form.questions?.map((q) => q.question);
  const eachRequired = form.questions?.map((q) => q.required);
  const [eachAnswers, setEachAnswers] = useState<any[]>(
    eachQuestions
      ? eachQuestions?.map((q) => formData[q] || '')
      : Array(form.questions?.length).fill(''),
  );

  console.log(eachAnswers);

  useEffect(() => {
    let allChecked = true;
    for (let i = 0; i < eachAnswers.length; i++) {
      if (eachRequired?.[i]) {
        if (eachAnswers[i] === '') {
          allChecked = false;
          break;
        }
      }
    }
    setAllChecked(allChecked);
  }, [eachAnswers]);

  const handleClickBackButton = () => {
    setTab((prevTab) => prevTab - 1);
  };

  const handleClickNextButton = async () => {
    if (allChecked) {
      try {
        const updatedFormData = {
          ...formData,
          ...eachQuestions?.reduce(
            (acc, question, index) => {
              acc[question] = eachAnswers[index];
              return acc;
            },
            {} as Record<string, any>,
          ),
        };
        await deleteParticipant({
          tableName: eventId,
          userTelegramId: formData.userTelegramId,
        });
        await updateParticipant({
          tableName: eventId,
          participantData: updatedFormData,
        });
        setFormData(updatedFormData);
        setTab((prevTab) => prevTab + 1);
        setAllChecked(false);
      } catch (error) {
        throw error;
      }
    }
  };

  const handleClickLink = (url: string) => {
    window.open(url, '_blank');
  };

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
                eachState={eachAnswers[i]}
                setEachState={(value: any) => {
                  const updatedEachAnswer = [...eachAnswers];
                  updatedEachAnswer[i] = value;
                  setEachAnswers(updatedEachAnswer);
                }}
              />
            );
          })}
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
          onClick={handleClickNextButton}
        >
          <span
            className={`text-center font-[semiBold] text-[1.8rem] ${
              allChecked ? 'text-white' : 'text-gray10'
            }`}
          >
            Next
          </span>
        </button>
        <ScrollToTop />
      </div>
    </div>
  );
};

export default SubApplyForm;
