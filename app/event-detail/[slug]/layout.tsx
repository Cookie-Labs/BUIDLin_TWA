export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] max-w-[100vw] bg-primary p-[1.6rem] pt-[2.4rem]">
      {children}
    </div>
  );
}
