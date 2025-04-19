/* eslint-disable import/prefer-default-export */
import { ApiResponse } from '@/types/ApiResponse';
import { TSchoolList } from '@/types/data/TSchoolList';
import { NextResponse } from 'next/server';

async function fetchSchoolsData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  const response = await fetch(`${apiUrl}/api/schools`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(60000),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `백엔드 API 호출 실패: ${response.status} ${response.statusText}`
    );
  }

  const data: ApiResponse<TSchoolList> = await response.json();
  return data.data || [];
}

const cacheDuration = 2592000; // 30일

export async function GET() {
  try {
    const schools = await fetchSchoolsData();

    const response = {
      code: 200,
      status: 'OK',
      message: '학교 정보 조회에 성공하였습니다.',
      data: schools,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': `public, max-age=${cacheDuration}, s-maxage=${cacheDuration}`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        code: 500,
        status: 'ERROR',
        message: `학교 정보 조회에 실패하였습니다.${error}`,
        data: null,
      },
      { status: 500 }
    );
  }
}
