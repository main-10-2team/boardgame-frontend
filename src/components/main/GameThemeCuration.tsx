import Image from 'next/image';
import Link from 'next/link';

const contents = [
  {
    title: '입문자 추천',
    description: '처음 시작하기 좋은 쉽고 재미있는 게임들',
    imageUrl: '/images/main/img_curation01.png',
    link: '/games?theme=beginner',
  },
  {
    title: '2인 전용',
    description: '연인, 친구와 둘이서 즐기기 좋은 게임',
    imageUrl: '/images/main/img_curation02.png',
    link: '/games?theme=family',
  },
  {
    title: '파티게임',
    description: '여러명이 함께 웃으며 즐길수 있는 게임',
    imageUrl: '/images/main/img_curation03.png',
    link: '/games?theme=family',
  },
  {
    title: '전략가 추천',
    description: '깊이 있는 전략과 사고가 필요한 게임',
    imageUrl: '/images/main/img_curation04.png',
    link: '/games?theme=family',
  },
];

export default function GameThemeCuration() {
  return (
    <div className="inner">
      <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
        어떤 게임을 찾으시나요?
      </h2>
      <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-200 lg:grid-cols-4">
        {contents.map((content, index) => (
          <Link key={index} href={content.link} className="cursor-pointer">
            <div className="hover:border-primary-100 hover:drop-shadow-primary-200 flex items-center gap-4 rounded-2xl border border-transparent bg-white px-8 py-4 drop-shadow-xl drop-shadow-transparent transition-all md:flex-col md:flex-wrap md:gap-0 md:rounded-4xl">
              {' '}
              <Image
                src={content.imageUrl}
                alt={`${content.title} Img`}
                width={100}
                height={100}
                className="h-auto w-[80px] md:w-[100px]"
                priority
              />
              <div className="text-left md:text-center">
                <h4 className="mb-1 text-base font-semibold text-black">
                  {content.title}
                </h4>
                <p className="text-xs text-gray-500">{content.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
