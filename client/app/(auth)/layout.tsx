export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-screen flex justify-center items-center bg-slate-100'>
      <div className='rounded-lg p-8 shadow-2xl flex flex-col gap-4 bg-white'>
        <h1 className='text-center text-xl text-green-900 font-semibold'>
          Alerty
        </h1>
        {children}
      </div>
    </div>
  );
}
