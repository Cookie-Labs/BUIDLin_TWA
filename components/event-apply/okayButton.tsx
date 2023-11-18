import { useRouter } from 'next/navigation';

const OkayButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleClickOkayButton = () => {
    router.push(`/event-detail/${id}`);
  };

  return (
    <button
      className="flex h-[6rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem] bg-blue07 duration-200 hover:scale-105 active:scale-100"
      onClick={handleClickOkayButton}
    >
      <span className="text-center font-[semiBold] text-[1.8rem] text-white">
        Okay!
      </span>
    </button>
  );
};

export default OkayButton;
