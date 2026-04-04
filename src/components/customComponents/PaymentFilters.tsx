import { useEffect } from "react";
import Select, { SelectOption } from "../customComponents/DropDowns";

import { useZones } from "../../hooks/useZone";
import { useVillage } from "../../hooks/useVillage";
import { useCustomers } from "../../hooks/useCustomers";

interface Props {
  filters: any;
  setFilters: (filters: any) => void;
}

export default function PaymentFilters({ filters, setFilters }: Props) {


  const { zones } = useZones();
  const { villages } = useVillage();
    const { customers } = useCustomers({});
  

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setFilters({
  //       ...filters,
        
  //     });
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [filters]);

  const zoneOptions: SelectOption[] =
    zones?.map((z: any) => ({
      value: z._id,
      label: z.name
    })) || [];

  const filteredVillages =
    villages?.filter((v: any) =>
      filters.zoneId ? v.zoneId === filters.zoneId : true
    ) || [];

  const villageOptions: SelectOption[] =
    filteredVillages.map((v: any) => ({
      value: v._id,
      label: v.name
    }));
     const customerOptions =
    customers?.map((c: any) => ({
      value: c._id,
      label: `${c.name} (${c.customerCode})`
    })) || [];

  return (

    <div className="flex flex-wrap gap-4 items-center">

      {/* SEARCH */}
      <div className="w-60">
        <Select
          options={customerOptions}
          placeholder="Customer"
          defaultValue={filters.customerId}
          onChange={(value) => setFilters({
              ...filters,
              customerId: value,
              // villageId: undefined
            })}
        />
      </div>

      

      {/* ZONE */}

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

      {/* VILLAGE */}

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

      {/* METHOD */}

      <select
        className="border rounded-lg px-3 py-2"
        onChange={(e) =>
          setFilters({
            ...filters,
            method: e.target.value
          })
        }
      >
        <option value="">All Methods</option>
        <option value="ACCOUNT">Account</option>
        <option value="CASH">Cash</option>
        <option value="ADJUSTMENT">Adjustment</option>
      </select>

      {/* STATUS */}

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
        <option value="CANCELLED">Cancelled</option>
      </select>

      {/* DATE RANGE */}

      <input
        type="date"
        onChange={(e) =>
          setFilters({
            ...filters,
            from: e.target.value
          })
        }
        className="border rounded-lg px-3 py-2"
      />

      <input
        type="date"
        onChange={(e) =>
          setFilters({
            ...filters,
            to: e.target.value
          })
        }
        className="border rounded-lg px-3 py-2"
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

  );
}