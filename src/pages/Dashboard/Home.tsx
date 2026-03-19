
import PageMeta from "../../components/common/PageMeta";
import { BillingSummary } from "../../components/customComponents/BillingSummary";
import { RecentPayments, RecentVisits } from "../../components/customComponents/Recents";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import BillingVsPaymentsChart from "../../components/ecommerce/StatisticsChart";
import { useDashboard } from "../../hooks/useDashboard";

export default function Home() {
  const { dashboard, loading } = useDashboard();

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <>
      <PageMeta title="Dashboard" description="Galdogob Water Dashboard" />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics data={dashboard} />
          <BillingVsPaymentsChart data={dashboard} />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <BillingSummary data={dashboard} />
        </div>

        <div className="col-span-12">
          <RecentVisits visits={dashboard?.visits?.recent || []} />
        </div>

        <div className="col-span-12">
          <RecentPayments payments={dashboard?.payments?.recent || []} />
        </div>
      </div>
    </>
  );
}