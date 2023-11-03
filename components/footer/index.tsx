import ThemeLogo from '../header/themeLogo';
import SnsButtons from './snsButtons';
import PolicySection from './policySection';

export default function Footer() {
  return (
    <div className="z-10 flex h-footerH w-screen flex-col items-center justify-between bg-gray02 p-6 pt-14 dark:bg-gray14 sm-max:hidden">
      <div className="flex w-full items-center justify-between">
        <ThemeLogo />
        <SnsButtons />
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="font-bold">© 2023 CookieLabs</span>
        <PolicySection />
      </div>
    </div>
  );
}
