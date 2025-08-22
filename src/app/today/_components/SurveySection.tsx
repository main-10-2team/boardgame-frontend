'use client';
import SurveySectionItem from '@/app/today/_components/SurveySectionItem';
import { useTodayQuestions } from '@/hooks/react-query/useTodayQuestions';
import { useBoardPickSurvey } from '@/hooks/useBoardPickSurvey';
import { isAnswered } from '@/utils/boardPick';

type SurveyModel = ReturnType<typeof useBoardPickSurvey>;
export default function SurveySection({
  onSubmit,
  survey,
}: {
  onSubmit: () => void;
  survey: SurveyModel;
}) {
  const step = survey.step;
  const total = survey.total;

  const { data: question, isLoading, isError, error } = useTodayQuestions(step);

  if (isLoading || !question) {
    return null;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-300">
        설문을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 text-xs opacity-70">{String(error.message)}</div>
        )}
      </div>
    );
  }

  const value = survey.answers[question.key];
  const canNext = isAnswered(question, value);
  const isLast = step >= total;

  return (
    <SurveySectionItem
      step={step}
      total={total}
      question={question}
      value={value}
      onSelectSingle={(id) => {
        survey.setSingle(question.key, id);
        survey.rememberQuestion(question);
      }}
      onToggleMulti={(id) => {
        survey.toggleMulti(question.key, id);
        survey.rememberQuestion(question);
      }}
      onPrev={survey.goPrev}
      onNext={async () => {
        if (!isLast) {
          survey.goNext();
        } else {
          await onSubmit();
        }
      }}
      canNext={canNext}
    />
  );
}
