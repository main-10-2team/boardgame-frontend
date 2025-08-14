interface YoutubeVideoSectionProps {
  gameTitle: string;
}

async function fetchYoutubeVideos(gameTitle: string): Promise<string | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  const params = {
    part: 'snippet',
    maxResults: '1',
    q: `${gameTitle} 보드게임 하는 법`,
    type: 'video',
    key: apiKey ?? '',
    regionCode: 'KR',
  };

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url);
  const data = await response.json();
  return data.items[0]?.id?.videoId || null;
}

export default async function YoutubeVideoSection({
  gameTitle,
}: YoutubeVideoSectionProps) {
  let youtubeVideo: string | null = null;

  try {
    youtubeVideo = await fetchYoutubeVideos(gameTitle);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('YouTube API 호출 실패:', error);
  }

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
