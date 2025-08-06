export const gameListData = {
  total_count: 123,
  page: 1,
  limit: 20,
  games: [
    {
      game_id: 1,
      age: 8,
      title: '바방크',
      description: `
카지노에서 게임을 즐기기 위해 사람들이 모입니다. 플레이어들은 먼저 각 카지노 테이블에서 얼마의 돈을 딸 수 있을지 결정한 뒤, 자신의 캐릭터 카드를 사용해 말을 원하는 테이블로 이동시킵니다.
지급금은 배로 늘어날 수도 있고, 카드샤크에게 빼앗길 수도 있습니다. 초반에는 판돈이 작지만, 라운드가 진행될수록 점점 커집니다.Vabanque에서는 상대의 움직임을 면밀히 관찰하고, 그들의 블러핑을 간파할 수 있다면 큰 돈을 얻을 수 있습니다.
총 4라운드가 끝났을 때 가장 많은 돈을 모은 플레이어가 승리합니다.`,
      min_players: 2,
      max_players: 4,
      playtime_minutes: 60,
      difficulty: 2.5,
      image_url:
        'https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rules_url: 'http://example.com/ru_rules',
      genre_name: '판타지',
      average_rating: 4.5,
      created_at: '2024-07-24T10:00:00Z',
      updated_at: '2024-07-24T10:00:00Z',
      like_count: 123,
      is_liked: true,
    },
    {
      game_id: 2,
      age: 10,
      title: '보드카',
      description: '카드 게임입니다.',
      min_players: 3,
      max_players: 7,
      playtime_minutes: 90,
      difficulty: 3.0,
      image_url:
        'https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rules_url: 'http://example.com/bo_rules',
      genre_name: '카드',
      average_rating: 4.2,
      created_at: '2024-07-23T15:30:00Z',
      updated_at: '2024-07-23T15:30:00Z',
      like_count: 567,
      is_liked: false,
    },
    {
      game_id: 3,
      age: 10,
      title: '보드카',
      description: '카드 게임입니다.',
      min_players: 3,
      max_players: 7,
      playtime_minutes: 90,
      difficulty: 3.0,
      image_url:
        'https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rules_url: 'http://example.com/bo_rules',
      genre_name: '카드',
      average_rating: 4.2,
      created_at: '2024-07-23T15:30:00Z',
      updated_at: '2024-07-23T15:30:00Z',
      like_count: 567,
      is_liked: false,
    },
  ],
};

export const gameDetailData = {
  game_id: 1,
  age: 8,
  title: '바방크',
  description: `
카지노에서 게임을 즐기기 위해 사람들이 모입니다. 플레이어들은 먼저 각 카지노 테이블에서 얼마의 돈을 딸 수 있을지 결정한 뒤, 자신의 캐릭터 카드를 사용해 말을 원하는 테이블로 이동시킵니다.
지급금은 배로 늘어날 수도 있고, 카드샤크에게 빼앗길 수도 있습니다. 초반에는 판돈이 작지만, 라운드가 진행될수록 점점 커집니다.Vabanque에서는 상대의 움직임을 면밀히 관찰하고, 그들의 블러핑을 간파할 수 있다면 큰 돈을 얻을 수 있습니다.
총 4라운드가 끝났을 때 가장 많은 돈을 모은 플레이어가 승리합니다.`,
  min_players: 2,
  max_players: 4,
  playtime_minutes: 60,
  difficulty: 2.5,
  image_url:
    'https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  rules_url: 'http://example.com/ru_rules',
  genre_name: '판타지',
  average_rating: 4.5,
  created_at: '2024-07-24T10:00:00Z',
  updated_at: '2024-07-24T10:00:00Z',
  like_count: 123,
  is_liked: true,
};

export const reviewData = {
  status: 'success',
  game_id: 123,
  total_reviews: 25,
  page: 1,
  limit: 10,
  total_pages: 3,
  reviews: [
    {
      review_id: 1,
      user: {
        user_id: 456,
        username: 'BoardGameFan',
        profile_image_url:
          'https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      rating: 4.5,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum tellus eget turpis maximus vehicula. Sed euismod aliquam enim, et imperdiet metus auctor eu. Cras imperdiet, lorem in pellentesque posuere, velit mi iaculis erat, et porta lectus odio sit amet orci. Integer molestie ante a massa fermentum, quis finibus tellus lobortis. Sed in nulla dapibus, tincidunt diam et, hendrerit libero. Cras est sapien, viverra vitae tincidunt non, iaculis et risus. Pellentesque scelerisque in nulla et pellentesque. Proin accumsan mauris at libero pretium, nec porttitor nulla aliquam. Sed nec arcu pellentesque, molestie enim at, elementum nunc. Nunc mollis euismod ex, ac imperdiet nisi sollicitudin id. Nam at convallis sapien. Maecenas tincidunt faucibus lacinia. Sed nec neque vitae lectus cursus vulputate eu eget metus. Nulla porttitor ornare ultrices. Pellentesque rhoncus rhoncus est sit amet accumsan.',
      created_at: '2025-07-23T15:00:00Z',
    },
    {
      review_id: 2,
      user: {
        user_id: 456,
        username: 'BoardGameFan',
        profile_image_url:
          'https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      rating: 3.0,
      content: '게임은 좋지만 초보자에게는 약간 어려움.',
      created_at: '2025-07-22T09:30:00Z',
    },
    {
      review_id: 3,
      user: {
        user_id: 456,
        username: 'BoardGameFan',
        profile_image_url:
          'https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      rating: 3.0,
      content: '게임은 좋지만 초보자에게는 약간 어려움.',
      created_at: '2025-07-22T09:30:00Z',
    },
    {
      review_id: 4,
      user: {
        user_id: 456,
        username: 'BoardGameFan',
        profile_image_url:
          'https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      rating: 3.0,
      content: '게임은 좋지만 초보자에게는 약간 어려움.',
      created_at: '2025-07-22T09:30:00Z',
    },
  ],
};
