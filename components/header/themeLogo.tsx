'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoWhite from '@/images/logoAndName_white.png';
import logoBlack from '@/images/logoAndName_black.png';

const ThemeLogo = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="ml-5 flex h-topbarH cursor-pointer items-center sm-max:hidden z-100"
      onClick={() => router.push('/')}
    >
      <Image
        style={{
          width: 'auto',
          height: '70%',
        }}
        src={theme === 'light' ? logoBlack : logoWhite}
        alt="logo image"
        priority
      />
    </button>
  );
};

export default ThemeLogo;
