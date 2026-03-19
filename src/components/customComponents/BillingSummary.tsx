export function BillingSummary({ data }: any) {
  const billed = data?.billingVsPayments?.totalBilled || 0;
  const paid = data?.billingVsPayments?.totalPayments || 0;

  const percentage = billed > 0 ? ((paid / billed) * 100).toFixed(1) : 0;

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="text-lg font-semibold mb-4">
        Billing Summary
      </h3>

      <div className="space-y-3">
        <p>Total Billed: <b>${billed.toFixed(2)}</b></p>
        <p>Total Paid: <b>${paid.toFixed(2)}</b></p>

        <div className="mt-4">
          <div className="h-3 bg-gray-200 rounded-full">
            <div
              className="h-3 bg-green-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-sm mt-1">{percentage}% collected</p>
        </div>
      </div>
    </div>
  );
}