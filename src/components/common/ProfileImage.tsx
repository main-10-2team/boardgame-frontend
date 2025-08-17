import { DEFAULT_PROFILE_IMAGE } from '@/constants/image';
import Image, { ImageProps } from 'next/image';

function buildProfileUrl(path?: string | null): string | null {
  const p = (path ?? '').trim();
  if (!p) return null;
  if (/^(https?:)?\/\//i.test(p)) return p;
  if (p.startsWith('data:')) return p;
  if (p.startsWith('/')) return p;

  return `https://kr.object.ncloudstorage.com/boardq/${path}`;
}

type Props = Omit<ImageProps, 'src'> & {
  src?: string | null;
};

export function ProfileImage({ src, ...props }: Props) {
  const imgSrc = buildProfileUrl(src) ?? DEFAULT_PROFILE_IMAGE;

  return <Image {...props} src={imgSrc} />;
}
