import Button from '@/components/common/Button';
import GameTags from '@/components/game/GameTags';
import { Result } from '@/types/preference/result';
import { cn } from '@/utils/cn';
import { RiArrowRightSLine } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';

interface ResultCardProps {
  data: Result;
  variant?: 'glass' | 'soft';
  align?: 'left' | 'right';
}

export default function ResultCard({
  data,
  variant = 'glass',
  align = 'left',
}: ResultCardProps) {
  return (
    <Link
      href={`/games/${data.game_id}`}
      className={cn(
        'relative mx-auto grid max-w-2xl grid-cols-1 gap-5 overflow-hidden rounded-2xl border border-white/50 px-6 py-8 md:grid-cols-[220px,1fr]',
        'transition-all hover:-translate-y-3 hover:shadow-lg',
        variant === 'glass' ? 'bg-white/1 backdrop-blur-md' : 'bg-white/40',
        align === 'right' ? 'md:grid-cols-[1fr,220px]' : ''
      )}
    >
      {variant === 'glass' && (
        <>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl backdrop-saturate-[120%]"></div>
          <div
            className="absolute inset-0 z-10"
            style={{
              boxShadow: `
                inset 10px 10px 30px rgba(193, 193, 193, 0.2),
                inset 2px 2px 10px rgba(255, 255, 255, 0.4),
                inset -10px -10px 20px rgba(240, 240, 240, 0.05),
                inset -2px -2px 40px rgba(230, 230, 230, 0.1)
              `,
            }}
          ></div>
        </>
      )}

      <div className="relative flex items-end justify-between gap-6">
        {/* 썸네일 */}
        <div
          className={`relative aspect-[4/5] w-2/5 max-w-60 shrink-0 overflow-hidden rounded-xl ${align === 'right' ? 'order-1' : ''}`}
        >
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            sizes="(max-width:768px) 70vw, 220px"
            className="object-cover"
            priority
          />
        </div>

        {/* 텍스트 */}
        <div
          className={`flex flex-col gap-3 md:gap-6 ${align === 'right' ? '' : 'items-end'}`}
        >
          {data.quote && data.reviewer && (
            <blockquote>
              <span
                className={cn(
                  'font-handwriting line-clamp-3 block text-xl font-bold text-gray-700 md:text-3xl',
                  align === 'right' ? 'text-left' : 'text-right'
                )}
              >
                “{data.quote}”
              </span>
              <span className="mt-2 block text-right text-xs text-gray-500 md:text-base">
                — {data.reviewer}
              </span>
            </blockquote>
          )}

          <h3 className="text-primary-600 text-2xl font-bold md:text-3xl lg:text-5xl">
            {data.title}
          </h3>

          <div className="flex flex-wrap gap-2">
            <GameTags
              genre_name={data.genre_name}
              difficulty={data.difficulty}
              isLink={false}
              size="md"
            />
          </div>

          {!data.quote && (
            <Button className="group flex h-12 w-12 items-center justify-center rounded-full! p-0! transition">
              <RiArrowRightSLine className="text-white transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      </div>

      <p className="z-99 mt-1 rounded-xl bg-white/40 px-3 py-2 text-base text-gray-700 md:px-6 md:py-8 md:text-lg">
        {data.summary}
      </p>
    </Link>
  );
}
