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
      <div className="grid grid-cols-3 items-start justify-center gap-[2.9rem]">
        {sponsors.map((s) => {
          return (
            <div
              key={s.name}
              className="flex flex-col items-center justify-center gap-[0.8rem]"
            >
              <div className="flex h-[10rem] w-[10rem] items-center justify-center">
                <Image
                  src={s.imgUrl}
                  alt={`${s.name} Image`}
                  style={{
                    width: '10rem',
                    height: 'auto',
                    borderRadius: '50%',
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
