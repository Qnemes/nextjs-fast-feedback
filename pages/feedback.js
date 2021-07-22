import useSWR from 'swr';

import { useAuth } from 'src/lib/auth';
import fetcher from 'src/utils/fetcher';
import DashboardShell from 'src/components/DashboardShell';
import FeedbackTable from 'src/components/FeedbackTable';
import FeedbackEmptyState from 'src/components/FeedbackEmptyState';
import FeedbackTableHeader from 'src/components/FeedbackTableHeader';
import FeedbackTableSkeleton from 'src/components/FeedbackTableSkeleton';
import SiteTableSkeleton from 'src/components/SiteTableSkeleton';

const AllFeedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <FeedbackTableSkeleton />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data?.feedback?.length ? <FeedbackTable feedback={data.feedback} /> : <FeedbackEmptyState />}
    </DashboardShell>
  );
};

export default AllFeedback;
