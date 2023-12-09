'use client';

import { useEffect, useState } from 'react';

import { EventForm } from '@/components/event-interface';
import { getEventData } from '@/services/dynamoDB';

import PosterSection from '@/components/event-detail/posterSection';
import TitleSection from '@/components/event-detail/titleSection';
import AwardSection from '@/components/event-detail/awardSection';
import ChannelSection from '@/components/event-detail/channelSection';
import InformationSection from '@/components/event-detail/informationSection';
import ProgramSection from '@/components/event-detail/programSection';
import SpeakerSection from '@/components/event-detail/speakerSection';
import SponsorSection from '@/components/event-detail/sponsorSection';
import ApplyButton from '@/components/event-detail/applyButton';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import NotFound from './not-found';
import Loading from './loading';

import { myAPPStep, myFormData } from '@/states/formUserState';
import { useSetRecoilState } from 'recoil';

export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const setTab = useSetRecoilState(myAPPStep);
  const setFormData = useSetRecoilState(myFormData);
  const [currentEvent, setCurrentEvent] = useState<EventForm | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCurrentEvent = async () => {
      try {
        const eventData = await getEventData({ eventId: params.slug });
        if (eventData?.Item !== undefined) {
          const eventItem = eventData.Item as EventForm;
          setCurrentEvent(eventItem);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error!', error);
        setIsLoading(false);
      }
    };

    getCurrentEvent();
  }, [params.slug]);

  useEffect(() => {
    setTab(0);
    setFormData({
      userTelegramId: 0,
      userIsSubmitted: false,
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else if (!currentEvent) {
    return <NotFound />;
  } else {
    return (
      <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-start gap-[3.2rem] bg-primary p-[1.6rem] pt-[2.4rem]">
        <PosterSection posterImgUrl={currentEvent.posterImgUrl} />
        <TitleSection
          title={currentEvent.title}
          host={currentEvent.host}
          hostImgUrl={currentEvent.hostImgUrl}
          description={currentEvent.description}
        />
        {currentEvent.award && <AwardSection award={currentEvent.award} />}
        {currentEvent.telegram && (
          <ChannelSection telegram={currentEvent.telegram} />
        )}
        <InformationSection
          country={currentEvent.country}
          location={currentEvent.location}
          startDate={currentEvent.schedule[0].date}
          endDate={currentEvent.schedule[currentEvent.schedule.length - 1].date}
        />
        {currentEvent.schedule[0].programs && (
          <ProgramSection schedule={currentEvent.schedule} />
        )}
        {currentEvent.speakers && (
          <SpeakerSection speakers={currentEvent.speakers} />
        )}
        {currentEvent.sponsors && (
          <SponsorSection sponsors={currentEvent.sponsors} />
        )}
        {currentEvent.applyForm && <ApplyButton eventId={currentEvent.id} />}
        <ScrollToTopButton />
      </div>
    );
  }
}
