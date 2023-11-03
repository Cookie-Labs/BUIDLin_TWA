import SidebarButton from './sidebarButton';
import ThemeSwitcher from './themeSwitcher';
import ThemeLogo from './themeLogo';
import MenuButtons from './menuButtons';

export default function Header() {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-topbarH w-screen items-center justify-between bg-gray02 dark:bg-gray14">
      <ThemeLogo />
      <MenuButtons />
      <ThemeSwitcher />
      <SidebarButton />
    </div>
  );
}
