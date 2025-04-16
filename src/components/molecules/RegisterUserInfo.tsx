import {
  nameAtom,
  birthdayAtom,
  formattedPhoneAtom,
  addressAtom,
} from '@/atoms/register/registerForm';
import TitleInput from '@/components/molecules/TitleInput';
import useRegisterField from '@/hooks/useRegisterField';

function RegisterUserInfo() {
  const [name, setName] = useRegisterField(nameAtom);
  const [birthday, setBirthday] = useRegisterField(birthdayAtom);
  const [phone, setPhone] = useRegisterField(formattedPhoneAtom);
  const [address, setAddress] = useRegisterField(addressAtom);

  return (
    <div className='flex flex-col gap-4'>
      <TitleInput
        title='이름'
        value={name}
        onChange={setName}
        placeholder='이름을 입력하세요'
      />
      <TitleInput
        title='생년월일'
        type='date'
        value={birthday}
        onChange={setBirthday}
        placeholder='YYYY-MM-DD'
      />
      <TitleInput
        title='전화번호'
        value={phone}
        onChange={setPhone}
        placeholder='숫자만 입력하세요'
      />
      <TitleInput
        title='주소'
        value={address}
        onChange={setAddress}
        placeholder='주소를 입력하세요'
      />
    </div>
  );
}

export default RegisterUserInfo;
