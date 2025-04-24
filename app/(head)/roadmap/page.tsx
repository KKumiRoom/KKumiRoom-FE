'use client';

import SubjectFilterForm from '@/components/molecules/SubjectFilterForm';
import SubjectSection from '@/components/molecules/SubjectSection';
import { SECTION_TYPES } from '@/constants/departmentData';
import { useMajorDetail } from '@/hooks/useMajorData';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

const RoadmapContent = () => {
  const searchParams = useSearchParams();
  const initialMajor = searchParams.get('subject');
  const [selectedMajorId, setSelectedMajorId] = useState<number | null>(null);

  const { majorDetail, loading } = useMajorDetail(selectedMajorId);

  const handleMajorSelect = (majorId: number) => {
    setSelectedMajorId(majorId);
  };

  return (
    <div className='flex flex-col gap-8 py-2'>
      <div>
        <h1 className='text-xl font-semibold mb-4'>학과별 과목안내</h1>
        <SubjectFilterForm
          initialMajor={initialMajor || undefined}
          onMajorSelect={handleMajorSelect}
        />
      </div>

      <div className='flex flex-col gap-6'>
        {loading && <div>Loading...</div>}
        {!loading && majorDetail && (
          <>
            <SubjectSection
              {...SECTION_TYPES.DESCRIPTION}
              content={majorDetail.description}
            />
            <SubjectSection
              {...SECTION_TYPES.RELATED}
              content={majorDetail.relatedMajors}
            />
            <SubjectSection
              {...SECTION_TYPES.SUBJECTS}
              content={majorDetail.recommendedCourses}
            />
            <SubjectSection
              {...SECTION_TYPES.RECOMMEND}
              content={majorDetail.recommendedStudents}
            />
            <SubjectSection
              {...SECTION_TYPES.CAREER}
              content={majorDetail.careerPath}
            />
          </>
        )}
      </div>
    </div>
  );
};

const RoadmapPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoadmapContent />
    </Suspense>
  );
};

export default RoadmapPage;
