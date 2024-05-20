import { header } from "@/assets/data/header";
import MobileMenuItem from "../menu-item/mobile-menu-item";
type Props = {};

const MobileHeader = (props: Props) => {
  return (
    <nav className="shadow-t fixed bottom-0 z-50 flex w-full items-center justify-between bg-white px-4 py-3 dark:bg-gray-900 md:hidden">
      {header.mobileMenu.map((item, index) => (
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
