'use client';

import { useState, useEffect } from 'react';
import { ApplyForm } from '@/mock/eventInterface';
import EachQuestionForm from './eachQuestionForm';

const ConsentApplyForm = ({
  section,
  form,
}: {
  section: number;
  form: ApplyForm;
}) => {
  // TODO: fill을 데이터를 통해서 채우기
  const [fullAgree, setFullAgree] = useState(false);
  const [eachAgree, setEachAgree] = useState<any>(
    Array(form.questions?.length).fill(false),
  );

  const handleClickLink = (url: string) => {
    window.open(url, '_blank');
  };

  const handleFullAgreementClick = () => {
    setFullAgree(!fullAgree);
    setEachAgree(Array(form.questions?.length).fill(!fullAgree));
  };

  useEffect(() => {
    const allQuestionsAgreed = eachAgree.every(
      (value: boolean) => value === true,
    );
    setFullAgree(allQuestionsAgreed);
  }, [eachAgree]);

  return (
    <div className="mb-[3.7rem] flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
      <div className="flex flex-col items-start justify-center gap-[0.8rem]">
        <span className="text-[2rem] font-medium text-white">
          Section: {section}
        </span>
        <span className="text-[2rem] font-medium text-white">{form.title}</span>
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
  );
};

export default ConsentApplyForm;
