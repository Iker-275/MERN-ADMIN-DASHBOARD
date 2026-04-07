import { useState, useEffect } from "react";
import { Customer, CreateCustomerPayload } from "../../types/CustomerType";
import { useCustomer } from "../../hooks/useCustomer";
import { useZones } from "../../hooks/useZone";
import { useVillage } from "../../hooks/useVillage";

import Select from "../customComponents/DropDowns";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";

interface Props {
  customer?: Customer;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CustomerForm({
  customer,
  onSuccess,
  onCancel
}: Props) {

  const { createCustomer, updateCustomer, saving } = useCustomer(customer?._id);

  const { zones } = useZones();
  const { villages } = useVillage();

  const [form, setForm] = useState<CreateCustomerPayload>({
    name: customer?.name || "",
    phone: customer?.phone || "",
    houseNo: customer?.houseNo || "",

    zoneId: customer?.zoneId || "",
    zoneCode: customer?.zoneCode || "",

    villageId: customer?.villageId || "",
    villageName: customer?.villageName || "",

    purpose: customer?.purpose || "domestic",
    businessName: customer?.businessName || "",

    collectorId: customer?.collectorId || "",
    collectorName: customer?.collectorName || "",

    previousBalance: customer?.balances?.previousBalance || 0,

    meter: {
      meterNo: customer?.meter?.meterNo || "",
      initialReading: customer?.meter?.initialReading || 0,
      currentReading: customer?.meter?.currentReading || 0
    },

    status: customer?.status || "active"
  });

  // Auto populate zoneCode + villageName
  useEffect(() => {

    const zone = zones.find((z: any) => z._id === form.zoneId);
    const village = villages.find((v: any) => v._id === form.villageId);

    if (zone) {
      setForm(prev => ({ ...prev, zoneCode: zone.code }));
    }

    if (village) {
      setForm(prev => ({ ...prev, villageName: village.name }));
    }

  }, [form.zoneId, form.villageId, zones, villages]);

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMeterChange = (field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      meter: {
        ...prev.meter,
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {

    if (customer) {

      await updateCustomer(form);

    } else {

      await createCustomer(form);

    }

    onSuccess?.();
  };

  const zoneOptions =
    zones?.map((z: any) => ({
      value: z._id,
      label: z.name
    })) || [];

  const villageOptions =
    villages
      ?.filter((v: any) => v.zoneId === form.zoneId)
      .map((v: any) => ({
        value: v._id,
        label: v.name
      })) || [];

  return (

    <div className="grid gap-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div>
          <Label>Customer Name</Label>
          <Input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div>
          <Label>House No</Label>
          <Input
            value={form.houseNo}
            onChange={(e) => handleChange("houseNo", e.target.value)}
          />
        </div>

        <div>
          <Label>Purpose</Label>
          <select
            value={form.purpose}
            onChange={(e) => handleChange("purpose", e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          >
            <option value="domestic">Domestic</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div>
          <Label>Zone</Label>
          <Select
            options={zoneOptions}
            placeholder="Select Zone"
            defaultValue={form.zoneId}
            onChange={(value) => handleChange("zoneId", value)}
          />
        </div>

        <div>
          <Label>Village</Label>
          <Select
            options={villageOptions}
            placeholder="Select Village"
            defaultValue={form.villageId}
            onChange={(value) => handleChange("villageId", value)}
          />
        </div>

      </div>

      {/* Meter Section */}

      <div className="border-t pt-5">

        <h4 className="font-semibold mb-4">
          Meter Information
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          <div>
            <Label>Meter Number</Label>
            <Input
              value={form.meter.meterNo}
              onChange={(e) =>
                handleMeterChange("meterNo", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Initial Reading</Label>
            <Input
              type="number"
              value={form.meter.initialReading}
              onChange={(e) =>
                handleMeterChange(
                  "initialReading",
                  Number(e.target.value)
                )
              }
            />
          </div>

          <div>
            <Label>Current Reading</Label>
            <Input
              type="number"
              value={form.meter.currentReading}
              onChange={(e) =>
                handleMeterChange(
                  "currentReading",
                  Number(e.target.value)
                )
              }
            />
          </div>

        </div>

      </div>

      {/* BALANCE */}
      <div className="border-t pt-5">

        <h4 className="font-semibold mb-4">
          Balance Information
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          <div>
            <Label>Previous Balance</Label>
            <Input
              type="number"
              value={form.previousBalance}
              onChange={(e) =>
                handleMeterChange("previousBalance", Number(e.target.value))
              }
            />
          </div>

         

        </div>

      </div>

      {/* Actions */}

      <div className="flex gap-3 pt-4">

        <Button variant="outline" onClick={handleSubmit} disabled={saving}>

          {saving
            ? "Saving..."
            : customer
            ? "Update Customer"
            : "Create Customer"}

        </Button>

        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}

      </div>

    </div>
  );
}