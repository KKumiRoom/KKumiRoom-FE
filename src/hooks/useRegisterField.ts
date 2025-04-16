import { WritableAtom, useAtom } from 'jotai';
import { useCallback } from 'react';

/**
 * 회원가입 폼 필드 atom을 쉽게 사용하기 위한 커스텀 훅
 * @param fieldAtom 바인딩할 atom
 * @returns [value, handleChange] 튜플 - handleChange는 문자열만 받는 함수
 */
function useRegisterField(fieldAtom: WritableAtom<string, [string], void>) {
  const [value, setValue] = useAtom(fieldAtom);

  // 문자열만 받는 onChange 함수로 변환
  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
    },
    [setValue]
  );

  return [value, handleChange] as const;
}

export default useRegisterField;
