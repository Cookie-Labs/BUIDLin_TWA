import { Telegram } from './twa-types';

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

export {};