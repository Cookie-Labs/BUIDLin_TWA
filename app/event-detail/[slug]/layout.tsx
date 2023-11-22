export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-start gap-[3.2rem] bg-primary p-[1.6rem] pt-[2.4rem]">
      {children}
      <script src="https://telegram.org/js/telegram-web-app.js"></script>
      <script>
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(window.history.back());
        {/* window.Telegram.WebApp.MainButton.setText('Apply');
        window.Telegram.WebApp.MainButton.show();
        window.Telegram.WebApp.MainButton.onClick(CALLBACKMESSAGE) */}
      </script>
    </div>
  );
}
