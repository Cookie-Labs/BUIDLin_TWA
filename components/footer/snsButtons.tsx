'use client';

import {
  BiLogoTelegram,
  BiLogoInstagramAlt,
  BiLogoTwitter,
} from 'react-icons/bi';

const SnsButtons = () => {
  const handleSNSButtonClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center justify-center gap-5">
      <button
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-circle bg-gray04 duration-200 hover:scale-110 active:scale-100 dark:bg-gray12"
        onClick={() => {
          handleSNSButtonClick('https://telegram.org/');
        }}
      >
        <BiLogoTelegram className="h-1/2 w-auto text-gray11 dark:text-white" />
      </button>
      <button
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-circle bg-gray04 duration-200 hover:scale-110 active:scale-100 dark:bg-gray12"
        onClick={() => {
          handleSNSButtonClick('https://www.instagram.com/');
        }}
      >
        <BiLogoInstagramAlt className="h-1/2 w-auto text-gray11 dark:text-white" />
      </button>
      <button
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-circle bg-gray04 duration-200 hover:scale-110 active:scale-100 dark:bg-gray12"
        onClick={() => {
          handleSNSButtonClick('https://twitter.com/');
        }}
      >
        <BiLogoTwitter className="h-1/2 w-auto text-gray11 dark:text-white" />
      </button>
    </div>
  );
};

export default SnsButtons;
