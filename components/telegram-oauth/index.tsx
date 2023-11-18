import TelegramLoginButton from 'telegram-login-button';

export const TelegramOAuth = () => {
  const handleTelegramResponse = async (response: any) => {
    console.log(response);
  };

  return (
    <TelegramLoginButton
      dataOnauth={handleTelegramResponse}
      botName="BUIDLin_Testing_Bot"
      className="flex items-center justify-center rounded-md bg-blue08 text-center text-[1.4rem] font-medium text-white"
    />
  );
};
