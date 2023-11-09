const LoadingCard = () => {
  return (
    <button className="flex aspect-[1/0.94972] w-full flex-col items-center justify-center overflow-hidden rounded-[1.6rem] border border-solid border-gray14 duration-200 hover:scale-105 active:scale-100">
      <div className="aspect-[1/0.56145] w-full bg-gray13" />
      <div className="aspect-[1/0.38827] w-full rounded-b-[1.6rem] bg-secondary p-[1.6rem] pb-[2.1rem]">
        <div className="relative flex h-full w-full flex-col items-start justify-between">
          <div className="absolute right-0 top-0 flex aspect-[1/0.28235] w-[8.5rem] items-center justify-center rounded-[10rem] bg-gray13" />
          <div className="flex items-center justify-center gap-[1.2rem]">
            <div className="h-[3.2rem] w-[3.2rem] rounded-[1.6rem] bg-gray13" />
            <div className="aspect-[1/0.4] w-[8rem] rounded-[10rem] bg-gray13"></div>
          </div>
          <div />
          <span className="line-clamp-1 aspect-[1/0.1] w-full rounded-[10rem] text-left text-[1.6rem] font-semiBold text-white bg-gray13" />
          <span className="line-clamp-2 aspect-[1/0.04] w-full rounded-[10rem] text-left text-[1.2rem] font-regular text-gray10 bg-gray13" />
        </div>
      </div>
    </button>
  );
};

export default LoadingCard;
