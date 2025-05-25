import { useDataMutation } from './useFetch';

interface UpdateInterestMajorRequest {
  majorName: string;
}

interface UpdateUserSchoolRequest {
  schoolId: number;
  classNum: string;
  grade: string;
}

interface UpdateUserProfileRequest {
  userName: string;
  birth: string;
  phone: string;
  address: string;
  imageUrl: string;
}

interface UpdateUserPasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * 사용자 관련 API 호출을 위한 커스텀 훅
 */
export default function useUserApi() {
  const { create } = useDataMutation();

  /**
   * 사용자의 관심학과를 업데이트하는 함수
   * @param majorName 변경할 학과 이름
   */
  const updateInterestMajor = async (majorName: string) => {
    const body: UpdateInterestMajorRequest = { majorName };
    return create<UpdateInterestMajorRequest, void>('/api/users/major', body);
  };

  const updateUserSchool = async (
    schoolId: number,
    classNum: string,
    grade: string
  ) => {
    const body: UpdateUserSchoolRequest = { schoolId, classNum, grade };
    return create<UpdateUserSchoolRequest, void>('/api/users/school', body);
  };

  const updateUserProfile = async (
    userName: string,
    birth: string,
    phone: string,
    address: string,
    imageUrl: string
  ) => {
    const body: UpdateUserProfileRequest = {
      userName,
      birth,
      phone,
      address,
      imageUrl,
    };
    return create<UpdateUserProfileRequest, void>('/api/users/me', body);
  };

  const updateUserPassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const body: UpdateUserPasswordRequest = {
      currentPassword,
      newPassword,
    };
    return create<UpdateUserPasswordRequest, void>('/api/users/password', body);
  };

  return {
    updateInterestMajor,
    updateUserSchool,
    updateUserProfile,
    updateUserPassword,
  };
}
