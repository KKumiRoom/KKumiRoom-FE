import {
  idAtom,
  passwordAtom,
  passwordCheckAtom,
} from '@/atoms/register/registerForm';
import TitleInput from '@/components/molecules/TitleInput';
import useRegisterField from '@/hooks/useRegisterField';

function RegisterAuth() {
  const [id, setId] = useRegisterField(idAtom);
  const [password, setPassword] = useRegisterField(passwordAtom);
  const [passwordCheck, setPasswordCheck] = useRegisterField(passwordCheckAtom);

  return (
    <div className='flex flex-col gap-4'>
      <TitleInput
        title='아이디'
        value={id}
        onChange={setId}
        placeholder='아이디를 입력하세요'
      />
      <TitleInput
        title='비밀번호'
        type='password'
        value={password}
        onChange={setPassword}
        placeholder='8자 이상 입력하세요'
      />
      <TitleInput
        title='비밀번호 확인'
        type='password'
        value={passwordCheck}
        onChange={setPasswordCheck}
        placeholder='비밀번호를 한번 더 입력하세요'
      />
    </div>
  );
}

export default RegisterAuth;
