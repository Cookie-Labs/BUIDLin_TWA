'use client';

import { useEffect, useState } from 'react';

import { EventForm } from '@/components/event-interface';
import { getEventData } from '@/services/dynamoDB';

import { applyForEvent, myAPPStep, myFormData } from '@/states/formUserState';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import MainApplyForm from '@/components/event-apply/mainApplyForm';
import SubApplyForm from '@/components/event-apply/subApplyForm';
import EndApplyForm from '@/components/event-apply/endApplyForm';
import NotFound from './not-found';
import Loading from './loading';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import ConsentApplyForm from '@/components/event-apply/consentApplyForm';

export default function EventApplyPage({
  params,
}: {
  params: { slug: string };
}) {
  const tab = useRecoilValue(myAPPStep);
  const setApplyForEvent = useSetRecoilState(applyForEvent);
  const [formData, setFormData] = useRecoilState(myFormData);
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

  console.log(formData);

  useEffect(() => {
    setApplyForEvent(currentEvent ? currentEvent.id : '');
    setFormData({
      userTelegramId: 0,
      userIsSubmitted: false,
    });
  }, [currentEvent]);

  if (isLoading) {
    return <Loading />;
  } else if (!currentEvent) {
    return <NotFound />;
  } else {
    return (
      <div>
        {currentEvent.applyForm ? (
          <>
            {tab === 0 && <MainApplyForm form={currentEvent.applyForm[0]} />}
            {0 < tab &&
              tab < currentEvent.applyForm.length - 1 &&
              currentEvent.applyForm.slice(1).map((a, i) => {
                if (tab === i + 1) {
                  return <SubApplyForm key={i} section={tab} form={a} />;
                } else null;
              })}
            {tab === currentEvent.applyForm.length - 1 && (
              <ConsentApplyForm
                section={tab}
                form={currentEvent.applyForm[tab]}
              />
            )}
            {tab === currentEvent.applyForm.length && <EndApplyForm />}
          </>
        ) : null}
        <ScrollToTopButton />
      </div>
    );
  }
}
