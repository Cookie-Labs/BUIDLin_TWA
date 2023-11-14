import Image from 'next/image';

const SponsorSection = ({
  sponsors,
}: {
  sponsors: { imgUrl: string; name: string }[];
}) => {
  return (
    <div className="flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
        <span className="text-xxxl font-medium text-white">Sponsors</span>
        <span className="text-[1.6rem] font-regular leading-8 text-gray08">
          Sponsors of this event.
        </span>
      </div>
      <div className="grid grid-cols-3 gap-[2.9rem]">
        {sponsors.map((s) => {
          return (
            <div
              key={s.name}
              className="flex flex-col items-center justify-center gap-[0.8rem]"
            >
              <div className='flex items-center justify-center w-[10rem] h-[10rem]'>
              <Image
                src={s.imgUrl}
                alt={`${s.name} Image`}
                style={{
                  width: '10rem',
                  height: 'auto',
                  objectFit: 'cover',
                }}
                width={1000}
                height={1000}
              />
              </div>
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
