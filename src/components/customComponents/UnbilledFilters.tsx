import { useBillingPeriods } from "../../hooks/usePeriod";
import { useZones } from "../../hooks/useZone";
import { useVillage } from "../../hooks/useVillage";
import Select from "./DropDowns";

export default function UnbilledFilters({ filters, setFilters }: any) {

  const { periods } = useBillingPeriods();
  const { zones } = useZones();
  const { villages } = useVillage();

  const periodOptions =
    periods?.map((p: any) => ({
      value: p.period,
      label: p.period
    })) || [];

  const zoneOptions =
    zones?.map((z: any) => ({
      value: z._id,
      label: z.name
    })) || [];

  const villageOptions =
    villages?.map((v: any) => ({
      value: v._id,
      label: v.name
    })) || [];

  return (

    <div className="flex flex-wrap gap-3">

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

      <div className="w-52">

        <Select
          options={zoneOptions}
          placeholder="Zone"
          defaultValue={filters.zoneId}
          onChange={(value) =>
            setFilters({
              ...filters,
              zoneId: value
            })
          }
        />

      </div>

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