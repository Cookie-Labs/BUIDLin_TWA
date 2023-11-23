'use client';

import { useEffect } from 'react';

import { EventForm } from '@/mock/eventInterface';
import { eventsInProgress } from '@/mock/events';

import { applyForEvent, myAPPStep, myFormData, initUserData } from '@/states/formUserState';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import MainApplyForm from '@/components/event-apply/mainApplyForm';
import SubApplyForm from '@/components/event-apply/subApplyForm';
import EndApplyForm from '@/components/event-apply/endApplyForm';
import NotFound from './not-found';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import ConsentApplyForm from '@/components/event-apply/consentApplyForm';

export default function EventApplyPage({
  params,
}: {
  params: { slug: string };
}) {
  const userData = useRecoilValue(initUserData);

  const tab = useRecoilValue(myAPPStep);
  const setApplyForEvent = useSetRecoilState(applyForEvent);
  const [formData, setFormData] = useRecoilState(myFormData);

  // TODO:나중에 백엔드로 변경
  const event: EventForm | undefined = eventsInProgress.find(
    (event) => event.id === params.slug,
  );

  console.log(formData);

  if (!event) {
    return <NotFound />;
  }

  useEffect(() => {
    setApplyForEvent(event.id);
    setFormData({
      userTelegramId: 0,
      userIsSubmitted: false,
    });
  }, [event]);

  return (
    <div>
      {event.applyForm ? (
        <>
          {tab === 0 && <MainApplyForm form={event.applyForm[0]} />}
          {0 < tab &&
            tab < event.applyForm.length - 1 &&
            event.applyForm.slice(1).map((a, i) => {
              if (tab === i + 1) {
                return <SubApplyForm key={i} section={tab} form={a} />;
              } else null;
            })}
          {tab === event.applyForm.length - 1 && (
            <ConsentApplyForm section={tab} form={event.applyForm[tab]} />
          )}
          {tab === event.applyForm.length && <EndApplyForm />}
        </>
      ) : null}
      <ScrollToTopButton />
      <div>{JSON.stringify(userData)}</div>
    </div>
  );
}
