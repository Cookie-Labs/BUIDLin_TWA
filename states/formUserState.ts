//TODO: 웹브라우저는 sessionStorage 가능하지만, telegramWebApp에서는 불가능하므로 cloudStorage 봐야함

import { atom } from 'recoil';

export interface FormData {
  [key: string]: any;
}

export interface User {
  addedToAttachmentMenu?: boolean;
  allowsWriteToPm?: boolean;
  firstName: string;
  id: number;
  isBot?: boolean;
  isPremium?: boolean;
  lastName?: string;
  languageCode?: string;
  photoUrl?: string;
  username?: string;
}

export const initUserData = atom<User>({
  key: 'formUserState/initUserData',
  default: {
    firstName: '',
    id: 0,
  },
})

export const applyForEvent = atom({
  key: 'formUserState/applyForEvent',
  default: '',
});

export const myAPPStep = atom({
  key: 'formUserState/myAPPStep',
  default: 0,
});

export const myFormData = atom<FormData>({
  key: 'fromUserState/myFormData',
  default: {
    userTelegramId: 0,
    userIsSubmitted: false,
  },
});
