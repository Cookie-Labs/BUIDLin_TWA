'use client';

import { AiFillCaretUp } from 'react-icons/ai';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 flex h-24 w-24 cursor-pointer items-center justify-center rounded-circle bg-secondary text-title text-gray10 duration-200 hover:scale-110 active:scale-100 dark:bg-secondary"
    >
      <AiFillCaretUp />
    </button>
  );
};

export default ScrollToTopButton;
