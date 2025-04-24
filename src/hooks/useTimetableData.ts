import { Course, TIMETABLE_COLORS, TimetableData } from '@/types/timetable';
import { useState, useEffect, useCallback } from 'react';
import useTimetableApi from './useTimetableApi';

// API 응답의 요일을 한글 요일로 매핑
const DAY_MAPPING: { [key: string]: string } = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
};

interface TimetableItem {
  courseId: number;
  period: number;
  day: string;
  semester: string;
}

const useTimetableData = (schoolId: string, timetableId: number) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [timetableData, setTimetableData] = useState<TimetableData>({});
  const [loading, setLoading] = useState(true);

  const { fetchCourses, fetchTimetable, updateTimetable, deleteTimetableItem } =
    useTimetableApi();

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * TIMETABLE_COLORS.length);
    return TIMETABLE_COLORS[randomIndex];
  };

  const loadCourses = useCallback(async () => {
    const coursesData = await fetchCourses(schoolId);
    setCourses(coursesData);
    setLoading(false);
  }, [fetchCourses, schoolId]);

  const loadTimetable = useCallback(async () => {
    if (courses.length === 0) return;

    const timetableItems = await fetchTimetable(timetableId);
    const newTimetableData: TimetableData = {};

    timetableItems.forEach((item: TimetableItem) => {
      const day = DAY_MAPPING[item.day] || item.day.toLowerCase();
      if (!newTimetableData[day]) {
        newTimetableData[day] = {};
      }

      const course = courses.find((c) => c.courseId === item.courseId);
      if (course) {
        newTimetableData[day][item.period.toString()] = {
          name: course.courseName,
          color: getRandomColor(),
          type: course.courseType as '공통' | '선택',
          code: course.courseId.toString(),
          semester: item.semester,
          department: course.courseArea,
          description: course.description,
        };
      }
    });

    setTimetableData(newTimetableData);
  }, [courses, fetchTimetable, timetableId]);

  const handleCourseUpdate = async (
    courseId: number,
    period: number,
    day: string
  ) => {
    const success = await updateTimetable(timetableId, courseId, period, day);
    if (success) {
      const course = courses.find((c) => c.courseId === courseId);
      if (course) {
        setTimetableData((prev) => {
          const newData = { ...prev };
          if (!newData[day]) {
            newData[day] = {};
          }
          newData[day][period.toString()] = {
            name: course.courseName,
            color: getRandomColor(),
            type: course.courseType as '공통' | '선택',
            code: course.courseId.toString(),
            semester: '2025',
            department: course.courseArea,
            description: course.description,
          };
          return newData;
        });
      }
    }
  };

  const handleCourseDelete = async (period: number, day: string) => {
    const success = await deleteTimetableItem(timetableId, period, day);
    if (success) {
      setTimetableData((prev) => {
        const newData = { ...prev };
        if (newData[day]) {
          delete newData[day][period.toString()];
        }
        return newData;
      });
    }
  };

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    if (courses.length > 0) {
      loadTimetable();
    }
  }, [courses, loadTimetable]);

  return {
    courses,
    timetableData,
    loading,
    handleCourseUpdate,
    handleCourseDelete,
  };
};

export default useTimetableData;
