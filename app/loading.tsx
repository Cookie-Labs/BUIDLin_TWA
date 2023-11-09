import LoadingCard from '@/components/main/loadingCard';

export default function Loading() {
  return (
    <div className="flex min-h-[100vh] max-w-[100vw] flex-col items-center justify-start bg-primary p-[1.6rem] pt-0">
      <div className="my-[3.2rem] text-[2.4rem] font-bold text-white">
        Current Event
      </div>
      <div className="flex flex-col items-center justify-center gap-24">
        <LoadingCard />
        <LoadingCard />
      </div>
    </div>
  );
}
