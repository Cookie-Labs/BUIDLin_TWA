'use client';

import { useRouter } from 'next/navigation';
import { EventForm } from '@/mock/eventInterface';
import Image from 'next/image';

const Card = ({ eventItem }: { eventItem: EventForm }) => {
  const router = useRouter();

  const handleEventDetailClick = () => {
    router.push(`/event-detail?id=${eventItem.id}`);
  };

  return (
    <button
      onClick={handleEventDetailClick}
      className="flex aspect-[1/0.94972] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[1.6rem] border border-solid border-white duration-200 hover:scale-105 active:scale-100"
    >
      <div className="aspect-[1/0.56145] w-full">
        <Image
          src={eventItem.posterImgUrl}
          alt="event image url"
          priority
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '1.6rem 1.6rem 0 0',
          }}
          width={1000}
          height={1000}
        />
      </div>
      <div className="h-full w-full">
        <span>Hello</span>
      </div>
    </button>
  );
};

export default Card;
