import Timetable from '@/components/organisms/Timetable';
import { TimetableData, TimetableSubject } from '@/types/timetable';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// 샘플 시간표 데이터 (추가 정보 포함)
const sampleData: TimetableData = {
  월: {
    '1': {
      name: '국어',
      color: 'bg-red-100',
      type: '공통',
      teacher: '김선생',
      semester: '1학기',
      department: '인문계열',
      description: '국어 기본 문법과 문학 작품을 학습합니다.',
    },
    '2': {
      name: '수학',
      color: 'bg-blue-100',
      type: '공통',
      teacher: '이선생',
      semester: '1학기',
      department: '자연계열',
      description: '수학 기본 개념과 연산을 학습합니다.',
    },
    '4': {
      name: '영어',
      color: 'bg-green-100',
      type: '공통',
      teacher: '박선생',
      semester: '1학기',
      department: '인문계열',
      description: '영어 회화와 문법을 학습합니다.',
    },
  },
  화: {
    '2': {
      name: '과학',
      color: 'bg-yellow-100',
      type: '공통',
      teacher: '정선생',
      semester: '1학기',
      department: '자연계열',
      description: '물리, 화학, 생물, 지구과학의 기초를 학습합니다.',
    },
    '3': {
      name: '체육',
      color: 'bg-purple-100',
      type: '선택',
      teacher: '최선생',
      semester: '1학기',
      department: '예체능계열',
      description: '다양한 스포츠 활동과 체력 증진을 위한 수업입니다.',
    },
    '5': {
      name: '음악',
      color: 'bg-pink-100',
      type: '선택',
      teacher: '송선생',
      semester: '1학기',
      department: '예체능계열',
      description: '다양한 장르의 음악을 감상하고 실습합니다.',
    },
  },
  수: {
    '1': {
      name: '사회',
      color: 'bg-indigo-100',
      type: '공통',
      teacher: '강선생',
      semester: '1학기',
      department: '인문계열',
      description: '역사와 사회 현상에 대해 학습합니다.',
    },
    '6': {
      name: '미술',
      color: 'bg-orange-100',
      type: '선택',
      teacher: '홍선생',
      semester: '1학기',
      department: '예체능계열',
      description: '다양한 미술 기법을 배우고 작품을 제작합니다.',
    },
  },
  목: {
    '3': {
      name: '국어',
      color: 'bg-red-100',
      type: '공통',
      teacher: '김선생',
      semester: '1학기',
      department: '인문계열',
      description: '국어 기본 문법과 문학 작품을 학습합니다.',
    },
    '4': {
      name: '수학',
      color: 'bg-blue-100',
      type: '공통',
      teacher: '이선생',
      semester: '1학기',
      department: '자연계열',
      description: '수학 기본 개념과 연산을 학습합니다.',
    },
    '7': {
      name: '영어',
      color: 'bg-green-100',
      type: '공통',
      teacher: '박선생',
      semester: '1학기',
      department: '인문계열',
      description: '영어 회화와 문법을 학습합니다.',
    },
  },
  금: {
    '1': {
      name: '과학',
      color: 'bg-yellow-100',
      type: '공통',
      teacher: '정선생',
      semester: '1학기',
      department: '자연계열',
      description: '물리, 화학, 생물, 지구과학의 기초를 학습합니다.',
    },
    '2': {
      name: '사회',
      color: 'bg-indigo-100',
      type: '공통',
      teacher: '강선생',
      semester: '1학기',
      department: '인문계열',
      description: '역사와 사회 현상에 대해 학습합니다.',
    },
    '8': {
      name: '진로',
      color: 'bg-teal-100',
      type: '선택',
      teacher: '윤선생',
      semester: '1학기',
      department: '공통교양',
      description: '진로 탐색과 미래 계획을 수립하는 수업입니다.',
    },
  },
};

// 빈 시간표 데이터
const emptyData: TimetableData = {
  월: {},
  화: {},
  수: {},
  목: {},
  금: {},
};

// 시간표 상호작용을 위한 래퍼 컴포넌트
interface TimetableWithInteractionProps {
  initialData: TimetableData;
  days: string[];
  periods: number;
}

const TimetableWithInteraction = ({
  initialData,
  days,
  periods,
}: TimetableWithInteractionProps) => {
  const [data, setData] = useState<TimetableData>(initialData);

  const handleDeleteSubject = (day: string, period: number) => {
    setData((prev) => {
      const newData = { ...prev };
      // 해당 요일의 해당 교시 과목 삭제
      if (newData[day] && newData[day][period.toString()]) {
        const newDayData = { ...newData[day] };
        delete newDayData[period.toString()];
        newData[day] = newDayData;
      }
      return newData;
    });
  };

  return (
    <Timetable
      data={data}
      days={days}
      periods={periods}
      onDeleteSubject={handleDeleteSubject}
    />
  );
};

// CSF 3.0 형식의 메타데이터 정의
const meta = {
  title: 'Organisms/Timetable', // 디렉토리 경로 수정
  component: Timetable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Timetable>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 시간표 스토리
export const Default: Story = {
  args: {
    data: sampleData,
    days: ['월', '화', '수', '목', '금'],
    periods: 8,
  },
};

// 빈 시간표 스토리
export const Empty: Story = {
  args: {
    data: emptyData,
    days: ['월', '화', '수', '목', '금'],
    periods: 8,
  },
};

// 주말을 포함한 시간표 스토리
export const WeekendIncluded: Story = {
  args: {
    data: {
      ...sampleData,
      토: {
        '2': {
          name: '보충수업',
          color: 'bg-gray-100',
          type: '선택',
          teacher: '윤선생',
          semester: '1학기',
          department: '공통교양',
          description: '부족한 과목을 보충하는 수업입니다.',
        },
      },
      일: {},
    },
    days: ['월', '화', '수', '목', '금', '토', '일'],
    periods: 8,
  },
};

// 4교시까지만 표시하는 시간표 스토리
export const FourPeriodsOnly: Story = {
  args: {
    data: sampleData,
    days: ['월', '화', '수', '목', '금'],
    periods: 4,
  },
};

// 과목 삭제 기능이 있는 시간표 스토리
export const WithInteraction: Story = {
  args: {
    // empty args to satisfy TypeScript, but we'll use the render function
    data: {} as TimetableData,
    days: [],
    periods: 0,
  },
  render: function Render() {
    return (
      <TimetableWithInteraction
        initialData={sampleData}
        days={['월', '화', '수', '목', '금']}
        periods={8}
      />
    );
  },
};
