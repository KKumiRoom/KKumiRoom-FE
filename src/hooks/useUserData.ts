import { TUserResponse, TUser } from '@/types';
import { ApiResponse } from '@/types/ApiResponse';
import { useData } from './useFetch';

/**
 * 사용자 정보를 가져오는 커스텀 훅
 *
 * @returns 변환된 사용자 정보와 로딩 상태
 */
export default function useUserData() {
  const { data: userData, isLoading } = useData<ApiResponse<TUserResponse>>(
    '/api/openapi/users/me'
  );

  // 사용자 정보 변환
  const user: TUser = userData?.data
    ? {
        name: userData.data.userName,
        profileImage: '/images/user.png',
        birthDate: userData.data.birth,
        phoneNumber: userData.data.phone,
        address: userData.data.address,
        interestMajor: userData.data.interestMajor,
        school: {
          schoolId: userData.data.school.schoolId,
          name: userData.data.school.schoolName,
          homepage: userData.data.school.homepage,
        },
        grade: `${userData.data.grade}학년`,
        class: `${userData.data.classNum}반`,
      }
    : {
        name: '',
        profileImage: '',
        birthDate: '',
        phoneNumber: '',
        address: '',
        interestMajor: null,
        school: {
          schoolId: 1,
          name: '',
          homepage: '',
        },
        grade: '',
        class: '',
      };

  return { user, isLoading };
}
