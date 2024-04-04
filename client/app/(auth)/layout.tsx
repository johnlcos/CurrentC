export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex justify-center items-center bg-[#17191A]">
      <div className="rounded-lg p-8 shadow-2xl flex flex-col gap-4 bg-[#252526]">
        <h1 className="text-center text-xl text-text-white font-semibold">
          Alerty
        </h1>
        {children}
      </div>
    </div>
  );
}
