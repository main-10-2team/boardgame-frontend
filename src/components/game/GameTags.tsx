import { formatDifficulty } from '@/utils/formatDifficulty';
import Link from 'next/link';
import { GameTag } from './GameTag';

interface GameTagsProps {
  genre_name: string;
  min_players?: number;
  max_players?: number;
  playtime_minutes?: number;
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
  playtime_minutes,
  isOverlay = false,
  isLink = false,
  size = 'sm',
}: GameTagsProps) {
  const tags = [
    { label: genre_name, href: `/games?genre=${genre_name}` },
    {
      label: `${min_players && max_players ? `${min_players}~${max_players}인용` : ''}`,
      href: `/games?players=${min_players}~${max_players}`,
    },
    {
      label: `${playtime_minutes ? `${playtime_minutes}분` : ''}`,
      href: `/games?playtime=${playtime_minutes ? `${playtime_minutes}분` : null}`,
    },
    {
      label: `${difficulty ? `${'난이도_' + formatDifficulty(difficulty)}` : ''}`,
      href: `/games?difficulty=${difficulty ? formatDifficulty(difficulty) : null}`,
    },
  ];

  if (isLink) {
    return (
      <>
        {tags.map((tag, idx) => {
          if (tag.label === null || tag.label === '') return null;
          return (
            <Link href={tag.href} key={`tag-${idx}`}>
              <GameTag tagLabel={tag.label} isOverlay={isOverlay} size={size} />
            </Link>
          );
        })}
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
