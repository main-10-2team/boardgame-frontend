'use client';

import { DEFAULT_PROFILE_IMAGE } from '@/constants/image';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type Props = ImageProps & { fallbackSrc?: string };

export function ImageWithFallback({
  src,
  fallbackSrc = DEFAULT_PROFILE_IMAGE,
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc || fallbackSrc}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
