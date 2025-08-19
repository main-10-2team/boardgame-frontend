'use client';

import { submitTodayAnswers } from '@/api/board-pick';
import IntroSection from '@/app/today/_components/IntroSection';
import SurveySection from '@/app/today/_components/SurveySection';
import { useBoardPickSurvey } from '@/hooks/useBoardPickSurvey';
import { TodaySubmitResponse } from '@/types/board-pick/boardPick';
import { buildTodaySubmitPayload } from '@/utils/boardPick';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const RESULT_PATH = '/today/result';
const STORAGE_KEY = 'today:result';

export default function BoardPickPage() {
  const router = useRouter();
  const survey = useBoardPickSurvey();
  const [submitting, setSubmitting] = useState(false);
  const search = useSearchParams();

  useEffect(() => {
    const resume = search.get('resume') === '1';
    if (!resume) {
      sessionStorage.removeItem(STORAGE_KEY);
      survey.reset();
    }
  }, []);

  const handleStart = useCallback(() => {
    survey.reset();
    survey.start();
  }, [survey]);

  const submitAndGo = useCallback(async () => {
    if (submitting) return;
    try {
      setSubmitting(true);

      const payload = buildTodaySubmitPayload(
        survey.answers,
        survey.questionsByKey
      );
      const result: TodaySubmitResponse = await submitTodayAnswers(payload);

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      router.push(RESULT_PATH);
    } catch (e) {
      console.error(e);
      alert('제출에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  }, [submitting, survey.answers, survey.questionsByKey, router]);

  if (survey.phase === 'intro')
    return (
      <GradientLayout>
        <IntroSection onStart={handleStart} />
      </GradientLayout>
    );

  if (survey.phase === 'survey') {
    return (
      <GradientLayout>
        <SurveySection onSubmit={submitAndGo} />
      </GradientLayout>
    );
  }

  return null;
}

function GradientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] bg-[linear-gradient(to_bottom,_#5a5a5a,_#17171B)] text-white">
      {children}
    </div>
  );
}
