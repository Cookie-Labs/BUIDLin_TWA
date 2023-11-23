import WebApp from '@twa-dev/sdk';

export default function TwaLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    WebApp.ready();
    WebApp.expand();
  }

  return (
    <div className="mx-auto min-h-[100vh] max-w-[100vw] sm:min-h-[100vh] sm:max-w-[576px]">
      {children}
      <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
      <script>eruda.init();</script>
    </div>
  );
}
