import { CustomerFilters } from "../../types/CustomerType";
import { useState, useEffect } from "react";


interface Props {
  filters: CustomerFilters;
  setFilters: (filters: CustomerFilters) => void;
  onClear: () => void;
}


import Select, { SelectOption } from "../customComponents/DropDowns";

import { useZones } from "../../hooks/useZone";
import { useVillage } from "../../hooks/useVillage";

interface Props {
  filters: CustomerFilters;
  setFilters: (filters: CustomerFilters) => void;
}

export default function CustomersFilters({ filters, setFilters ,onClear}: Props) {

  const [search, setSearch] = useState(filters.name || "");

  const { zones } = useZones();
  const { villages } = useVillage();

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({
        ...filters,
        name: search,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Convert zones → Select options
  const zoneOptions: SelectOption[] =
    zones?.map((z: any) => ({
      value: z._id,
      label: z.zoneName || z.name,
    })) || [];

  // Filter villages by selected zone
  const filteredVillages =
    villages?.filter((v: any) =>
      filters.zoneId ? v.zoneId === filters.zoneId : true
    ) || [];

  const villageOptions: SelectOption[] = filteredVillages.map((v: any) => ({
    value: v._id,
    label: v.villageName || v.name,
  }));

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between">

      <div className="flex gap-3 flex-wrap">

        {/* Search Name */}
        <input
          type="text"
          placeholder="Search customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-64"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) =>
            setFilters({
              ...filters,
              phone: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2"
        />

        {/* Zone Filter */}
        <div className="w-56">
          <Select
            options={zoneOptions}
            placeholder="Select Zone"
            defaultValue={filters.zoneId}
            onChange={(value) =>
              setFilters({
                ...filters,
                zoneId: value,
                villageId: undefined, // reset village when zone changes
              })
            }
          />
        </div>

        {/* Village Filter */}
        <div className="w-56">
          <Select
            options={villageOptions}
            placeholder="Select Village"
            defaultValue={filters.villageId}
            onChange={(value) =>
              setFilters({
                ...filters,
                villageId: value,
              })
            }
          />
        </div>

        {/* Status */}
        <select
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="disconnected">Disconnected</option>
        </select>

        {/* Balance */}
        <select
          onChange={(e) =>
            setFilters({
              ...filters,
              hasBalance:
                e.target.value === ""
                  ? undefined
                  : e.target.value === "true",
            })
          }
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Balances</option>
          <option value="true">Has Balance</option>
          <option value="false">No Balance</option>
        </select>

        <button
    onClick={onClear}
    className="
      px-4 py-2 
      text-sm 
      font-medium 
      text-gray-600 
      bg-gray-100 
      rounded-lg 
      hover:bg-gray-200 
      transition
    "
  >
    Clear Filters
  </button>

      </div>

    </div>
  );
}