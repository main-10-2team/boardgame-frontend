'use client';

import IntroSection from '@/components/board-pick/IntroSection';
import SurveySection from '@/components/board-pick/SurveySection';
import { useBoardPickSurvey } from '@/hooks/useBoardPickSurvey';
import { Question } from '@/types/board-pick/boardPick';
import { useRouter } from 'next/navigation';

const RESULT_PATH = '/preference/result';
const questions: Question[] = [
  {
    key: 'players',
    text: '1. 함께하는 인원 수는 몇 명인가요?',
    type: 'single-select',
    options: [
      { id: 1, label: '2명' },
      { id: 2, label: '3–4명' },
      { id: 3, label: '5–6명' },
      { id: 4, label: '7명 이상' },
    ],
  },
  {
    key: 'playtime_range',
    text: '2. 플레이타임을 골라주세요',
    type: 'multi-select',
    options: [
      { id: 1, label: '20분 이내', min: 0, max: 20 },
      { id: 2, label: '20–40분', min: 20, max: 40 },
      { id: 3, label: '40–60분', min: 40, max: 60 },
      { id: 4, label: '60–80분', min: 60, max: 80 },
      { id: 5, label: '80분 이상', min: 80, max: 999 },
    ],
  },
];

export default function BoardPickPage() {
  // 라우터 & 전환 상태 (전환 동안 버튼 상태/중복 클릭 방지 등에 사용 가능)
  const router = useRouter();

  // 설문 상태/로직 훅 (현재 단계, 답변, 다음/이전 이동 등)
  const survey = useBoardPickSurvey(questions);
  // 마지막 단계 여부 (UI/전환 분기 용)
  const isLast = survey.step === survey.total;

  const submitAndGo = async () => {
    // TODO: API 연동 시 여기서 POST -> OK 면 결과 페이지로
    router.push(RESULT_PATH);
  };

  if (survey.phase === 'intro')
    return (
      <GradientLayout>
        <IntroSection onStart={survey.start} />
      </GradientLayout>
    );

  if (survey.phase === 'survey' && survey.current) {
    const q = survey.current;
    const v = survey.answers[q.key];

    return (
      <GradientLayout>
        <SurveySection
          step={survey.step}
          total={survey.total}
          question={q}
          value={v}
          onSelectSingle={(id: number) => survey.setSingle(q.key, id)}
          onToggleMulti={(id: number) => survey.toggleMulti(q.key, id)}
          onPrev={survey.goPrev}
          onNext={async () => {
            if (!isLast) {
              survey.goNext();
            } else {
              await submitAndGo();
            }
          }}
          canNext={survey.canNext}
        />
      </GradientLayout>
    );
  }

  return null;
}

function GradientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-[linear-gradient(to_bottom,_#5a5a5a,_#17171B)] text-white">
      {children}
    </div>
  );
}
