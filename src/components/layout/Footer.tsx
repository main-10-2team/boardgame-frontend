export default function Footer() {
  return (
    <footer>
      <div className="bg-linear-to-b from-[#fff] from-20% to-[#e8e8e8] to-70% p-20 text-sm text-gray-600">
        <div className="max-w-[1440px] mx-auto ">
          <div className="mb-6 font-extrabold text-2xl">보드큐</div>
          <p className="text-gray-500">
            보드게임 큐레이션으로
            <br />
            당신의 저녁 라이프를 풍성하게 만들어보세요.
          </p>
          <p className="flex gap-6 mt-8">
            <span>이용약관</span>
            <span>개인정보처리방침</span>
          </p>
          <div className="mt-8 text-gray-400">
            <p>
              대표자: 지정민 | 사업자 등록번호: 123-45-00678 | 통신판매업
              신고번호: 2025-서울성북-00018
            </p>
            <p>
              주소: 서울시 성북구 보드로 87 201호 | 이메일: jgmmt@gmail.com |
              연락처: 070-1234-5678
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
