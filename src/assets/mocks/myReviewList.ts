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
        '여기서 끝이 아니다~~ 밤대추풋고추생강계피당귀향로타임로즈마리백미흑미오곡잡곡설탕구운소금히말라야소금말돈소금후추대파쪽파양파실파잣은행초콜릿된장콩장쌈장두반장응가애호박늙은호박단호박딸기양배추파파야두리안등의열대과일등을몽땅찜기에때려놓고50시간푹끓인후여기서끝이아니다돼지고기소고기말고기양고기닭고기꿩고기쥐고기하마고기악어고기코끼리고기사람고기개고기물고기불고기바람고기환단고기참치꽁치넙치뭉치면살고흝어지면참다랑어를갈아넣고여기서끝이아니다비린내를제거하기위해월계수청주잭다니엘피노누아와인머루주매화수막걸리커피콩을넣고여기서끝이아니다잡내제거를위해랍스타곰발바닥제비집아델리펭귄의꼳휴돼지불알베니스상인의겨드랑이살한근토끼발닭모이주머니최고급와규스테이크마이아르겉껍질테운부분으로잡내를제거하고여기서끝이아니다에비양삼다수아이시스아리수보리수빼어날수라싸수아름다울미백미현미흑미별미를넣고여기서끝이아니다',
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
