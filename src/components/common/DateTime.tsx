'use client';
import { formatDate } from '@/utils/formatDate';

export default function DateTime({ date }: { date: string }) {
  return <>{formatDate(date)}</>;
}
