'use client';

import { useRouter } from 'next/navigation';

const PolicySection = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-5">
      <button
        className="cursor-pointer duration-200 hover:scale-105 hover:text-gray10 active:scale-100"
        onClick={() => router.push('/')}
      >
        Terms of Service
      </button>
      <button
        className="cursor-pointer duration-200 hover:scale-105 hover:text-gray10 active:scale-100"
        onClick={() => router.push('/')}
      >
        Privacy Policy
      </button>
    </div>
  );
};

export default PolicySection;
