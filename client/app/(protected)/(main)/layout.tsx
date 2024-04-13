import { RightSideWrapper } from "@/components/right-side-wrapper";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex">
      <div className="w-full pl-[16%] lg:pr-[35%]">{children}</div>
      <div className="w-2/6 p-0 fixed right-0 bg-surface hidden h-screen lg:block z-1">
        <RightSideWrapper />
      </div>
    </div>
  );
}
