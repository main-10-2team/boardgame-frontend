interface ActivityStatsProps {
  userProfile: {
    review_count: number;
    like_count: number;
    created_at: string;
  };
}

function formatDateToKorean(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default function ActivityStats({ userProfile }: ActivityStatsProps) {
  return (
    <div className="flex-col gap-6 text-sm">
      <h3 className="mb-4 text-2xl font-semibold">내 활동</h3>
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <span className="text-gray-500">리뷰수</span>
        <span className="font-semibold">{userProfile.review_count}</span>

        <span className="text-gray-500">좋아요 수</span>
        <span className="font-semibold">{userProfile.like_count}</span>

        <span className="text-gray-500">가입일</span>
        <span className="font-semibold">
          {formatDateToKorean(userProfile.created_at)}
        </span>
      </div>
    </div>
  );
}
