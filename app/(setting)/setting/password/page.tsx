'use client';

import ButtonWithError from '@/components/molecules/ButtonWithError';
import OutlineInput from '@/components/molecules/OutlineInput';
import useUserApi from '@/hooks/useUserApi';
import { useState, useEffect } from 'react';
import { ErrorToast, SuccessToast } from '@/lib/utils/notifications';
import { validatePasswordChange } from '@/lib/validation/passwordValidationRule';

export default function SettingPasswordPage() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState(' ');
  const { updateUserPassword } = useUserApi();

  // 모든 필드의 값이 변경될 때마다 전체 유효성 검사 실행
  useEffect(() => {
    const warningMessage = validatePasswordChange(
      password,
      newPassword,
      newPasswordConfirm
    );
    setErrorMessage(warningMessage);
  }, [password, newPassword, newPasswordConfirm]);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
  };

  const handleNewPasswordConfirmChange = (value: string) => {
    setNewPasswordConfirm(value);
  };

  const handleSubmit = async () => {
    const warningMessage = validatePasswordChange(
      password,
      newPassword,
      newPasswordConfirm
    );
    if (warningMessage) {
      setErrorMessage(warningMessage);
      return;
    }

    try {
      await updateUserPassword(password, newPassword);
      SuccessToast('비밀번호가 변경되었습니다.');

      setPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
      setErrorMessage('');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      ErrorToast(`비밀번호 변경에 실패했습니다.`);
    }
  };

  return (
    <div>
      <h1 className='text-lg font-semibold pt-2 pb-6'>비밀번호 변경</h1>
      <div className='flex flex-col gap-10'>
        <OutlineInput
          onChange={handlePasswordChange}
          value={password}
          label='현재 비밀번호'
          type='password'
          placeholder='현재 비밀번호를 입력하세요'
        />
        <OutlineInput
          onChange={handleNewPasswordChange}
          value={newPassword}
          label='새 비밀번호'
          type='password'
          placeholder='새 비밀번호를 입력하세요'
        />
        <OutlineInput
          onChange={handleNewPasswordConfirmChange}
          value={newPasswordConfirm}
          label='새 비밀번호 확인'
          type='password'
          placeholder='새 비밀번호를 다시 한번 입력하세요'
        />
      </div>
      <ButtonWithError errorMessage={errorMessage} onClick={handleSubmit} />
    </div>
  );
}
