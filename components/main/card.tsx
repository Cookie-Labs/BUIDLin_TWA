'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventForm } from '../event-interface';
import Image from 'next/image';

import LoadingCard from './loadingCard';
import { getParticipantCount } from '@/services/dynamoDB';

const Card = ({ eventItem }: { eventItem: EventForm }) => {
  const [participantCount, setParticipantCount] = useState<number | undefined>(
    0,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleEventDetailClick = () => {
    router.push(`/event-detail/${eventItem.id}`);
  };

  useEffect(() => {
    const handleParticipantCount = async () => {
      try {
        const newCount = await getParticipantCount({ tableName: eventItem.id });
        setParticipantCount(newCount);
        setIsLoading(false);
      } catch (error) {
        console.error('Error!', error);
        setIsLoading(false);
      }
    };
    handleParticipantCount();
  }, []);

  if (isLoading) {
    <LoadingCard />;
  } else {
    return (
      <button
        onClick={handleEventDetailClick}
        className="flex aspect-[1/0.94972] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[1.6rem] border border-solid border-gray14 duration-200 hover:scale-105 active:scale-100"
      >
        <div className="aspect-[16/9] w-full">
          <Image
            src={eventItem.posterImgUrl}
            alt="event image url"
            priority
            className="h-auto w-full rounded-t-[1.6rem] object-fill"
            width={1000}
            height={1000}
          />
        </div>
        <div className="aspect-[1/0.38827] w-full rounded-b-[1.6rem] bg-secondary px-[1.6rem]">
          <div className="relative flex h-full w-full flex-col items-start justify-evenly">
            <div className="absolute right-0 top-[1.6rem] flex aspect-[1/0.28235] w-[8.5rem] items-center justify-center rounded-[10rem] bg-gray13">
              <span className="text-md font-semiBold text-white">
                +{participantCount}
              </span>
            </div>
            <div className="flex items-center justify-center gap-[1.2rem]">
              <Image
                src={eventItem.hostImgUrl}
                alt="host image url"
                style={{
                  width: '3.2rem',
                  height: '3.2rem',
                  borderRadius: '1.6rem',
                  objectFit: 'contain',
                }}
                width={1000}
                height={1000}
              />
              <span className="text-[1.6rem] font-medium text-white">
                {eventItem.host}
              </span>
            </div>
            <div />
            <span className="line-clamp-1 max-w-full pb-0.5 text-left text-[1.6rem] font-semiBold text-white">
              {eventItem.title}
            </span>
            <span className="line-clamp-2 max-w-full pb-0.5 text-left text-[1.2rem] font-regular text-gray10">
              {eventItem.description}
            </span>
          </div>
        </div>
      </button>
    );
  }
};

export default Card;
