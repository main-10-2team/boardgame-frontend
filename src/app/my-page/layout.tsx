import ProtectedLayout from '@/components/common/ProtectedLayout';
import Grid from '@/components/layout/Grid';
import MyPageSideMenu from '@/components/my-page/SideMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout nextBase="/my-page">
      <main className="inner flex flex-1 flex-col pt-10 pb-30">
        <Grid>
          <Grid.Item span="col-span-12 md:col-span-3">
            <MyPageSideMenu />
          </Grid.Item>

          <Grid.Item span="col-span-12 md:col-span-9 md:pt-18 flex flex-col gap-6">
            {children}
          </Grid.Item>
        </Grid>
      </main>
    </ProtectedLayout>
  );
}
