import { useEffect } from "react";
import { useVisit } from "../../hooks/useVisit";
import { useBillings } from "../../hooks/useBillings";
import { usePayments } from "../../hooks/usePayment";

function CustomerPayments({ customerId }: { customerId: string }) {
  const { payments, loading } = usePayments({ customerId });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-3">
      {payments?.map((p: any) => (
        <div
          key={p._id}
          className="p-3 border rounded-lg flex justify-between"
        >
          <div>
            <p className="font-medium">{p.customerId?.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(p.receivedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              {p.amountCents} {p.currency}
            </p>
            <p className="text-xs">{p.method}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CustomerBillings({ customerId }: { customerId: string }) {
  const { billings, loading } = useBillings({
    filters: { customerId },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-3">
      {billings?.map((b: any) => (
        <div
          key={b._id}
          className="p-3 border rounded-lg flex justify-between"
        >
          <div>
            <p className="font-medium">{b.billingPeriod}</p>
            <p className="text-xs text-gray-500">
              Units: {b.unitsConsumed}
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              {b.totalAmount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CustomerVisits({ customerId }: { customerId: string }) {
  const { visits, loading, updateFilters } = useVisit();

  useEffect(() => {
    updateFilters({ customerId });
  }, [customerId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-3">
      {visits?.map((v: any) => (
        <div
          key={v._id}
          className="p-3 border rounded-lg flex justify-between"
        >
          <div>
            <p className="font-medium">
              {v.currentReading} units
            </p>
            <p className="text-xs text-gray-500">
              Last: {v.lastReading}
            </p>
          </div>

          <div className="text-right text-xs">
            {new Date(v.dateOfVisit).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}


export{CustomerBillings,CustomerPayments,CustomerVisits}