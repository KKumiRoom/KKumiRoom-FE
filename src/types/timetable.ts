export type SubjectType = '공통' | '선택';

export type DayType = '월' | '화' | '수' | '목' | '금';
export type DayEnumType = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

export const DAY_MAPPING: Record<DayType, DayEnumType> = {
  월: 'MON',
  화: 'TUE',
  수: 'WED',
  목: 'THU',
  금: 'FRI',
};

export interface Course {
  courseId: number;
  courseName: string;
  courseType: string;
  courseArea: string;
  semester: string;
  description: string;
  maxStudents: number;
  createdAt: string;
}

export interface TimetableSubject {
  name: string;
  color: string;
  type: SubjectType;
  code: string;
  semester: string;
  department: string;
  description: string;
}

export interface TimetableData {
  [day: string]: {
    [period: string]: TimetableSubject;
  };
}

export interface TimeTableUpdateRequest {
  courseId: number;
  period: number;
  day: DayEnumType;
}

export const TIMETABLE_COLORS = [
  'bg-red-100',
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-purple-100',
  'bg-pink-100',
  'bg-indigo-100',
  'bg-orange-100',
] as const;

export type TimetableColor = (typeof TIMETABLE_COLORS)[number];
