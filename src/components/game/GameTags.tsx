// GameTags.tsx
import Link from 'next/link';
import { GameTag } from './GameTag';

/** 구버전(v1) props */
interface GameTagsV1Props {
  genre_name: string;
  min_players?: number;
  max_players?: number;
  difficulty: number | null;
  isOverlay?: boolean;
  isLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/** 신버전(v2) props */
interface GameTagsV2Props {
  category: string;
  genre: string;
  difficulty: string;
  isOverlay?: boolean;
  isLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/** 통합 시그니처: v1 또는 v2를 모두 허용 */
type GameTagsProps = GameTagsV1Props | GameTagsV2Props;

type Tag = { label: string; href: string };

function buildTags(props: GameTagsProps): Tag[] {
  // 공통 옵션
  const size = (props.size ?? 'sm') as 'sm' | 'md' | 'lg';
  void size; // (뷰에서 사용)

  // v2 경로: genre/category/difficulty(문자열)
  if ('genre' in props && 'category' in props) {
    const genre = (props.genre ?? '').toString().trim();
    const category = (props.category ?? '').toString().trim();
    const difficulty = (props.difficulty ?? '').toString().trim();

    return [
      {
        label: genre ? `${genre}` : '',
        href: `/games?genre=${encodeURIComponent(genre)}`,
      },
      {
        label: category ? `${category}` : '',
        href: `/games?category=${encodeURIComponent(category)}`,
      },
      {
        label: difficulty ? `난이도_${difficulty}` : '',
        href: `/games?difficulty=${encodeURIComponent(difficulty)}`,
      },
    ];
  }

  // v1 경로: genre_name / min~max / difficulty(number|null)
  const genre_name = ('genre_name' in props ? props.genre_name : '')
    ?.toString()
    .trim();
  const min_players =
    'min_players' in props && typeof props.min_players === 'number'
      ? props.min_players
      : undefined;
  const max_players =
    'max_players' in props && typeof props.max_players === 'number'
      ? props.max_players
      : undefined;

  const diffLabel =
    'difficulty' in props && props.difficulty != null
      ? props.difficulty
      : '알수없음';

  const playersLabel =
    typeof min_players === 'number' && typeof max_players === 'number'
      ? `${min_players}~${max_players}인용`
      : '';

  return [
    {
      label: genre_name || '',
      href: `/games?genre=${encodeURIComponent(genre_name || '')}`,
    },
    {
      label: playersLabel,
      href: `/games?players=${encodeURIComponent(playersLabel.replace('인용', ''))}`,
    },
    {
      label: `난이도_${diffLabel}`,
      href: `/games?difficulty=${encodeURIComponent(diffLabel)}`,
    },
  ];
}

export default function GameTags(props: GameTagsProps) {
  const isOverlay = props.isOverlay ?? false;
  const isLink = props.isLink ?? false;
  const size = (props.size ?? 'sm') as 'sm' | 'md' | 'lg';

  const tags = buildTags(props).filter((t) => t.label && t.label.length > 0);

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
