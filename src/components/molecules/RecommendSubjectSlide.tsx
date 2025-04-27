import React from 'react';

interface RecommendSubjectSlideProps {
  subjects: string;
}

export default function RecommendSubjectSlide({
  subjects,
}: RecommendSubjectSlideProps) {
  const subjectArray = subjects
    .split(',')
    .map((subject) => subject.trim())
    .filter((subject) => subject !== '')
    .slice(0, 9);

  const rows = [];
  for (let i = 0; i < subjectArray.length; i += 3) {
    rows.push(subjectArray.slice(i, i + 3));
  }

  return (
    <div className='w-full'>
      {rows.map((row) => {
        const rowKey = `row-${row.join('-')}`;

        return (
          <React.Fragment key={rowKey}>
            <div className='flex w-full py-1.5'>
              {row.map((subject, colIndex) => {
                const subjectKey = `subject-${subject}`;

                return (
                  <React.Fragment key={subjectKey}>
                    <div className='flex-1 flex justify-center items-center text-xs'>
                      <p>{subject}</p>
                    </div>
                    {colIndex < row.length - 1 && (
                      <div className='flex items-center justify-center px-2 text-grey font-extralight'>
                        |
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
