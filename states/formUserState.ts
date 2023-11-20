//TODO: 웹브라우저는 sessionStorage 가능하지만, telegramWebApp에서는 불가능하므로 cloudStorage 봐야함

import { atom } from 'recoil';
import { TelegramUser } from 'telegram-login-button';

export const applyForEvent = atom({
  key: 'formUserState/applyForEvent',
  default: '',
})

export const myAPPStep = atom({
  key: 'formUserState/myAPPStep',
  default: 0,
});

export const myTelegramData = atom<TelegramUser>({
  key: 'formUserState/myTelegramData',
  default: {
    id: 0,
    first_name: '',
    username: '',
    photo_url: '',
    auth_date: 0,
    hash: '',
  },
});

export const myFormData = atom({
  key: 'fromUserState/myFormData',
  default: [],
})
