import { myAPPStep } from '@/states/formUserState';
import { useSetRecoilState } from 'recoil';
import ScrollToTop from './scrollToTop';

const BackButton = () => {
  const setTab = useSetRecoilState(myAPPStep);
  const handleClickBackButton = () => {
    setTab((prevTab) => prevTab - 1);
  };

  return (
    <button
      className="flex h-[6rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem] bg-gray10 duration-200 hover:scale-105 active:scale-100"
      onClick={handleClickBackButton}
    >
      <span className="text-center font-[semiBold] text-[1.8rem] text-white">
        Back
      </span>
      <ScrollToTop />
    </button>
  );
};

export default BackButton;
