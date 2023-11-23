import Card from '@/components/main/card';
import { eventsInProgress } from '@/mock/events';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import Test from '@/components/twa-component/test';

export default function HomePage() {
  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-start bg-primary p-[1.6rem] pt-[3.2rem]">
      <div className="mb-[3.2rem] text-[2.4rem] font-bold text-white">
        Current Event
      </div>
      <div className="flex flex-col items-center justify-center gap-24">
        {eventsInProgress.map((event) => {
          return <Card key={event.id} eventItem={event} />;
        })}
      </div>
      <ScrollToTopButton />
      <Test />
    </div>
  );
}
