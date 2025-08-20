// export async function fetchYoutubeVideos(
//   gameTitle: string
// ): Promise<string | null> {
//   const apiKey = process.env.YOUTUBE_API_KEY;

//   const params = {
//     part: 'snippet',
//     maxResults: '1',
//     q: `${gameTitle} 보드게임 하는 법`,
//     type: 'video',
//     key: apiKey ?? '',
//     regionCode: 'KR',
//   };

//   const url = new URL('https://www.googleapis.com/youtube/v3/search');
//   url.search = new URLSearchParams(params).toString();

//   const response = await fetch(url);
//   const data = await response.json();
//   return data.items[0]?.id?.videoId || null;
// }

// app/api/youtube/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');

  const apiKey = process.env.YOUTUBE_API_KEY; // 서버 전용
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.search = new URLSearchParams({
    part: 'snippet',
    maxResults: '1',
    q: `${title} 보드게임 하는 법`,
    type: 'video',
    key: apiKey ?? '',
    regionCode: 'KR',
  }).toString();

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  return NextResponse.json(data);
}
