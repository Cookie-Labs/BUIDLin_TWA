import Card from "@/components/main/card";
import { eventsInProgress } from "@/mock/events";

export default function Home() {
  return (
    <div className="bg-primary flex min-h-[100vh] max-w-[100vw] flex-col items-center justify-start p-[1.6rem] pt-0">
      <div className="text-[2.4rem] font-bold text-white my-[3.2rem]">Current Event</div>
      {eventsInProgress.map((event) => {
       return <Card key={event.id} eventItem={event} />; 
      })}
    </div>
  );
}
