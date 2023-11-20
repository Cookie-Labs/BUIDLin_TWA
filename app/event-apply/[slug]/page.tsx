'use client';

import { Fragment, useState } from 'react';

import { EventForm } from '@/mock/eventInterface';
import { eventsInProgress } from '@/mock/events';

import { myAPPStep } from '@/states/formUserState';
import { useRecoilValue } from 'recoil';

import NextButton from '@/components/event-apply/nextButton';
import BackButton from '@/components/event-apply/backButton';
import OkayButton from '@/components/event-apply/okayButton';

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
  const tab = useRecoilValue(myAPPStep);
  const [allChecked, setAllChecked] = useState(false);

  // TODO:나중에 백엔드로 변경
  const event: EventForm | undefined = eventsInProgress.find(
    (event) => event.id === params.slug,
  );

  if (!event) {
    return <NotFound />;
  }

  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-between bg-primary p-[1.6rem] pt-[3.2rem]">
      {event.applyForm ? (
        <>
          {tab === 0 && (
            <>
              <MainApplyForm
                form={event.applyForm[0]}
                setAllChecked={setAllChecked}
                eventId={event.id}
              />
              <NextButton
                type="Next"
                allChecked={allChecked}
                setAllChecked={setAllChecked}
              />
            </>
          )}
          {0 < tab &&
            tab < event.applyForm.length - 1 &&
            event.applyForm.slice(1).map((a, i) => {
              if (tab === i + 1) {
                return (
                  <Fragment key={i}>
                    <SubApplyForm
                      section={tab}
                      form={a}
                      setAllChecked={setAllChecked}
                    />
                    <div className="flex h-auto w-full items-center justify-center gap-[1.6rem]">
                      <BackButton />
                      <NextButton
                        type="Next"
                        allChecked={allChecked}
                        setAllChecked={setAllChecked}
                      />
                    </div>
                  </Fragment>
                );
              } else null;
            })}
          {tab === event.applyForm.length - 1 && (
            <>
              <ConsentApplyForm
                section={tab}
                form={event.applyForm[tab]}
                setAllChecked={setAllChecked}
              />
              <div className="flex h-auto w-full items-center justify-center gap-[1.6rem]">
                <BackButton />
                <NextButton
                  type="Submit"
                  allChecked={allChecked}
                  setAllChecked={setAllChecked}
                />
              </div>
            </>
          )}
          {tab === event.applyForm.length && (
            <>
              <EndApplyForm />
              <OkayButton id={event.id} />
            </>
          )}
        </>
      ) : null}
      <ScrollToTopButton />
    </div>
  );
}
