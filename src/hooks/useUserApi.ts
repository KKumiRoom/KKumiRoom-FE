import { useDataMutation } from './useFetch';

interface UpdateInterestMajorRequest {
  majorName: string;
}

/**
 * 사용자 관련 API 호출을 위한 커스텀 훅
 */
export function useUserApi() {
  const { create } = useDataMutation();

  /**
   * 사용자의 관심학과를 업데이트하는 함수
   * @param majorName 변경할 학과 이름
   */
  const updateInterestMajor = async (majorName: string) => {
    const body: UpdateInterestMajorRequest = { majorName };
    return create<UpdateInterestMajorRequest, void>('/api/users/major', body);
  };

  return {
    updateInterestMajor,
  };
}
