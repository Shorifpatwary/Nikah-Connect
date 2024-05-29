import { header } from "@/assets/data/header";
import MobileMenuItem from "@/components/sections/header/menu-item/mobile-menu-item";

const MobileHeader = () => {
  return (
    <nav className="shadow-t fixed bottom-0 z-50 flex w-full items-center justify-between gap-2 bg-white px-4 py-3 dark:bg-gray-900 md:hidden">
      {header.mobileMenu.map(item => (
        <MobileMenuItem
          key={item.href + item.title}
          href={item.href}
          title={item.title}
          icon={item.icon}
        />
      ))}
    </nav>
  );
};

export default MobileHeader;
