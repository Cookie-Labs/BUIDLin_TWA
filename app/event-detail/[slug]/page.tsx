'use client'

import { useEffect } from 'react';

import { EventForm } from '@/mock/eventInterface';
import { eventsInProgress } from '@/mock/events';

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

import { myAPPStep, myFormData } from '@/states/formUserState';
import { useSetRecoilState } from 'recoil';

export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const setTab = useSetRecoilState(myAPPStep);
  const setFormData = useSetRecoilState(myFormData);
  // TODO:나중에 백엔드로 변경
  const event: EventForm | undefined = eventsInProgress.find(
    (event) => event.id === params.slug,
  );

  if (!event) {
    return <NotFound />;
  }

  useEffect(() => {
    setTab(0);
    setFormData({
      userTelegramId: 0,
      userIsSubmitted: false,
    });
  }, []);

  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-start gap-[3.2rem] bg-primary p-[1.6rem] pt-[2.4rem]">
      <PosterSection posterImgUrl={event.posterImgUrl} />
      <TitleSection
        title={event.title}
        host={event.host}
        hostImgUrl={event.hostImgUrl}
        description={event.description}
      />
      {event.award ? <AwardSection award={event.award} /> : null}
      {event.telegram ? <ChannelSection telegram={event.telegram} /> : null}
      <InformationSection
        country={event.country}
        location={event.location}
        startDate={event.schedule[0].date}
        endDate={event.schedule[event.schedule.length - 1].date}
      />
      {event.schedule[0].programs ? (
        <ProgramSection schedule={event.schedule} />
      ) : null}
      {event.speakers ? <SpeakerSection speakers={event.speakers} /> : null}
      {event.sponsors ? <SponsorSection sponsors={event.sponsors} /> : null}
      {event.applyForm ? <ApplyButton eventId={event.id} /> : null}
      <ScrollToTopButton />
      <script>
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(window.history.back());
        {/* window.Telegram.WebApp.MainButton.setText('Apply');
        window.Telegram.WebApp.MainButton.show();
        window.Telegram.WebApp.MainButton.onClick(CALLBACKMESSAGE) */}
      </script>
    </div>
  );
}
