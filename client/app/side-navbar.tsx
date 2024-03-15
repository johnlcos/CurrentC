import Image from "next/image";
import Link from "next/link";

export const SideNavBar = () => {
  return (
    <div id="left-column" className="flex flex-col gap-y-5 items-start p-5">
      <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden">
        <Image src={"/alerty.png"} fill sizes="50px" alt="feeder logo"></Image>
      </div>
      <button className="border px-5 rounded-lg bg-black text-white">
        Home
      </button>
      <button className="border px-5 rounded-lg bg-black text-white">
        Explore
      </button>
      <button className="border px-5 rounded-lg bg-black text-white">
        Notifications
      </button>
      <button className="border px-5 rounded-lg bg-black text-white">
        Messages
      </button>
      <button className="border px-5 rounded-lg bg-black text-white">
        Profile
      </button>
      <Link href="/signup">Sign Up</Link>
    </div>
  );
};
