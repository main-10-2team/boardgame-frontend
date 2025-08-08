import StarRating from '@/components/common/StarRating';
import { GameData } from '@/types/game/game';
import { formatDate } from '@/utils/formatDate';

interface GameDetailInfoProps {
  game: GameData;
}
export default function GameDetailInfo({ game }: GameDetailInfoProps) {
  const {
    min_players,
    max_players,
    difficulty,
    playtime_max_minutes,
    playtime_min_minutes,
    genre_name,
    age,
    created_at,
  } = game;

  const gameDetailInfo = [
    {
      label: '플레이 인원',
      value: `${min_players}~${max_players}인`,
    },
    {
      label: '난이도',
      value: difficulty || '알수없음',
    },
    {
      label: '플레이 시간',
      value: playtime_min_minutes
        ? `${playtime_min_minutes}분 ~ ${playtime_max_minutes}분`
        : '알수없음',
    },
    {
      label: '장르',
      value: genre_name || '알수없음',
    },
    {
      label: '권장 연령',
      value: `${age}세 이상` || '알수없음',
    },
    {
      label: '출시년도',
      value: formatDate(created_at) || '알수없음',
    },
  ];

  return (
    <ul className="space-y-2">
      {gameDetailInfo.map((info) => (
        <li
          key={info.label + info.value}
          className="bg-primary-50 even:bg-primary-100 flex justify-between rounded-2xl px-6 py-3"
        >
          <span className="text-gray-600">{info.label}</span>

          {info.label === '난이도' ? (
            <StarRating value={info.value as number} readOnly={true} />
          ) : (
            <span className="text-lg font-medium text-gray-900">
              {info.value}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
