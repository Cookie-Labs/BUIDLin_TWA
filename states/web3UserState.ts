import { atom, selector } from 'recoil';

export const userAccount = atom({
  key: 'web3UserState/userAccount',
  default: sessionStorage.getItem('_account'),
});

export const userWalletType = atom({
  key: 'web3UserState/userWalletType',
  default: sessionStorage.getItem('_walletType'),
});

export const userNetworkId = atom({
  key: 'web3UserState/userNetworkId',
  default: sessionStorage.getItem('_networkId'),
});

export const userWeb3State = selector({
  key: 'web3UserState/currentWeb3User',
  get: ({ get }) => {
    const account = get(userAccount);
    const walletType = get(userWalletType);
    const networkId = get(userNetworkId);

    return { account, walletType, networkId };
  },
});