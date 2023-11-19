import { useRecoilValue } from 'recoil';
import { myTelegramData } from '@/states/formUserState';
import TelegramLoginButton from 'telegram-login-button';
import { TelegramOAuthResponse } from '@/states/formUserState';

export const TelegramOAuth = () => {
  const myTelegram = useRecoilValue(myTelegramData);
  const myTelegramJSON = myTelegram !== null ? JSON.parse(myTelegram) : null;

  const handleTelegramResponse = async (response: TelegramOAuthResponse) => {
    typeof window !== 'undefined'
      ? sessionStorage.setItem('_telegramData', JSON.stringify(response))
      : null;
  };

  return (
    <>
      {myTelegramJSON === null ? (
        <TelegramLoginButton
          dataOnauth={handleTelegramResponse}
          botName="BUIDLin_Testing_Bot"
          className="flex items-center justify-center"
        />
      ) : (
        <div>Logged In!</div>
      )}
    </>
  );
};
