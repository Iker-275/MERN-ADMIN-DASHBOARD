

import { useVisit } from "../../hooks/useVisit";
import { useZones } from "../../hooks/useZone";
import { useVillage } from "../../hooks/useVillage";
import { useCustomers } from "../../hooks/useCustomers";
import { useUsers } from "../../hooks/useUser";
import Select from "../customComponents/DropDowns";

// ================= FILTERS =================
export function VisitFilters() {
  const { filters, updateFilters } = useVisit();

  const { zones } = useZones();
  const { villages } = useVillage();
  const { customers } = useCustomers({});
  const { users } = useUsers(); // collectors

  const zoneOptions =
    zones?.map((z: any) => ({ value: z._id, label: z.name })) || [];

  const filteredVillages =
    villages?.filter((v: any) =>
      filters.zoneId ? v.zoneId === filters.zoneId : true
    ) || [];

  const villageOptions = filteredVillages.map((v: any) => ({
    value: v._id,
    label: v.villageName || v.name
  }));

  const customerOptions =
    customers?.map((c: any) => ({
      value: c._id,
      label: `${c.name} (${c.customerCode})`
    })) || [];

  const collectorOptions =
    users?.map((u: any) => ({
      value: u._id,
      label: u.name || u.email
    })) || [];

  return (
    <div className="flex flex-wrap gap-4 items-center">

      {/* Customer */}
      <div className="w-60">
        <Select
          options={customerOptions}
          placeholder="Customer"
          defaultValue={filters.customerId}
          onChange={(value) => updateFilters({ customerId: value })}
        />
      </div>

      {/* Zone */}
      <div className="w-52">
        <Select
          options={zoneOptions}
          placeholder="Zone"
          defaultValue={filters.zoneId}
          onChange={(value) =>
            updateFilters({ zoneId: value, villageId: undefined })
          }
        />
      </div>

      {/* Village */}
      <div className="w-52">
        <Select
          options={villageOptions}
          placeholder="Village"
          defaultValue={filters.villageId}
          onChange={(value) => updateFilters({ villageId: value })}
        />
      </div>

      {/* Collector */}
      <div className="w-52">
        <Select
          options={collectorOptions}
          placeholder="Collector"
          defaultValue={filters.collectorId}
          onChange={(value) => updateFilters({ collectorId: value })}
        />
      </div>

      {/* Date From */}
      <input
        type="date"
        value={filters.dateFrom || ""}
        className="border rounded-lg px-3 py-2"
        onChange={(e) => updateFilters({ dateFrom: e.target.value })}
      />

      {/* Date To */}
      <input
        type="date"
        value={filters.dateTo || ""}
        className="border rounded-lg px-3 py-2"
        onChange={(e) => updateFilters({ dateTo: e.target.value })}
      />
    </div>
  );
}

// ================= TABLE =================
export default function VisitsTable() {
  const { visits, loading, pagination, goToPage } = useVisit();

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-b-2 border-brand-500 rounded-full"></div>
      </div>
    );

  return (
    <div className="space-y-4">
      <VisitFilters />

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left">Customer</th>
                <th>Last</th>
                <th>Current</th>
                <th>Consumption</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {visits?.map((v: any) => {
                const consumption = v.currentReading - v.lastReading;

                return (
                  <tr key={v._id} className="border-t">
                    <td className="px-5 py-4">
                      <div>
                        <div className="font-medium">
                          {v.customerId?.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {v.customerId?.customerCode}
                        </div>
                      </div>
                    </td>

                    <td>{v.lastReading}</td>
                    <td>{v.currentReading}</td>
                    <td className="font-medium">{consumption}</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          v.isBilled
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {v.isBilled ? "Billed" : "Unbilled"}
                      </span>
                    </td>

                    <td>
                      {new Date(v.visitedAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {pagination && (
        <div className="flex justify-between items-center">
          <button
            disabled={pagination.page === 1}
            onClick={() => goToPage(pagination.page - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={!pagination.hasNextPage}
            onClick={() => goToPage(pagination.page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}



