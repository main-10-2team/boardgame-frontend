'use client';

import DoneSection from '@/components/board-pick/DoneSection';
import IntroSection from '@/components/board-pick/IntroSection';
import SurveySection from '@/components/board-pick/SurveySection';
import { useBoardPickSurvey } from '@/hooks/useBoardPickSurvey';
import { Question } from '@/types/board-pick/boardPick';

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

export default function TodayPage() {
  const survey = useBoardPickSurvey(questions);

  if (survey.phase === 'intro') return <IntroSection onStart={survey.start} />;

  if (survey.phase === 'survey' && survey.current) {
    const q = survey.current;
    const v = survey.answers[q.key];

    return (
      <SurveySection
        step={survey.step}
        total={survey.total}
        question={q}
        value={v}
        onSelectSingle={(id: number) => survey.setSingle(q.key, id)}
        onToggleMulti={(id: number) => survey.toggleMulti(q.key, id)}
        onNext={survey.goNext}
        canNext={survey.canNext}
        onPrev={survey.goPrev}
      />
    );
  }

  return (
    <DoneSection
      onGoResult={() => {
        /* router.push('/today/result') */
      }}
    />
  );
}
