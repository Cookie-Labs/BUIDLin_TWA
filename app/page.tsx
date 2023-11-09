import Card from '@/components/main/card';
import { eventsInProgress } from '@/mock/events';

export default function Home() {
  return (
    <div className="flex min-h-[100vh] max-w-[100vw] flex-col items-center justify-start bg-primary p-[1.6rem] pt-0">
      <div className="my-[3.2rem] text-[2.4rem] font-bold text-white">
        Current Event
      </div>
      <div className="gap-24 flex flex-col items-center justify-center">
        {eventsInProgress.map((event) => {
          return <Card key={event.id} eventItem={event} />;
        })}
      </div>
    </div>
  );
}
