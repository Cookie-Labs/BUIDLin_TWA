import Image from 'next/image';
import { SponsorsForm } from '../event-interface';

const SponsorSection = ({ sponsors }: { sponsors: SponsorsForm[] }) => {
  return (
    <div className="flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
        <span className="text-xxxl font-medium text-white">
          Sponsors
        </span>
        <span className="text-[1.6rem] font-regular leading-8 text-gray08">
          Sponsors of this event.
        </span>
      </div>
      <div className="grid h-auto w-full grid-cols-3 items-start justify-center gap-[2.9rem]">
        {sponsors.map((s) => {
          return (
            <div
              key={s.name}
              className="flex flex-col items-center justify-center gap-[0.8rem]"
            >
              <Image
                src={s.imgUrl}
                alt={`${s.name} Image`}
                className="w-[10rem] h-[10rem] rounded-[50%] object-contain"
                width={1000}
                height={1000}
              />
              <span className="text-center text-[1.6rem] font-medium text-white">
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SponsorSection;
