'use client';

export default function SubjectDetailPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='fixed inset-0 bg-green-100 min-h-screen'>
        <div className='min-h-screen w-[90%] mx-auto pt-[4.5rem] pb-16'>
          {children}
        </div>
      </div>
    </>
  );
}
