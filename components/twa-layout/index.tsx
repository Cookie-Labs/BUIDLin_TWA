import WebApp from '@twa-dev/sdk';

export default function TwaLayout({ children }: { children: React.ReactNode }) {
  console.log(typeof window);

  return (
    <div className="mx-auto min-h-[100vh] max-w-[100vw] sm:min-h-[100vh] sm:max-w-[576px]">
      {children}
      {typeof window !== 'undefined' && (
        <>{(WebApp.ready(), WebApp.expand())}</>
      )}
      <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
      <script>eruda.init();</script>
    </div>
  );
}
