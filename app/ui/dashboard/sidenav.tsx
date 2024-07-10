import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import ColorPicker from "@/app/ui/colorPicker";
import Image from "next/image";


export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 ">
      <div className="relative mb-2 flex h-20 items-end justify-start rounded-md changerColor p-4 md:h-40">
      <Image width={300} height={300}
            className="mx-auto h-10 w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain"
            src="/favicon.png"
            alt="Your Company"
          />
        <div className="w-32 text-white md:w-40">
          <ColorPicker />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block changerColor"></div>

        <Link href="/">
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </Link>
      </div>
     
    </div>
  );
}
