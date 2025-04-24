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
  onEdit?: () => void;
}

const SubjectModal = ({
  subject,
  isOpen,
  onClose,
  onDelete,
  onEdit,
}: SubjectModalProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  useEffect(() => {
    setInternalIsOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setInternalIsOpen(false);
    onClose();
  };

  const handleDelete = () => {
    setInternalIsOpen(false);
    if (onDelete) {
      onDelete();
    }
    onClose();
  };

  const handleEdit = () => {
    setInternalIsOpen(false);
    if (onEdit) {
      onEdit();
    }
    onClose();
  };

  const modalFooter = (
    <div className='flex gap-4 justify-between w-full mx-2'>
      <Button fullWidth onClick={handleDelete} variant='gray'>
        삭제
      </Button>
      {onEdit && (
        <Button fullWidth onClick={handleEdit} variant='secondary'>
          수정
        </Button>
      )}
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
