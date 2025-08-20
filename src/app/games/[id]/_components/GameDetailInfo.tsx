'use client';
import { GameDetail } from '@/types/game/game';
import { formatDifficulty } from '@/utils/formatDifficulty';

interface GameDetailInfoProps {
  game: GameDetail;
}
export default function GameDetailInfo({ game }: GameDetailInfoProps) {
  const { min_players, max_players, difficulty, play_time, genre, age } = game;

  const gameDetailInfo = [
    {
      label: '플레이 인원',
      value: `${min_players}~${max_players}인`,
    },
    {
      label: '난이도',
      value: formatDifficulty(difficulty),
    },
    {
      label: '플레이 시간',
      value: play_time ? `${play_time}` : '알수없음',
    },
    {
      label: '장르',
      value: genre || '알수없음',
    },
    {
      label: '권장 연령',
      value: age ? `${age}세 이상` : '알수없음',
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
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, index) => (
                <span
                  key={index}
                  className={`h-4 w-4 rounded-full ${index < Number(info.value) ? 'bg-primary-500' : 'border-primary-200 border bg-white'} `}
                />
              ))}
              <span className="text-md ml-2 font-medium">{difficulty}</span>
            </div>
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
