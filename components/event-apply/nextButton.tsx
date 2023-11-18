//TODO: required가 전부되었을 때 nextbutton이 눌리도록 해야함
//TODO: next button이 눌리는 시점에 데이터에 저장해야함.
//TODO: mainApplyForm에서는 telegram_handle, form_done
//TODO: subApplyForm에서는 각각의 데이터를 저장. hidden은 17-1, 17-2처럼할지, 빈칸으로 줄지는 생각

import { myAPPStep } from '@/states/formUserState';
import { useSetRecoilState } from 'recoil';
import ScrollToTop from './scrollToTop';

const NextButton = ({ type }: { type: string }) => {
  const setTab = useSetRecoilState(myAPPStep);
  const handleClickNextButton = () => {
    setTab((prevTab) => prevTab + 1);
  };

  return (
    <button
      className="flex h-[6rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem] bg-blue07 duration-200 hover:scale-105 active:scale-100"
      onClick={handleClickNextButton}
    >
      <span className="text-center font-[semiBold] text-[1.8rem] text-white">
        {type}
      </span>
      <ScrollToTop />
    </button>
  );
};

export default NextButton;
