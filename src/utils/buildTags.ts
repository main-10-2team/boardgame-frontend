import { GameTagsProps } from '@/components/game/GameTags';

type Tag = { label: string; href: string };

export function buildTags(props: GameTagsProps): Tag[] {
  const tags: Tag[] = [];

  // 공통 옵션
  const size = (props.size ?? 'sm') as 'sm' | 'md' | 'lg';
  void size; // (뷰에서 사용)

  // v2 경로: genre/category/difficulty(문자열)
  if ('genre' in props && 'category' in props) {
    const genreArray = (props.genre ?? '')
      .toString()
      .split(',')
      .map((g) => g.trim())
      .filter((g) => g !== '');

    const categoryArray = (props.category ?? '')
      .toString()
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c !== '');

    const difficulty = (props.difficulty ?? '').toString().trim();

    // 장르와 카테고리 배열에서 최대 2개까지만 선택
    const limitedGenres = genreArray.slice(0, 2);
    const limitedCategories = categoryArray.slice(0, 2);

    // 태그 배열에 장르와 카테고리 태그 추가
    limitedCategories.forEach((c) => {
      tags.push({
        label: c,
        href: `/games?categories=${encodeURIComponent(c)}`,
      });
    });

    limitedGenres.forEach((g) => {
      tags.push({
        label: g,
        href: `/games?genres=${encodeURIComponent(g)}`,
      });
    });

    // 난이도 태그 추가
    if (difficulty) {
      tags.push({
        label: `난이도_${difficulty}`,
        href: `/games?difficulty=${encodeURIComponent(difficulty)}`,
      });
    }

    return tags;
  }

  // v1 경로: genre_name / min~max / difficulty(number|null)
  const genre_name = (props.genre_name ?? '')?.toString().trim();
  const min_players =
    typeof props.min_players === 'number' ? props.min_players : undefined;
  const max_players =
    typeof props.max_players === 'number' ? props.max_players : undefined;

  const diffLabel =
    props.difficulty != null ? props.difficulty.toString().trim() : '알수없음';
  const playersLabel =
    typeof min_players === 'number' && typeof max_players === 'number'
      ? `${min_players}~${max_players}인용`
      : '';

  // v1 태그 추가
  if (genre_name) {
    tags.push({
      label: genre_name,
      href: `/games?genres=${encodeURIComponent(genre_name)}`,
    });
  }
  if (playersLabel) {
    tags.push({
      label: playersLabel,
      href: `/games?players=${encodeURIComponent(playersLabel.replace('인용', ''))}`,
    });
  }

  tags.push({
    label: `난이도_${diffLabel}`,
    href: `/games?difficulty=${encodeURIComponent(diffLabel)}`,
  });

  return tags;
}
