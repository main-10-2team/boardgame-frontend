import ProtectedLayout from '@/components/common/ProtectedLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout nextBase="/today">{children}</ProtectedLayout>;
}
