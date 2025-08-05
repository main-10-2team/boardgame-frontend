import Modal from '@/components/common/modal/Modal';
import ReviewDetailView from '@/components/my-page/review/ReviewDetailView';
import ReviewEditForm from '@/components/my-page/review/ReviewEditForm';
import { ReviewItem, ReviewWriteItem } from '@/types/user/review';
import { useEffect, useMemo, useState } from 'react';

type ReviewMode = 'view' | 'edit' | 'write';

interface BaseProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ViewEditProps extends BaseProps {
  review: ReviewItem;
  isNew?: false;
}

interface WriteProps extends BaseProps {
  isNew: true;
  title: string;
  image_url: string;
  game_id: number;
  review?: undefined;
}

type ReviewDetailModalProps = ViewEditProps | WriteProps;

const REVIEW_MODAL_TITLE_MAP: Record<ReviewMode, string> = {
  write: '리뷰 쓰기',
  edit: '리뷰 수정',
  view: '리뷰 상세',
};

export default function ReviewDetailModal(props: ReviewDetailModalProps) {
  const [mode, setMode] = useState<ReviewMode>('view');
  const isWriteMode = props.isNew === true;

  useEffect(() => {
    if (props.isOpen) {
      setMode(isWriteMode ? 'write' : 'view');
    }
  }, [props.isOpen, isWriteMode]);

  const reviewData = useMemo<ReviewItem | ReviewWriteItem>(() => {
    if (isWriteMode) {
      return {
        review_id: -1,
        title: props.title,
        content: '',
        rating: 0,
        image_url: props.image_url,
        created_at: new Date().toISOString(),
        game_id: props.game_id,
      };
    }
    return props.review;
  }, [isWriteMode, props]);

  return (
    <Modal
      modalId={`review-detail-${reviewData.review_id}`}
      isOpen={props.isOpen}
      onClose={props.onClose}
      className="w-full max-w-[640px]"
    >
      <h2 className="mb-8 text-xl font-bold">{REVIEW_MODAL_TITLE_MAP[mode]}</h2>
      {mode === 'view' ? (
        <ReviewDetailView
          review={reviewData as ReviewItem}
          onClose={props.onClose}
          onEdit={() => setMode('edit')}
        />
      ) : (
        <ReviewEditForm
          review={reviewData}
          onClose={props.onClose}
          onSave={() => setMode('view')}
        />
      )}
    </Modal>
  );
}
