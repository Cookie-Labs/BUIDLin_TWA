'use client';

import { BiLogoTelegram, BiRightArrowAlt } from 'react-icons/bi';

const ChannelSection = ({
  telegram,
}: {
  telegram: { name: string; link: string }[];
}) => {
  const handleButtonClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
        <span className="text-xxxl font-medium text-white">Channel</span>
        <span className="text-[1.6rem] font-regular leading-8 text-gray08">
          Join our active Telegram channel for ongoing communication.
        </span>
      </div>
      <div className="flex h-auto w-full flex-col items-center justify-center gap-[1.6rem]">
        {telegram.map((t) => {
          return (
            <button
              key={t.name}
              className="relative flex h-auto w-full cursor-pointer items-center justify-start gap-[2rem] rounded-[1.6rem] bg-secondary px-[2rem] py-[1.6rem] duration-200 hover:scale-105 active:scale-100"
              onClick={() => {
                handleButtonClick(t.link);
              }}
            >
              <div className="flex h-[5rem] w-[5rem] cursor-pointer items-center justify-center rounded-circle bg-[#0084C6]">
                <BiLogoTelegram className="h-1/2 w-auto text-white" />
              </div>
              <span className="text-[1.6rem] font-semiBold text-white">
                {t.name}
              </span>
              <div className="absolute right-[2rem] z-10 h-[3.2rem] w-[3.2rem] rounded-lg border border-2 border-solid border-gray11 bg-secondary text-gray11">
                <BiRightArrowAlt className="h-full w-auto text-gray11" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChannelSection;
