import { RightSideWrapper } from "@/components/right-side-wrapper";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="middle-right-inner" className="w-full h-full flex">
      <div
        id="middle-wrapper"
        className="flex-grow lg:w-[500px] xl:w-[650px] h-full"
      >
        {children}
      </div>
      <div
        id="right-wrapper"
        className="w-[300px] xl:w-[400px] hidden lg:block"
      >
        <div className="w-[300px] xl:w-[400px] fixed">
          <RightSideWrapper />
        </div>
      </div>
    </div>
  );
}
