/**
 * 사용자 정보 API 응답 타입
 */

/**
 * 학교 정보
 */
export interface TSchoolInfo {
  schoolId: number;
  schoolName: string;
  homepage: string;
}

/**
 * 학과 정보
 */
export interface TMajorInfo {
  majorId: number;
  majorName: string;
  description: string;
  recommendedCourses: string;
}

/**
 * API에서 반환되는 사용자 정보 DTO
 */
export interface TUserResponse {
  userId: number;
  userName: string;
  imageUrl: string;
  birth: string;
  phone: string;
  address: string;
  interestMajor: TMajorInfo | null;
  grade: number;
  classNum: number;
  school: TSchoolInfo;
}
