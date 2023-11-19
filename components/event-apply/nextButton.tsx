//TODO: next button이 눌리는 시점에 데이터에 저장해야함.

import { myAPPStep } from '@/states/formUserState';
import { useSetRecoilState } from 'recoil';
import ScrollToTop from './scrollToTop';

const NextButton = ({
  type,
  allChecked,
  setAllChecked,
}: {
  type: string;
  allChecked: boolean;
  setAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const setTab = useSetRecoilState(myAPPStep);
  const handleClickNextButton = () => {
    if (allChecked) {
      setTab((prevTab) => prevTab + 1);
      setAllChecked(false);
    } else {
      null;
    }
  };

  return (
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
        {type}
      </span>
      <ScrollToTop />
    </button>
  );
};

export default NextButton;
