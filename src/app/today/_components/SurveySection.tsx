'use client';
import SurveySectionItem from '@/app/today/_components/SurveySectionItem';
import { useTodayQuestions } from '@/hooks/react-query/useTodayQuestions';
import { useBoardPickSurvey } from '@/hooks/useBoardPickSurvey';
export default function SurveySection({ onSubmit }: { onSubmit: () => void }) {
  const survey = useBoardPickSurvey();
  const step = survey.step;

  const { data: question, isLoading } = useTodayQuestions(step);
  const isLast = step === survey.total;

  if (isLoading || !question) return null;

  const value = survey.answers[question.key];

  return (
    <SurveySectionItem
      step={step}
      total={survey.total}
      question={question}
      value={value}
      onSelectSingle={(id) => survey.setSingle(question.key, id)}
      onToggleMulti={(id) => survey.toggleMulti(question.key, id)}
      onPrev={survey.goPrev}
      onNext={async () => {
        if (!isLast) {
          survey.goNext();
        } else {
          await onSubmit();
        }
      }}
      canNext={survey.canNext}
    />
  );
}
