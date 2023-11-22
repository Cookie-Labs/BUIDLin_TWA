export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
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
