import { BillingFiltersType } from "../../types/BillingType";
import { useState, useEffect } from "react";

import Select, { SelectOption } from "../customComponents/DropDowns";

import { useZones } from "../../hooks/useZone";
import { useVillage } from "../../hooks/useVillage";
import { useBillingPeriods } from "../../hooks/usePeriod";

interface Props {
  filters: BillingFiltersType;
  setFilters: (filters: BillingFiltersType) => void;
}

export default function BillingFilters({ filters, setFilters }: Props) {

  const [search, setSearch] = useState(filters.customerName || "");

  const { zones } = useZones();
  const { villages } = useVillage();
  const { periods } = useBillingPeriods();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({
        ...filters,
        customerName: search
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setFilters
  //     // setFilters({
  //     //   ...filters,
  //     //   customerName: search
  //     // });
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [search]);

  const periodOptions: SelectOption[] =
    periods?.map((p: any) => ({
      value: p.period,
      label: p.period
    })) || [];

  const zoneOptions: SelectOption[] =
    zones?.map((z: any) => ({
      value: z._id,
      label: z.name || z.name
    })) || [];

  const filteredVillages =
    villages?.filter((v: any) =>
      filters.zoneId ? v.zoneId === filters.zoneId : true
    ) || [];

  const villageOptions: SelectOption[] =
    filteredVillages.map((v: any) => ({
      value: v._id,
      label: v.villageName || v.name
    }));

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between">

      <div className="flex gap-3 flex-wrap">

        {/* Billing Period (MAIN FILTER) */}
        <div className="w-52">
          <Select
            options={periodOptions}
            placeholder="Billing Period"
            defaultValue={filters.billingPeriod}
            onChange={(value) =>
              setFilters({
                ...filters,
                billingPeriod: value
              })
            }
          />
        </div>

        {/* Search Customer */}
        <input
          type="text"
          placeholder="Search customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-60"
        />

        {/* Zone */}
        <div className="w-52">
          <Select
            options={zoneOptions}
            placeholder="Zone"
            defaultValue={filters.zoneId}
            onChange={(value) =>
              setFilters({
                ...filters,
                zoneId: value,
                // villageId: undefined
              })
            }
          />
        </div>

        {/* Village */}
        <div className="w-52">
          <Select
            options={villageOptions}
            placeholder="Village"
            defaultValue={filters.villageId}
            onChange={(value) =>
              setFilters({
                ...filters,
                villageId: value
              })
            }
          />
        </div>

        {/* Status */}
        <select
          className="border rounded-lg px-3 py-2"
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value
            })
          }
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PAID">Paid</option>
          <option value="REVERSED">Reversed</option>
        </select>

        <input
          type="number"
          placeholder="Min Amount"
          className="border rounded-lg px-3 py-2 w-40"
          onChange={(e) =>
            setFilters({
              ...filters,
              minAmount: Number(e.target.value)
            })
          }
        />

        <input
          type="number"
          placeholder="Max Amount"
          className="border rounded-lg px-3 py-2 w-40"
          onChange={(e) =>
            setFilters({
              ...filters,
              maxAmount: Number(e.target.value)
            })
          }
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) =>
              setFilters({
                ...filters,
                unpaidOnly: e.target.checked
              })
            }
          />
          Unpaid Only
        </label>

        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          onChange={(e) =>
            setFilters({
              ...filters,
              dateFrom: e.target.value
            })
          }
        />

        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          onChange={(e) =>
            setFilters({
              ...filters,
              dateTo: e.target.value
            })
          }
        />

        <button
          onClick={() => {
            setFilters({});
          }}
          className="px-3 py-2 bg-gray-200 rounded-lg"
        >
          Reset
        </button>

      </div>
    </div>
  );
}