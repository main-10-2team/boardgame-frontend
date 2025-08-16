import ProtectedLayout from '@/components/common/ProtectedLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout nextBase="/my-page">{children}</ProtectedLayout>;
}
