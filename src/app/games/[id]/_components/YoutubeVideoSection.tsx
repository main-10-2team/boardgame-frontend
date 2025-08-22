import { useQuery } from '@tanstack/react-query';

interface YoutubeVideoSectionProps {
  gameTitle: string;
}

export default function YoutubeVideoSection({
  gameTitle,
}: YoutubeVideoSectionProps) {
  const { data: videoId } = useQuery({
    queryKey: ['youtube', gameTitle],
    queryFn: async () => {
      const res = await fetch(
        `/api/youtube?title=${encodeURIComponent(gameTitle)}`
      );
      const data = await res.json();
      return data.items[0]?.id?.videoId ?? null;
    },
  });

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
      <iframe
        id="ytplayer"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`}
        width="100%"
        height="100%"
        allowFullScreen
      />
    </div>
  );
}
