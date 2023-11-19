import { atom } from 'recoil';

export interface TelegramOAuthResponse {
  id?: number;
  auth_date?: number;
  last_name?: string;
  first_name?: string;
  username?: string;
  hash?: string;
  photo_url?: string;
}

export const myAPPStep = atom({
  key: 'formUserState/myAPPStep',
  default: 0,
});

export const myTelegramData = atom({
  key: 'formUserState/myTelegramData',
  default:
    typeof window !== 'undefined'
      ? sessionStorage.getItem('_telegramData')
      : null,
});
