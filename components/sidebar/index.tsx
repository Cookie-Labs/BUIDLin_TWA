'use client';

import React from 'react';
import { useRecoilState } from 'recoil';
import { userSidebar } from '@/states/systemUserState';
import { useRouter } from 'next/navigation';
import { HiX } from 'react-icons/hi';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { routes } from '@/utils/routes';

export default function Sidebar() {
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useRecoilState(userSidebar);
  const sidebarRef = useOutsideClick(() => {
    setOpenSidebar(false);
  });

  return (
    <div
      className={`shadow-2xl fixed right-0 top-0 z-20 flex min-h-full w-sidebarW flex-col bg-white pb-10 transition-all duration-200 dark:bg-black sm:hidden ${
        openSidebar ? 'translate-x-0' : 'translate-x-sidebarW'
      }`}
      ref={sidebarRef}
    >
      <button
        onClick={() => setOpenSidebar(false)}
        className="absolute right-5 top-5 cursor-pointer"
      >
        <HiX />
      </button>
      <div className="mt-16 flex h-auto w-full items-center justify-center text-xxxl font-black text-black dark:text-white">
        MENU
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-5">
        {routes.map((route) => {
          return (
            <button
              key={route.name} 
              className="flex cursor-pointer items-center justify-center gap-2 duration-100 hover:scale-110 hover:text-gray08 active:scale-100"
              onClick={() => {
                router.push(route.path);
              }}
            >
              {React.createElement(route.icon, { size: 20 })}
              {route.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
