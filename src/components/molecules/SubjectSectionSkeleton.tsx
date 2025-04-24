const SubjectSectionSkeleton = () => {
  return (
    <div className='relative pt-4 rounded-2xl rounded-tl-none min-h-[88px] animate-pulse bg-grey'>
      <div className='absolute -top-3 left-0'>
        <div className='flex items-center gap-2 px-4 rounded-full h-[24px] bg-grey'>
          <div className='w-3 h-3 rounded-full bg-cloud/50' />
          <div className='w-16 h-3 rounded-full bg-cloud/50' />
        </div>
      </div>
      <div className='px-6 pb-2 space-y-2'>
        <div className='w-full h-3 rounded-full bg-cloud/50' />
        <div className='w-3/4 h-3 rounded-full bg-cloud/50' />
      </div>
    </div>
  );
};

export default SubjectSectionSkeleton;
