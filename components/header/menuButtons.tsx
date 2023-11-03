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
            className="cursor-pointer hover:scale-110 active:scale-100 hover:text-gray08"
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
