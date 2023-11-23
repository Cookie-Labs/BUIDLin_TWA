export default function TwaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-[100vh] max-w-[100vw] sm:min-h-[100vh] sm:max-w-[576px]">
      {children}
      <script src="https://telegram.org/js/telegram-web-app.js"></script>
      <script>
        window.Telegram.WebApp.ready(); window.Telegram.WebApp.expand();
      </script>
      <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
      <script>eruda.init();</script>
    </div>
  );
}
