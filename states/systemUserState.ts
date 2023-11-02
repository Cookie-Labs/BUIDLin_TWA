import { atom, selector } from 'recoil';

export const userSidebar = atom({
  key: 'systemUserState/userSidebar',
  default: sessionStorage.getItem('_sidebar'),
});

export const userSystemState = selector({
  key: 'systemUserState/currentSystemUser',
  get: ({ get }) => {
    const isSidebarOpen = get(userSidebar);

    return { isSidebarOpen };
  },
});
