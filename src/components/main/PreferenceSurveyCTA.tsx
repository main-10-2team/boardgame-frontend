import Image from 'next/image';
import Link from 'next/link';

export default function PreferenceSurveyCTA() {
  return (
    <Link href={'/preference'} className="block w-full">
      <section className="border-primary-300 relative flex items-center justify-between overflow-hidden rounded-2xl border bg-gradient-to-r from-[#FFE6FA] via-[#A1DCE4] to-[#D7FFAC] p-6 text-sm">
        <div>
          <p className="mb-1 text-lg font-semibold">
            보드게임도 <span className="text-primary-400">취향</span>이 있다면
            더 재밌죠?
          </p>
          <p className="text-sm text-gray-700">
            간단한 질문 몇 개로 <br />
            당신만의 플레이 스타일을 찾아드릴게요.
          </p>
        </div>
        <Image
          src="/images/preferenceBannerImg.png"
          alt="preference Img"
          className="absolute right-0 hidden max-w-[45%] object-contain md:block"
          width={309}
          height={253}
          priority
        />
      </section>
    </Link>
  );
}
