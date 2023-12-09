export default function Loading() {
  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-between bg-primary p-[1.6rem] pt-[3.2rem]">
      <div className="flex h-auto w-full flex-col items-center justify-center gap-[3.2rem]">
        <div className="h-[2.4rem] w-full rounded-[1.6rem] bg-gray14" />
        <div className="flex h-auto w-full flex-col items-start justify-center gap-[3rem]">
          <div className="h-[2rem] w-[50%] rounded-[1.6rem] bg-gray14" />
          <div className="h-[2.8rem] w-full rounded-[1.6rem] bg-gray14" />
          <div className="h-[2.8rem] w-full rounded-[1.6rem] bg-gray14" />
        </div>
        <div className="mx-auto h-[2.4rem] w-[50%] rounded-[1.6rem] bg-gray14" />
      </div>
      <div className="h-[6rem] w-full rounded-[1.2rem] bg-gray14" />
    </div>
  );
}
