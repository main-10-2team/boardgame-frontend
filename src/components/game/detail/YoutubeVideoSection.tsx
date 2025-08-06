'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface YoutubeVideoSectionProps {
  gameTitle: string;
}
export default function YoutubeVideoSection({
  gameTitle,
}: YoutubeVideoSectionProps) {
  const [youtubeVideo, setYoutubeVideo] = useState<string | null>(null);
  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              part: 'snippet',
              maxResults: 1,
              q: `${gameTitle} 보드게임 하는 법`, // 게임 타이틀로 검색
              type: 'video',
              key: apiKey,
              regionCode: 'KR',
            },
          }
        );
        setYoutubeVideo(response.data.items[0]?.id?.videoId || null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('YouTube API 호출 실패:', error);
      }
    };

    fetchYoutubeVideos();
  }, [gameTitle]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
      <iframe
        id="ytplayer"
        src={`https://www.youtube.com/embed/${youtubeVideo}?autoplay=0&controls=1`}
        width="100%"
        height="100%"
        allowFullScreen
      />
    </div>
  );
}
