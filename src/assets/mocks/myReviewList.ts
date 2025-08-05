const MOCK_IMAGE_URL =
  'https://images.unsplash.com/photo-1659480142923-0cd01191e0e9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const myReviewList = {
  status: 'success',
  total_reviews: 5,
  page: 1,
  limit: 10,
  total_pages: 2,
  reviews: [
    {
      review_id: 1,
      game_id: 123,
      title: 'Catan',
      rating: 4.5,
      content: '정말 재미있는 전략 게임!',
      created_at: '2025-07-23T15:00:00Z',
      updated_at: '2025-07-23T16:21:00Z',
      image_url: MOCK_IMAGE_URL,
      actions: {
        edit_url: '/api/v1/reviews/1',
        delete_url: '/api/v1/reviews/1',
      },
    },
    {
      review_id: 2,
      game_id: 456,
      title: 'Ticket to Ride',
      rating: 3.0,
      content: '재밌어요',
      created_at: '2025-07-22T09:30:00Z',
      updated_at: null,
      image_url: MOCK_IMAGE_URL,
      actions: {
        edit_url: '/api/v1/reviews/2',
        delete_url: '/api/v1/reviews/2',
      },
    },
    {
      review_id: 3,
      game_id: 456,
      title: 'Ticket to Ride',
      rating: 3.0,
      content: '초보자에게 약간 어려움.',
      created_at: '2025-07-22T09:30:00Z',
      updated_at: null,
      image_url: MOCK_IMAGE_URL,
      actions: {
        edit_url: '/api/v1/reviews/2',
        delete_url: '/api/v1/reviews/2',
      },
    },
    {
      review_id: 4,
      game_id: 456,
      title: 'Ticket to Ride',
      rating: 3.0,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      created_at: '2025-07-22T09:30:00Z',
      updated_at: null,
      image_url: MOCK_IMAGE_URL,
      actions: {
        edit_url: '/api/v1/reviews/2',
        delete_url: '/api/v1/reviews/2',
      },
    },
    {
      review_id: 5,
      game_id: 456,
      title: 'Ticket to Ride',
      rating: 3.0,
      content:
        '규칙이 간단해서 입문자도 쉽게 배울 수 있고, 그럼에도 전략적 깊이가 있어서 재미있어요. 특히 타일의 촉감과 디자인이 정말 예뻐서 소장 가치도 높습니다!',
      created_at: '2025-07-22T09:30:00Z',
      updated_at: null,
      image_url: MOCK_IMAGE_URL,
      actions: {
        edit_url: '/api/v1/reviews/2',
        delete_url: '/api/v1/reviews/2',
      },
    },
  ],
};
