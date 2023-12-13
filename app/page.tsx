'use client';

import { useRouter } from 'next/navigation';
import { useInitData } from '@tma.js/sdk-react';
import { useEffect, useState } from 'react';

import Card from '@/components/main/card';
import LoadingCard from '@/components/main/loadingCard';
import { EventForm } from '@/components/event-interface';
import { getEventData, getPublicEventsId } from '@/services/dynamoDB';
import ScrollToTopButton from '@/components/scroll-to-top-button';

export default function HomePage() {
  const router = useRouter();
  const initData = useInitData();

  useEffect(() => {
    if (initData && initData.startParam) {
      router.push(`/event-detail/${initData.startParam}`);
    }
  }, [initData]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<EventForm[]>([]);

  useEffect(() => {
    const getCurrentEvents = async () => {
      try {
        const publicEventsId = await getPublicEventsId();
        if (publicEventsId?.Items !== undefined) {
          const publicEventsData = (await Promise.all(
            publicEventsId.Items.map(async (obj) => {
              const response = await getEventData({ eventId: obj.id });
              return response.Item;
            }),
          )) as EventForm[];

          setCurrentEvents(publicEventsData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error!', error);
        setIsLoading(false);
      }
    };

    getCurrentEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[100vh] max-w-[100%] flex-col items-center justify-start bg-primary p-[1.6rem] pt-[3.2rem]">
        <div className="mb-[3.2rem] text-[2.4rem] font-bold text-white">
          Current Events
        </div>
        <div className="flex h-auto w-full flex-col items-center justify-center gap-24">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-start bg-primary p-[1.6rem] pt-[3.2rem]">
        <div className="mb-[3.2rem] text-[2.4rem] font-bold text-white">
          Current Events
        </div>
        <div className="flex h-auto w-full flex-col items-center justify-center gap-24">
          {currentEvents.length !== 0 ? (
            currentEvents.map((event) => {
              return <Card key={event.id} eventItem={event} />;
            })
          ) : (
            <span className="text-[2rem] font-semiBold text-gray10 text-center">
              There are no public events currently in progress! 😅😅
            </span>
          )}
        </div>
        <ScrollToTopButton />
      </div>
    );
  }
}
