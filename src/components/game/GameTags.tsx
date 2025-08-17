'use client';
import { buildTags } from '@/utils/buildTags';
import { useRouter } from 'next/navigation';
import { GameTag } from './GameTag';

/** 구버전(v1) props */
export interface GameTagsV1Props {
  genre_name: string;
  min_players?: number;
  max_players?: number;
  difficulty: number | null;
  isOverlay?: boolean;
  isLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/** 신버전(v2) props */
export interface GameTagsV2Props {
  category: string;
  genre: string;
  difficulty: string;
  isOverlay?: boolean;
  isLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/** 통합 시그니처: v1 또는 v2를 모두 허용 */
export type GameTagsProps = GameTagsV1Props | GameTagsV2Props;

export default function GameTags(props: GameTagsProps) {
  const router = useRouter();

  const isOverlay = props.isOverlay ?? false;
  const isLink = props.isLink ?? false;
  const size = (props.size ?? 'sm') as 'sm' | 'md' | 'lg';
  const tags = buildTags(props).filter((t) => t.label && t.label.length > 0);

  if (isLink) {
    return (
      <>
        {tags.map((tag, idx) => (
          <button
            key={`tag-${idx}`}
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(tag);
              router.push(tag.href);
            }}
          >
            <GameTag tagLabel={tag.label} isOverlay={isOverlay} size={size} />
          </button>
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
