// TODO: TWA에서는 텔레그램 버튼으로 진행, 나머지 브라우저 뷰에서는 자체적으로 만들기
// TODO: event-apply로 가는 url은 여기서만 가능하도록

"use client";

import { useRouter } from 'next/navigation';

import { useSetRecoilState } from 'recoil';
import { myAPPStep } from '@/states/formUserState';

const ApplyButton = ({ eventId }: { eventId: string }) => {
  const router = useRouter();
  const setMyAPPStep = useSetRecoilState(myAPPStep);

  const handleApplyButtonClick = () => {
    router.push(`/event-apply/${eventId}`);
    setMyAPPStep(0);
  };

  return (
    <button
      className="flex h-[6rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem] bg-blue07 duration-200 hover:scale-105 active:scale-100"
      onClick={handleApplyButtonClick}
    >
      <span className="text-center font-[semiBold] text-[1.8rem] text-white">
        Apply
      </span>
    </button>
  );
};

export default ApplyButton;
