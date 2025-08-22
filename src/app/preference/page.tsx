// app/preference/page.tsx
import { getSurveyChoices } from '@/actions/preference';
import PreferenceClient from './PreferenceClient';

export default async function PreferencePage() {
  // 인증된 사용자만 접근하므로 게임 목록을 가져옴
  const data = await getSurveyChoices();

  return <PreferenceClient games={data.games} />;
}
