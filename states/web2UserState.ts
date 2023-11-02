import { atom, selector } from 'recoil';

export const userIsLoggedIn = atom({
  key: 'web2UserState/userIsLoggedIn',
  default: sessionStorage.getItem('_isLoggedIn'),
});

export const userToken = atom({
  key: 'web2UserState/userToken',
  default: sessionStorage.getItem('_token'),
});

export const userWeb2State = selector({
  key: 'web2UserState/currentWeb2User',
  get: ({ get }) => {
    const isLoggedIn = get(userIsLoggedIn);
    const token = get(userToken);

    return { isLoggedIn, token };
  },
});