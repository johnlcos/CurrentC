import Image from "next/image";
import Link from "next/link";
import {
  BiBell,
  BiCog,
  BiEnvelope,
  BiExit,
  BiHome,
  BiMapAlt,
  BiSolidUser,
} from "react-icons/bi";

export const SideNavBar = () => {
  return (
    <div
      id="left-column"
      className="flex flex-col gap-y-5 items-center p-5 bg-green-700 shadow-2xl h-full w-full px-2"
    >
      <div className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] relative rounded-full overflow-hidden">
        <Image src={"/alerty.png"} fill alt="Alerty Logo"></Image>
      </div>
      <div className="flex flex-col gap-3 w-full md:w-5/6">
        <Link
          href="/"
          className="text-center bg-white p-3 rounded-lg text-green-900 font-semibold shadow-md hover:bg-slate-100 transition duration-300 flex items-center justify-center gap-2"
        >
          <BiHome />
          <p className="hidden md:block">Home</p>
        </Link>
        <Link
          href="/"
          className="text-center bg-white p-3 rounded-lg text-green-900 font-semibold shadow-md hover:bg-slate-100 transition duration-300 flex items-center justify-center gap-2"
        >
          <BiMapAlt />
          <p className="hidden md:block">Explore</p>
        </Link>
        <Link
          href="/"
          className="text-center bg-white p-3 rounded-lg text-green-900 font-semibold shadow-md hover:bg-slate-100 transition duration-300 flex items-center justify-center gap-2"
        >
          <BiBell />
          <p className="hidden md:block">Notifications</p>
        </Link>
        <Link
          href="/"
          className="text-center bg-white p-3 rounded-lg text-green-900 font-semibold shadow-md hover:bg-slate-100 transition duration-300 flex items-center justify-center gap-2"
        >
          <BiEnvelope />
          <p className="hidden md:block">Messages</p>
        </Link>
        <Link
          href="/"
          className="text-center bg-white p-3 rounded-lg text-green-900 font-semibold shadow-md hover:bg-slate-100 transition duration-300 flex items-center justify-center gap-2"
        >
          <BiSolidUser />
          <p className="hidden md:block">Profile</p>
        </Link>
        <Link
          href="/"
          className="text-center bg-white p-3 rounded-lg text-green-900 font-semibold shadow-md hover:bg-slate-100 transition duration-300 flex items-center justify-center gap-2"
        >
          <BiCog />
          <p className="hidden md:block">Settings</p>
        </Link>
        <Link
          href="/"
          className="text-center bg-white p-3 rounded-lg text-green-900 font-semibold shadow-md hover:bg-slate-100 transition duration-300 flex items-center justify-center gap-2"
        >
          <BiExit />
          <p className="hidden md:block">Sign Out</p>
        </Link>
      </div>
    </div>
  );
};
