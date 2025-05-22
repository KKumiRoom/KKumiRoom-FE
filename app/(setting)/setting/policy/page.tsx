export default function SettingPolicyPage() {
  return (
    <div>
      <h1 className='text-lg font-semibold pt-2 pb-6'>개인정보 보호정책</h1>
      <div>
        <h2 className='text-lg'>1. 개인정보 수집 및 이용 목적</h2>
        <ul className='list-disc ml-5'>
          <li>회원 가입 및 관리: 본인 확인, 회원제 서비스 이용, 고객 상담</li>
          <li>서비스 제공: 맞춤형 콘텐츠 제공, 앱 기능 개선 및 오류 분석</li>
          <li>
            마케팅 및 광고 활용(선택 동의 시): 이벤트 안내, 광고성 정보 제공
          </li>
        </ul>
        <p>
          수집하는 개인정보 항목은 [이름, 이메일, 주소, 휴대전화번호, 서비스
          이용 기록 등]입니다.
        </p>

        <h2 className='text-lg mt-4'>2. 개인정보 보유 및 이용 기간</h2>
        <ul className='list-disc ml-5'>
          <li>회원 정보: 회원 탈퇴 시까지</li>
          <li>
            법령에 따른 보관: 전자상거래 등에서의 소비자 보호에 관한 법률에 따라
            거래기록 5년 보관
          </li>
        </ul>
        <p>
          수집된 개인정보는 원칙적으로 목적 달성 시 또는 회원 탈퇴 시 즉시
          파기합니다. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당
          기간 동안 안전하게 보관 후 파기합니다.
        </p>

        <h2 className='text-lg mt-4'>3. 개인정보 처리 및 안전성 확보</h2>
        <ul className='list-disc ml-5'>
          <li>개인정보 접근 제한 및 교육</li>
          <li>개인정보 암호화 저장</li>
          <li>해킹 등 외부 침입에 대비한 보안 시스템 운영</li>
          <li>개인정보 취급 직원의 최소화 및 정기 교육</li>
        </ul>

        <h2 className='text-lg mt-4'>4. 정보주체의 권리 및 행사 방법</h2>
        <p>
          이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지
          요청을 할 수 있습니다.
          <br />
          권리 행사는 앱 내 [설정 &gt; 개인정보 관리] 메뉴 또는 고객센터(
          <a href='mailto:somea82@gmail.com' className='text-primary underline'>
            somea82@gmail.com
          </a>
          )를 통해 신청하실 수 있습니다.
        </p>

        <h2 className='text-lg mt-4'>5. 개인정보 파기</h2>
        <ul className='list-disc ml-5'>
          <li>전자적 파일: 복구 불가능한 방법으로 삭제</li>
          <li>종이 문서: 분쇄 또는 소각</li>
        </ul>
        <p>
          개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우, 해당 정보를
          지체 없이 안전한 방법으로 파기합니다.
        </p>

        <h2 className='text-lg mt-4'>6. 개인정보 처리 위탁</h2>
        <p>
          서비스 운영을 위해 일부 개인정보 처리를 외부에 위탁할 수 있습니다.
          위탁받는 자(수탁자)와 위탁 업무 내용은 아래와 같습니다.
        </p>
        <ul className='list-disc ml-5'>
          <li>수탁자: [예시] Amazon Web Services, Google Firebase 등</li>
          <li>위탁 업무: 데이터 저장 및 관리, 고객 상담 시스템 운영 등</li>
        </ul>

        <h2 className='text-lg mt-4'>7. 개인정보의 제3자 제공</h2>
        <p>
          본 앱은 이용자의 동의 없이는 개인정보를 외부에 제공하지 않습니다. 단,
          법령에 따라 제공이 필요한 경우에는 관련 법령에 따라 처리합니다.
        </p>

        <h2 className='text-lg mt-4'>8. 쿠키 및 행태정보 수집 안내</h2>
        <p>
          본 앱은 서비스 이용 분석 및 맞춤형 서비스 제공을 위해 쿠키 등
          행태정보를 수집할 수 있습니다. 쿠키 수집을 원하지 않을 경우, 브라우저
          설정을 통해 거부할 수 있습니다.
        </p>

        <h2 className='text-lg mt-4'>9. 개인정보 보호책임자 및 문의처</h2>
        <p>
          개인정보 보호책임자: [문규빈] <br />
          연락처:{' '}
          <a href='mailto:somea82@gmail.com' className='text-primary underline'>
            somea82@gmail.com
          </a>
        </p>

        <h2 className='text-lg mt-4'>
          10. 개인정보 처리방침 공개 및 변경 안내
        </h2>
        <p>
          본 개인정보처리방침은 앱 내 [설정 &gt; 개인정보보호정책] 메뉴 및
          <a
            href='https://www.example.com/setting/policy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary underline'
          >
            홈페이지
          </a>
          에서 언제든지 확인하실 수 있습니다. 정책 변경 시에는 앱 내 공지사항
          또는 팝업을 통해 안내해 드립니다.
        </p>
      </div>
    </div>
  );
}
