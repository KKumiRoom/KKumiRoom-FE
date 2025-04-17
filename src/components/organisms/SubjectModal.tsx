'use client';

import { TimetableSubject } from '@/types/timetable';
import { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import Modal from '../molecules/Modal';
import SubjectDetails from '../molecules/SubjectDetails';

interface SubjectModalProps {
  subject: TimetableSubject;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

const SubjectModal = ({
  subject,
  isOpen,
  onClose,
  onDelete,
}: SubjectModalProps) => {
  // 내부적으로 모달 상태 관리
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  // 외부 isOpen prop이 변경되면 내부 상태 동기화
  useEffect(() => {
    setInternalIsOpen(isOpen);
  }, [isOpen]);

  // 내부적으로 모달 닫기
  const handleClose = () => {
    setInternalIsOpen(false);
    onClose();
  };

  // 내부적으로 삭제 처리 및 모달 닫기
  const handleDelete = () => {
    setInternalIsOpen(false);
    if (onDelete) {
      onDelete();
    }
    onClose();
  };

  const modalFooter = (
    <div className='flex gap-4 justify-between w-full mx-2'>
      <Button fullWidth onClick={handleDelete} variant='gray'>
        삭제
      </Button>
      <Button fullWidth onClick={handleClose} variant='primary'>
        닫기
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={internalIsOpen}
      onClose={handleClose}
      title={subject.name}
      headerClassName={subject.color}
      footer={modalFooter}
      size='lg'
    >
      <SubjectDetails subject={subject} />
    </Modal>
  );
};

export default SubjectModal;
