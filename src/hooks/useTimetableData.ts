import { TIMETABLE_COLORS, TimetableData } from '@/types/timetable';
import { useState, useEffect, useCallback } from 'react';
import useTimetableApi from './useTimetableApi';

const DAY_MAPPING: { [key: string]: string } = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
};

const useTimetableData = () => {
  const [timetableData, setTimetableData] = useState<TimetableData>({});

  const {
    courses,
    timetableItems,
    isLoading,
    updateTimetable,
    deleteTimetableItem,
  } = useTimetableApi();

  const getColorForCourse = useCallback((courseId: number) => {
    const index = courseId % TIMETABLE_COLORS.length;
    return TIMETABLE_COLORS[index];
  }, []);

  useEffect(() => {
    if (!timetableItems || timetableItems.length === 0) return;

    const newTimetableData: TimetableData = {};

    timetableItems.forEach((item) => {
      const day = DAY_MAPPING[item.day] || item.day.toLowerCase();
      if (!newTimetableData[day]) {
        newTimetableData[day] = {};
      }

      const course = courses.find((c) => c.courseId === item.courseId);
      if (course) {
        newTimetableData[day][item.period] = {
          name: item.courseName || course.courseName,
          color: getColorForCourse(course.courseId),
          type: course.courseType as '공통' | '선택',
          code: course.courseId.toString(),
          semester: course.semester,
          department: course.courseArea,
          description: course.description,
        };
      }
    });

    setTimetableData(newTimetableData);
  }, [courses, timetableItems, getColorForCourse]);

  const handleCourseUpdate = async (
    courseId: number,
    period: number,
    day: string
  ) => {
    await updateTimetable(courseId, period, day);
  };

  const handleCourseDelete = async (period: number, day: string) => {
    await deleteTimetableItem(period, day);
  };

  return {
    courses,
    timetableData,
    loading: isLoading,
    handleCourseUpdate,
    handleCourseDelete,
  };
};

export default useTimetableData;
