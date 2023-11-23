// TODO: TWA에서는 텔레그램 버튼으로 진행, 나머지 브라우저 뷰에서는 자체적으로 만들기

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSetRecoilState } from 'recoil';
import { myAPPStep } from '@/states/formUserState';

import { useMainButton } from '@tma.js/sdk-react';

const ApplyButton = ({ eventId }: { eventId: string }) => {
  const router = useRouter();
  const mainButton = useMainButton();
  const setMyAPPStep = useSetRecoilState(myAPPStep);

  const handleApplyButtonClick = () => {
    router.push(`/event-apply/${eventId}`);
    setMyAPPStep(0);
  };

  useEffect(() => {
    const onMainButtonClick = () => handleApplyButtonClick();

    mainButton.enable().show();
    mainButton.setText('Apply');
    mainButton.on('click', onMainButtonClick);

    return () => {
      mainButton.off('click', onMainButtonClick);
      mainButton.hide();
    }
  }, []);

  // for Browser
  // return (
  //   <button
  //     className="flex h-[6rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem] bg-blue07 duration-200 hover:scale-105 active:scale-100"
  //     onClick={handleApplyButtonClick}
  //   >
  //     <span className="text-center font-[semiBold] text-[1.8rem] text-white">
  //       Apply
  //     </span>
  //   </button>
  // );
  
  // for Telegram App
  return null;
};

export default ApplyButton;
