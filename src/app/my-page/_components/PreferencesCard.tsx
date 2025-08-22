import WordCloud from '@/app/my-page/_components/WordCloud';

interface PreferencesCardProps {
  userProfile: {
    name: string;
    popular_genres: string[];
    percentile?: number;
    tier?: string;
  };
}

const percentile = 73;
const tier = '보드게임 비기너';

export default function PreferencesCard({ userProfile }: PreferencesCardProps) {
  return (
    <>
      <div className="bg-primary-100 flex flex-1 flex-col justify-center rounded-2xl p-6 text-2xl text-gray-800 lg:col-span-4">
        <span className="font-semibold">
          {userProfile.name} 님은
          <span className="text-primary-400 ml-1">상위 {percentile}%</span>,
        </span>
        <span className="mt-2 font-bold text-black">{tier}!</span>
      </div>
      <div className="border-primary-400 min-w-0 flex-1 rounded-2xl border p-6 lg:col-span-5">
        <p className="mb-2 text-2xl font-semibold text-gray-800">취향 키워드</p>
        <div className="relative h-[200px] w-full max-w-full overflow-hidden">
          <WordCloud popularKeywords={userProfile.popular_genres} />
        </div>
      </div>
    </>
  );
}
