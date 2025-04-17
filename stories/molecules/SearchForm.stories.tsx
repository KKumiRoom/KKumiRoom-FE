import SearchForm from '@/components/molecules/SearchForm';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// 상태를 관리하는 래퍼 컴포넌트
const SearchFormWithState = ({
  initialValue = '',
  placeholder = '검색어를 입력하세요',
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  // onSearch는 인자를 받지 않음 (SearchForm 인터페이스 참조)
  const handleSearch = () => {
    console.log('검색:', value);
  };

  return (
    <SearchForm
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      placeholder={placeholder}
    />
  );
};

// CSF 3.0 형식의 메타데이터 정의
const meta = {
  title: 'Molecules/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// SearchForm 컴포넌트는 상태를 관리하지 않아 args만으로는 동작하지 않음
// Storybook에서는 render 함수를 사용하여 상태 관리 컴포넌트를 렌더링해야 함
// 그러나 args도 필요하여 빈 객체로 설정

// 기본 검색폼 스토리
export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: '검색어를 입력하세요',
  },
  render: function Render(args) {
    return <SearchFormWithState />;
  },
};

// 입력값이 있는 검색폼 스토리
export const WithValue: Story = {
  args: {
    value: '초기 검색어',
    onChange: () => {},
    placeholder: '검색어를 입력하세요',
  },
  render: function Render(args) {
    return <SearchFormWithState initialValue={args.value} />;
  },
};

// 사용자 정의 플레이스홀더가 있는 검색폼 스토리
export const CustomPlaceholder: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: '과목명을 입력하세요',
  },
  render: function Render(args) {
    return <SearchFormWithState placeholder={args.placeholder} />;
  },
};
