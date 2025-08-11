import { gameListData } from '@/assets/mocks/gameListData';
import { preferResultData } from '@/assets/mocks/preferResultData';
import BoardPickResult from '@/components/preference/result/BoardPickResult';

export default function ResultPage() {
  return (
    <BoardPickResult result={preferResultData} similar={gameListData.games} />
  );
}
