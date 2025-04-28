'use client';

export default function SubjectDetailPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='fixed inset-0 bg-mint min-h-screen max-w-[var(--device-width)] mx-auto'>
      <div className='min-h-screen w-[90%] mx-auto pt-[4.5rem] pb-16'>
        {children}
      </div>
    </div>
  );
}
