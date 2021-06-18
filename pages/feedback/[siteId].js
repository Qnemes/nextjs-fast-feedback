import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';
import SiteHeader from '@/components/SiteHeader';
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import { useRouter } from 'next/router';

const SiteFeedback = () => {
  const { user } = useAuth();
  const { query } = useRouter();
  const { data } = useSWR(user ? [`/api/feedback/${query.siteId}`, user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteHeader />
        <FeedbackTableSkeleton />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteHeader siteName={data?.site?.siteName} />
      {data?.feedback?.length ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  )
}

export default SiteFeedback;
