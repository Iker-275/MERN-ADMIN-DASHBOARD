
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Select from "../../components/customComponents/DropDowns";
import Button from "../../components/ui/button/Button";
import { useZones } from "../../hooks/useZone";
import { useVillage } from "../../hooks/useVillage";
import { useCustomers } from "../../hooks/useCustomers";
import { useVisit } from "../../hooks/useVisit";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";



export default function CreateVisitPage() {
    const { customerId } = useParams<{ customerId: string }>();
    const nav = useNavigate();
  const { user } = useAuth();
  const { zones } = useZones();
  const { villages } = useVillage();
  const { customers } = useCustomers({});
  const { createVisit } = useVisit();

  // Form state
  const [selectedZone, setSelectedZone] = useState<string | undefined>();
  const [selectedVillage, setSelectedVillage] = useState<string | undefined>();
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(customerId);
  const [currentReading, setCurrentReading] = useState<number | undefined>();
  const [notes, setNotes] = useState<string>("");

  // Track last reading for selected customer
  const [lastReading, setLastReading] = useState<number>(0);

  // Filter villages and customers based on selections
  const filteredVillages = villages?.filter((v: any) =>
    selectedZone ? v.zoneId === selectedZone : true
  );

  const filteredCustomers = customers?.filter((c: any) => {
    if (!selectedZone && !selectedVillage) return true;
    return (
      (!selectedZone || c.zoneId === selectedZone) &&
      (!selectedVillage || c.villageId === selectedVillage)
    );
  });

  // Map options for selects
  const zoneOptions = zones?.map((z: any) => ({ value: z._id, label: z.name })) || [];
  const villageOptions = filteredVillages?.map((v: any) => ({
    value: v._id,
    label: v.villageName || v.name
  })) || [];
  const customerOptions = filteredCustomers?.map((c: any) => ({
    value: c._id,
    label: `${c.name} (${c.customerCode})`
  })) || [];

  // Update lastReading when a customer is selected
  useEffect(() => {
    if (selectedCustomer) {
      const customer = customers?.find((c: any) => c._id === selectedCustomer);
      setLastReading(customer?.meter.currentReading ?? 0);
      // Reset current reading to last reading as a starting point
    //  setCurrentReading(customer?.meter.currentReading ?? 0);
    } else {
      setLastReading(0);
     // setCurrentReading(undefined);
    }
  }, [selectedCustomer, customers]);

  const handleSubmit = async () => {
    if (!selectedCustomer) {
      alert("Please select a customer");
      return;
    }

    if (currentReading === undefined || currentReading === null) {
      alert("Current reading is required");
      return;
    }

    if (currentReading < lastReading) {
      alert(`Current reading cannot be less than last reading (${lastReading})`);
      return;
    }

    await createVisit({
      customerId: selectedCustomer,
      collectorId: user?._id ?? "",
      currentReading,
      notes
    });

    // Reset form if not coming from customer page
    if (!customerId) {
      setSelectedZone(undefined);
      setSelectedVillage(undefined);
      setSelectedCustomer(undefined);
      setCurrentReading(undefined);
      setNotes("");
      setLastReading(0);
    }
    nav(-1);
  };

  return (
    <div className="space-y-6">
      <ComponentCard title="Create Visit">
        <div className="flex flex-col gap-4">

          {/* Zone/Village/Customer selects if not coming from customer page */}
          {!customerId && (
            <>
              <div className="w-60">
                <Select
                  options={zoneOptions}
                  placeholder="Select Zone"
                  defaultValue={selectedZone}
                  onChange={(val) => {
                    setSelectedZone(val);
                    setSelectedVillage(undefined);
                    setSelectedCustomer(undefined);
                  }}
                />
              </div>

              <div className="w-60">
                <Select
                  options={villageOptions}
                  placeholder="Select Village"
                  defaultValue={selectedVillage}
                  onChange={(val) => {
                    setSelectedVillage(val);
                    setSelectedCustomer(undefined);
                  }}
                  disabled={!selectedZone}
                />
              </div>

              <div className="w-60">
                <Select
                  options={customerOptions}
                  placeholder="Select Customer"
                  defaultValue={selectedCustomer}
                  onChange={(val) => setSelectedCustomer(val)}
                  disabled={!selectedVillage}
                />
              </div>
            </>
          )}

          {/* Show last reading if customer selected */}
          {selectedCustomer && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last recorded reading: {lastReading}
            </p>
          )}

          {/* Current Reading input */}
          <Input
            type="number"
            placeholder="Current Reading"
            value={currentReading ?? ""}
            onChange={(e) => setCurrentReading(Number(e.target.value))}
           min={lastReading.toString()} 
          />

          {/* Notes */}
          <TextArea
            placeholder="Notes (optional)"
            value={notes}
            onChange={setNotes}
          />

          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Record Visit</Button>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}