'use client';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { useState } from 'react';

const TestPage = () => {
  const [value, setValue] = useState('');
  return <div>
    <Input value={value} onChange={setValue} placeholder='입력하세요' />
    <Button fullWidth size='lg' variant='primary'> {value}
    </Button>
  </div>;
};

export default TestPage;