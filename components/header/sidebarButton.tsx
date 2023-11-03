'use client';

import { FiAlignJustify } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { userSidebar } from '@/states/systemUserState';

const SidebarButton = () => {
  const [openSidebar, setOpenSidebar] = useRecoilState(userSidebar);

  return (
    <button
      className="z-100 absolute right-5 cursor-pointer duration-200 hover:scale-110 active:scale-100 sm:hidden"
      onClick={() => setOpenSidebar(!openSidebar)}
    >
      <FiAlignJustify className="h-5 w-5 text-gray11 dark:text-white" />
    </button>
  );
};

export default SidebarButton;
