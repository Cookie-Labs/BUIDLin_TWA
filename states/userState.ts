import { atom, selector } from 'recoil';

export const userIsLoggedIn = atom({
  key: 'userState/userIsLoggedIn',
  default: sessionStorage.getItem('_isLoggedIn'),
});

export const userToken = atom({
  key: 'userState/userToken',
  default: sessionStorage.getItem('_token'),
});

export const userWeb2State = selector({
  key: 'userState/currentWeb2User',
  get: ({ get }) => {
    const isLoggedIn = get(userIsLoggedIn);
    const token = get(userToken);

    return { isLoggedIn, token };
  },
});

export const userAccount = atom({
  key: 'userState/userAccount',
  default: sessionStorage.getItem('_user'),
});

export const userWalletType = atom({
  key: 'userState/userWalletType',
  default: sessionStorage.getItem('_wallet'),
});

export const userNetworkId = atom({
  key: 'userState/userNetworkId',
  default: sessionStorage.getItem('_networkId'),
});

export const userWeb3State = selector({
  key: 'userState/currentWeb3User',
  get: ({ get }) => {
    const account = get(userAccount);
    const walletType = get(userWalletType);
    const networkId = get(userNetworkId);

    return { account, walletType, networkId };
  },
});
