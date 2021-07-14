import { useAuth } from 'src/lib/auth';
import DashboardShell from "src/components/DashboardShell";
import EmptyState from 'src/components/EmptyState';
import UpgradeEmptyState from 'src/components/UpgradeEmptyState';
import SiteTableHeader from 'src/components/SiteTableHeader';
import SiteTableSkeleton from 'src/components/SiteTableSkeleton';
import useSWR from 'swr';
import fetcher from 'src/utils/fetcher';
import SiteTable from 'src/components/SiteTable';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
  const isPaidAccount = user?.stripeRole !== 'free';

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  if (data.sites.length) {
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={isPaidAccount} />
        <SiteTable sites={data.sites} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={isPaidAccount} />
      {isPaidAccount ? <EmptyState /> : <UpgradeEmptyState />}
    </DashboardShell>
  )
}

export default Dashboard;
