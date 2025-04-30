'use client';

import SubjectFilterForm from '@/components/molecules/SubjectFilterForm';
import SubjectSection from '@/components/molecules/SubjectSection';
import SubjectSectionSkeleton from '@/components/molecules/SubjectSectionSkeleton';
import { SECTION_TYPES } from '@/constants/departmentData';
import { useMajorDetail } from '@/hooks/useMajorData';
import useUserData from '@/hooks/useUserData';
import { useState, Suspense, useEffect } from 'react';

const RoadmapContent = () => {
  const [selectedMajorId, setSelectedMajorId] = useState<number | null>(null);
  const { user, isLoading: userLoading } = useUserData();

  const { majorDetail, loading } = useMajorDetail(selectedMajorId);

  const handleMajorSelect = (majorId: number) => {
    setSelectedMajorId(majorId);
  };

  useEffect(() => {
    if (!userLoading && user?.interestMajor?.majorId && !selectedMajorId) {
      setSelectedMajorId(user.interestMajor.majorId);
    }
  }, [user, userLoading, selectedMajorId]);

  return (
    <div className='flex flex-col gap-8 py-2'>
      <div>
        <h1 className='text-xl font-semibold mb-4'>학과정보</h1>
        <SubjectFilterForm
          initialMajorId={user?.interestMajor?.majorId}
          onMajorSelect={handleMajorSelect}
        />
      </div>

      <div className='flex flex-col gap-6'>
        {loading && (
          <>
            <SubjectSectionSkeleton />
            <SubjectSectionSkeleton />
            <SubjectSectionSkeleton />
            <SubjectSectionSkeleton />
            <SubjectSectionSkeleton />
          </>
        )}
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
