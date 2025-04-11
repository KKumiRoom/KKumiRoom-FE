import { IconType } from 'react-icons';
import {
  LuCalendarDays,
  LuFileText,
  LuHouse,
  LuSignpost,
} from 'react-icons/lu';

export const PAGE = {
  HOME: 'home',
  TIMETABLE: 'timetable',
  SUBJECT: 'subject',
  ROADMAP: 'roadmap',
} as const;

export type Page = (typeof PAGE)[keyof typeof PAGE];

export interface NavigationItem {
  id: Page;
  label: string;
  icon: IconType;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: PAGE.HOME,
    label: '홈',
    icon: LuHouse,
  },
  {
    id: PAGE.TIMETABLE,
    label: '시간표',
    icon: LuCalendarDays,
  },
  {
    id: PAGE.SUBJECT,
    label: '과목정보',
    icon: LuFileText,
  },
  {
    id: PAGE.ROADMAP,
    label: '진로탐색',
    icon: LuSignpost,
  },
];
