//TODO: hidden bug
// 1) 3중 중첩은 안됨
// 2) hidden required 적용 안됨
// 3) hidden required 부분 입력 후 지울 때 데이터 안사라짐
// 4) 계속 map unique key 입력하라고 warning 뜸
// 5) 히든은 setEachState에 값이 있으면 체크되었다고 생각하기 때문에 back 버그 이슈

'use client';

import { QuestionForm } from '../event-interface';
import { useState, useEffect } from 'react';

const EachQuestionForm = ({
  each,
  eachState,
  setEachState,
}: {
  each: QuestionForm;
  eachState: any;
  setEachState: (value: any) => void;
}) => {
  const [userInput, setUserInput] = useState<any>(eachState);
  const [showHiddenQuestions, setShowHiddenQuestions] =
    useState<boolean>(false);

  useEffect(() => {
    if (userInput[0] === each.options?.[0]) {
      setShowHiddenQuestions(true);
    }
  }, [each.options?.[0]]);

  useEffect(() => {
    setUserInput(eachState);
  }, [eachState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    setEachState(event.target.value);
  };

  const handleBinaryButtonClick = (choice: string | undefined) => {
    setUserInput(choice);
    setEachState(choice);
  };

  const handleSingleOptionSelect = (option: string) => {
    setUserInput(option);
    setEachState(option);
  };

  const handleMultipleOptionsSelect = (option: string) => {
    const newInput = userInput.includes(option)
      ? userInput.filter((selected: any) => selected !== option)
      : [...userInput, option];

    setUserInput(newInput);
    setEachState(newInput);
  };

  const handleHiddenButtonClick = (choice: string | undefined) => {
    if (choice === each.options?.[0]) {
      setShowHiddenQuestions(true);
      setUserInput([choice]);
      setEachState('');
    } else {
      setShowHiddenQuestions(false);
      setUserInput([choice]);
      setEachState([choice]);
    }
  };

  const handleConsentButtonClick = () => {
    setUserInput(!userInput);
    setEachState(!userInput);
  };

  const renderQuestionType = () => {
    switch (each.type) {
      case 'open':
        return (
          <div className="flex h-auto w-full flex-col items-start justify-center gap-[1.2rem]">
            <span className="whitespace-pre-line text-[1.6rem] font-regular leading-8 text-gray08">
              {each.question}{' '}
              <span className="text-red">{each.required ? '*' : null}</span>
            </span>
            <div className="h-[4rem] w-full">
              <input
                className="focus:shadow h-full w-full rounded-[0.8rem] border border-solid border-gray12 bg-secondary px-[1rem] text-[1.6rem] text-white hover:border-blue03 focus:border-blue07 focus:outline-none"
                type="text"
                onChange={handleInputChange}
                value={userInput}
              />
            </div>
          </div>
        );
      case 'binary':
        return (
          <div className="flex h-auto w-full flex-col items-start justify-center gap-[1.2rem]">
            <span className="whitespace-pre-line text-[1.6rem] font-regular leading-8 text-gray08">
              {each.question}{' '}
              <span className="text-red">{each.required ? '*' : null}</span>
            </span>
            <div className="flex h-[4rem] w-full items-center justify-center gap-[1.6rem]">
              <button
                onClick={() => handleBinaryButtonClick(each.options?.[0])}
                className={`flex h-full w-[50%] cursor-pointer items-center justify-center rounded-[0.8rem] border border-solid border-gray12 text-[1.4rem] font-regular text-white duration-200 hover:scale-105 hover:border-blue03 active:scale-100 ${
                  userInput === each.options?.[0] ? 'bg-blue07' : 'bg-secondary'
                }`}
              >
                {each.options?.[0]}
              </button>
              <button
                onClick={() => handleBinaryButtonClick(each.options?.[1])}
                className={`flex h-full w-[50%] cursor-pointer items-center justify-center rounded-[0.8rem] border border-solid border-gray12 text-[1.4rem] font-regular text-white duration-200 hover:scale-105 hover:border-blue03 active:scale-100 ${
                  userInput === each.options?.[1] ? 'bg-blue07' : 'bg-secondary'
                }`}
              >
                {each.options?.[1]}
              </button>
            </div>
          </div>
        );
      case 'single':
        return (
          <div className="flex h-auto w-full flex-col items-start justify-center gap-[1.2rem]">
            <span className="whitespace-pre-line text-[1.6rem] font-regular leading-8 text-gray08">
              {each.question}{' '}
              <span className="text-red">{each.required ? '*' : null}</span>
            </span>
            <div className="flex h-auto w-full flex-col items-start justify-center gap-[1.2rem]">
              {each.options?.map((o) => (
                <div
                  key={o}
                  className="flex items-center justify-center gap-[2.1rem]"
                >
                  <input
                    type="radio"
                    value={o}
                    checked={userInput === o}
                    onChange={() => handleSingleOptionSelect(o)}
                    className="h-[2rem] w-[2rem] cursor-pointer appearance-none rounded-circle border border-[0.3rem] border-solid border-gray12 bg-secondary checked:border-secondary checked:bg-blue07"
                  />
                  <label
                    className={`cursor-pointer text-[1.6rem] font-regular leading-7 ${
                      userInput === o ? 'text-blue07' : 'text-white'
                    }`}
                    onClick={() => handleSingleOptionSelect(o)}
                  >
                    {o}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case 'multiple':
        return (
          <div className="flex h-auto w-full flex-col items-start justify-center gap-[1.2rem]">
            <span className="whitespace-pre-line text-[1.6rem] font-regular leading-8 text-gray08">
              {each.question}{' '}
              <span className="text-red">{each.required ? '*' : null}</span>
            </span>
            <div className="flex h-auto w-full flex-col items-start justify-center gap-[1.2rem]">
              {each.options?.map((o) => (
                <div
                  key={o}
                  className="flex h-auto w-auto items-start justify-center gap-[2.1rem]"
                >
                  <label className="relative flex cursor-pointer items-center justify-center">
                    <input
                      type="checkbox"
                      value={o}
                      checked={userInput.includes(o)}
                      onChange={() => handleMultipleOptionsSelect(o)}
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
                    className={`flex cursor-pointer items-center justify-center text-[1.6rem] font-regular leading-7 ${
                      userInput.includes(o) ? 'text-blue07' : 'text-white'
                    }`}
                    onClick={() => handleMultipleOptionsSelect(o)}
                  >
                    {o}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case 'hidden':
        return (
          <div className="flex h-auto w-full flex-col items-start justify-center gap-[1.2rem]">
            <span className="whitespace-pre-line text-[1.6rem] font-regular leading-8 text-gray08">
              {each.question}{' '}
              <span className="text-red">{each.required ? '*' : null}</span>
            </span>
            <div className="h-auto w-full">
              <div className="flex h-[4rem] w-full items-center justify-center gap-[1.6rem]">
                <button
                  onClick={() => handleHiddenButtonClick(each.options?.[0])}
                  className={`flex h-full w-[50%] cursor-pointer items-center justify-center rounded-[0.8rem] border border-solid border-gray12 text-[1.4rem] font-regular text-white duration-200 hover:scale-105 hover:border-blue03 active:scale-100 ${
                    userInput[0] === each.options?.[0]
                      ? 'bg-blue07'
                      : 'bg-secondary'
                  }`}
                >
                  {each.options?.[0]}
                </button>
                <button
                  onClick={() => handleHiddenButtonClick(each.options?.[1])}
                  className={`flex h-full w-[50%] cursor-pointer items-center justify-center rounded-[0.8rem] border border-solid border-gray12 text-[1.4rem] font-regular text-white duration-200 hover:scale-105 hover:border-blue03 active:scale-100 ${
                    userInput[0] === each.options?.[1]
                      ? 'bg-blue07'
                      : 'bg-secondary'
                  }`}
                >
                  {each.options?.[1]}
                </button>
              </div>
              {showHiddenQuestions &&
                each.hiddenQuestion?.map((hiddenQ, i) => {
                  return (
                    <div className="mt-[2rem] flex flex-col items-start justify-center">
                      <EachQuestionForm
                        key={hiddenQ.question}
                        each={hiddenQ}
                        eachState={userInput[i + 1] ? userInput[i + 1] : ''}
                        setEachState={(value: any) => {
                          const updatedEachAnswer = [...userInput];
                          updatedEachAnswer[i + 1] = value;
                          setUserInput(updatedEachAnswer);

                          let hiddenEachRequired = each.hiddenQuestion?.map(
                            (q) => q.required,
                          );
                          for (
                            let j = 0;
                            j <
                            (each.hiddenQuestion
                              ? each.hiddenQuestion.length
                              : 0);
                            j++
                          ) {
                            if (hiddenEachRequired?.[j]) {
                              // 히든 질문이 필수일 때
                              if (updatedEachAnswer[j + 1] !== undefined) {
                                // 필수인 히든 질문을 입력했을 때
                                setEachState(updatedEachAnswer);
                              } else {
                                // 필수인 히든 질문을 입력하지 않았을 때
                                setEachState('');
                              }
                            } else {
                              // 히든 질문이 필수가 아닐 때
                              setEachState(updatedEachAnswer);
                            }
                          }
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        );
      case 'consent':
        return (
          <div className="flex h-auto w-full flex-col items-start justify-center gap-[1.6rem]">
            {each.options && (
              <div className="flex h-auto w-full flex-col items-center justify-center gap-[1.6rem]">
                <span className="whitespace-pre-line text-[1.4rem] font-bold leading-7 text-gray08">
                  {each.options[0]}
                </span>
                {each.options.slice(1).map((o) => {
                  return (
                    <span
                      key={o}
                      className="whitespace-pre-line text-[1.4rem] font-regular leading-7 text-gray08"
                    >
                      {o}
                    </span>
                  );
                })}
              </div>
            )}
            <div className="mb-[1.6rem] flex items-center justify-center">
              <div className="flex h-auto w-auto items-start justify-center gap-[2.1rem]">
                <label className="relative flex cursor-pointer items-center justify-center">
                  <input
                    type="checkbox"
                    value={userInput}
                    checked={userInput}
                    onChange={handleConsentButtonClick}
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
                    userInput ? 'text-blue07' : 'text-white'
                  }`}
                  onClick={handleConsentButtonClick}
                >
                  {each.question}
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return renderQuestionType();
};

export default EachQuestionForm;
