export default function Loading() {
  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-start gap-[3.2rem] bg-primary p-[1.6rem] pt-[2.4rem]">
      <div className="aspect-[1/0.56145] w-full rounded-[1.6rem] bg-gray14"></div>
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[1.6rem]">
        <div className="h-[2.4rem] w-full rounded-[1.6rem] bg-gray14" />
        <div className="flex h-auto w-full items-center justify-start gap-[1.2rem]">
          <div className="h-[3.2rem] w-[3.2rem] rounded-circle bg-gray14" />
          <div className="h-[1.6rem] w-[50%] rounded-[1.6rem] bg-gray14" />
        </div>
        <div className="h-[1.6rem] w-full rounded-[1.6rem] bg-gray14" />
      </div>
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
        <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
          <div className="h-[2rem] w-[50%] rounded-[1.6rem] bg-gray14" />
          <div className="h-[1.6rem] w-full rounded-[1.6rem] bg-gray14" />
        </div>
        <div className="flex h-auto w-full flex-col items-center justify-center gap-[1.6rem]">
          <div className="h-[6.2rem] w-full rounded-[1.6rem] bg-gray14" />
          <div className="h-[6.2rem] w-full rounded-[1.6rem] bg-gray14" />
        </div>
      </div>
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
        <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
          <div className="h-[2rem] w-[50%] rounded-[1.6rem] bg-gray14" />
          <div className="h-[1.6rem] w-full rounded-[1.6rem] bg-gray14" />
        </div>
        <div className="flex h-auto w-full flex-col items-center justify-center gap-[1.6rem]">
          <div className="h-[6.2rem] w-full rounded-[1.6rem] bg-gray14" />
          <div className="h-[6.2rem] w-full rounded-[1.6rem] bg-gray14" />
        </div>
      </div>
    </div>
  );
}
