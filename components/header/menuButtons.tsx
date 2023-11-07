'use client';

import { routes } from '@/utils/routes';
import { useRouter } from 'next/navigation';

const MenuButtons = () => {
  const router = useRouter();

  return (
    <div className="mr-16 flex items-center justify-center gap-4 sm-max:hidden">
      {routes.map((route) => {
        return (
          <button
            key={route.name}
            className="cursor-pointer hover:scale-110 hover:text-gray08 active:scale-100"
            onClick={() => {
              router.push(route.path);
            }}
          >
            {route.name}
          </button>
        );
      })}
    </div>
  );
};

export default MenuButtons;
