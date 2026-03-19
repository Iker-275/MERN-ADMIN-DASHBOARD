export function RecentVisits({ visits }: any) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-lg font-semibold mb-4">Recent Visits</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Customer</th>
            <th>Reading</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {visits.map((v: any) => (
            <tr key={v._id} className="border-t">
              <td>
                {v.customerId?.name}
                <div className="text-xs text-gray-400">
                  {v.customerId?.customerCode}
                </div>
              </td>

              <td>{v.currentReading}</td>

              <td>
                {new Date(v.visitedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RecentPayments({ payments }: any) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p: any) => (
            <tr key={p._id} className="border-t">
              <td>
                {p.customerId?.name}
                <div className="text-xs text-gray-400">
                  {p.customerId?.customerCode}
                </div>
              </td>

              <td>${p.amountCents}</td>

              <td>{p.status}</td>

              <td>
                {new Date(p.receivedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}