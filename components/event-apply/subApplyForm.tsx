'use client';

import { useState, useEffect } from 'react';
import { ApplyForm } from '@/mock/eventInterface';
import EachQuestionForm from './eachQuestionForm';

const SubApplyForm = ({
  section,
  form,
  setAllChecked,
}: {
  section: number;
  form: ApplyForm;
  setAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // TODO: fill을 데이터를 통해서 채우기
  const [eachAnswer, setEachAnswer] = useState<any[]>(
    Array(form.questions?.length).fill(''),
  );
  const eachRequired = form.questions?.map((question) => question.required);

  console.log(eachAnswer);

  useEffect(() => {
    let allChecked = true;
    for (let i = 0; i < eachAnswer.length; i++) {
      if (eachRequired?.[i]) {
        if (eachAnswer[i] === '') {
          allChecked = false;
          break;
        }
      }
    }

    setAllChecked(allChecked);
  }, [eachAnswer]);

  const handleClickLink = (url: string) => {
    window.open(url, '_blank');
  };

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
              eachState={eachAnswer[i]}
              setEachState={(value: any) => {
                const updatedEachAnswer = [...eachAnswer];
                updatedEachAnswer[i] = value;
                setEachAnswer(updatedEachAnswer);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SubApplyForm;
