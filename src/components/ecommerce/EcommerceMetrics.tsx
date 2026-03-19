export default function EcommerceMetrics({ data }: any) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      
      {/* Customers */}
      <MetricCard
        title="Customers"
        value={data?.customers?.total || 0}
      />

      {/* Visits */}
      <MetricCard
        title="Visits"
        value={data?.visits?.total || 0}
      />

      {/* Payments */}
      <MetricCard
        title="Payments"
        value={data?.payments?.total || 0}
      />
    </div>
  );
}

function MetricCard({ title, value }: any) {
  return (
    <div className="rounded-2xl border bg-white p-5 dark:bg-white/[0.03]">
      <p className="text-sm text-gray-500">{title}</p>
      <h4 className="mt-2 text-2xl font-bold">{value}</h4>
    </div>
  );
}