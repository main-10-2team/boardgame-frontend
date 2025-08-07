import { formatDifficulty } from '@/utils/formatDifficulty';
import Link from 'next/link';
import { GameTag } from './GameTag';

interface GameTagsProps {
  genre_name: string;
  min_players: number;
  max_players: number;
  difficulty: number | null;
  isOverlay?: boolean;
  isLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function GameTags({
  genre_name,
  min_players,
  max_players,
  difficulty,
  isOverlay = false,
  isLink = false,
  size = 'sm',
}: GameTagsProps) {
  const tags = [
    { label: genre_name, href: `/games?genre=${genre_name}` },
    {
      label: `${min_players}~${max_players}인용`,
      href: `/games?players=${min_players}~${max_players}`,
    },
    {
      label: `난이도_${difficulty ? formatDifficulty(difficulty) : '알수없음'}`,
      href: `/games?difficulty=${difficulty ? formatDifficulty(difficulty) : '알수없음'}`,
    },
  ];

  if (isLink) {
    return (
      <>
        {tags.map((tag, idx) => (
          <Link href={tag.href} key={`tag-${idx}`}>
            <GameTag tagLabel={tag.label} isOverlay={isOverlay} size={size} />
          </Link>
        ))}
      </>
    );
  }
  return (
    <>
      {tags.map((tag, idx) => (
        <GameTag
          key={`tag-${idx}`}
          tagLabel={tag.label}
          isOverlay={isOverlay}
          size={size}
        />
      ))}
    </>
  );
}
