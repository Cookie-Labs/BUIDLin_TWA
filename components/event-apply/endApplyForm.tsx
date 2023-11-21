import { useRouter } from 'next/navigation';
import { applyForEvent } from '@/states/formUserState';
import { useRecoilValue } from 'recoil';

const EndApplyForm = () => {
  const router = useRouter();
  const eventId = useRecoilValue(applyForEvent);

  const handleClickOkayButton = () => {
    router.push(`/event-detail/${eventId}`);
  };

  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-between bg-primary p-[1.6rem] pt-[3.2rem]">
      <div className="flex h-auto w-full flex-col items-center justify-center gap-[3.2rem]">
        <span className="text-[3rem] font-semiBold text-white">
          Thank you! We will review your application and be in contact with you
          soon.🎉
        </span>
      </div>
      <button
        className="flex h-[6rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem] bg-blue07 duration-200 hover:scale-105 active:scale-100"
        onClick={handleClickOkayButton}
      >
        <span className="text-center font-[semiBold] text-[1.8rem] text-white">
          Okay!
        </span>
      </button>
    </div>
  );
};

export default EndApplyForm;
