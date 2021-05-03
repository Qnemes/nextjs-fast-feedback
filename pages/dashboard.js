import { useAuth } from '@/lib/auth';
import DashboardShell from "@/components/DashboardShell";
import EmptyState from '@/components/EmptyState';
import SiteTableHeader from '@/components/SiteTableHeader';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';

export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);


  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={true} />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }
  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={true} />
      {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}