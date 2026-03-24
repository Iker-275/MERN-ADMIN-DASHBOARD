
import { useState,useEffect } from "react";
import { useBillingPeriods } from "../../hooks/usePeriod";
import { useRates } from "../../hooks/useRate";
import { useZones } from "../../hooks/useZone";
import { useVillage } from "../../hooks/useVillage";
interface Props {
    open: boolean;
    runType: "GLOBAL" | "ZONE" | "VILLAGE" | "MANUAL";
    onClose: () => void;
    onRun: (data: any) => Promise<any>;
}

export default function BillingRunModal({
    open,
    runType,
    onClose,
    onRun
}: Props) {

    const { periods } = useBillingPeriods();
    const { rates } = useRates();
    const { zones } = useZones();
    const { villages } = useVillage();

    const [billingPeriod, setBillingPeriod] = useState("");
    const [rateId, setRateId] = useState("");
    const [zoneId, setZoneId] = useState("");
    const [villageId, setVillageId] = useState("");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    useEffect(() => {
  if (open) {
    setBillingPeriod("");
    setRateId("");
    setZoneId("");
    setVillageId("");
    setResult(null);
    setLoading(false);
  }
}, [open, runType]);

    if (!open) return null;

    const handleRun = async () => {

        try {

            setLoading(true);

            const res = await onRun({
                billingPeriod,
                rateId,
                zoneId,
                villageId
            });

            setResult(res.data);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

            <div className="bg-white rounded-xl w-[450px] p-6 shadow-xl">

                <h2 className="text-lg font-semibold mb-4">
                    Run {runType} Billing
                </h2>

                {!result && (

                    <div className="space-y-4">

                        {/* Billing Period */}

                        <select
                            className="w-full border rounded-lg px-3 py-2"
                            value={billingPeriod}
                            onChange={(e) => setBillingPeriod(e.target.value)}
                        >

                            <option value="">Select Billing Period</option>

                            {periods?.map((p: any) => (

                                <option key={p._id} value={p.period}>
                                    {p.period}
                                </option>

                            ))}

                        </select>

                        {/* Rate */}

                        <select
                            className="w-full border rounded-lg px-3 py-2"
                            value={rateId}
                            onChange={(e) => setRateId(e.target.value)}
                        >

                            <option value="">Select Rate</option>

                            {rates?.map((r: any) => (

                                <option key={r._id} value={r._id}>
                                    {r.pricingPerUnit}
                                </option>

                            ))}

                        </select>

                        {/* Zone */}

                        {runType === "ZONE" && (

                            <select
                                className="w-full border rounded-lg px-3 py-2"
                                value={zoneId}
                                onChange={(e) => setZoneId(e.target.value)}
                            >

                                <option value="">Select Zone</option>

                                {zones?.map((z: any) => (

                                    <option key={z._id} value={z._id}>
                                        {z.name}
                                    </option>

                                ))}

                            </select>

                        )}

                        {/* Village */}

                        {runType === "VILLAGE" && (

                            <select
                                className="w-full border rounded-lg px-3 py-2"
                                value={villageId}
                                onChange={(e) => setVillageId(e.target.value)}
                            >

                                <option value="">Select Village</option>

                                {villages?.map((v: any) => (

                                    <option key={v._id} value={v._id}>
                                        {v.name}
                                    </option>

                                ))}

                            </select>

                        )}

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={onClose}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleRun}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Run Billing
                            </button>

                        </div>

                    </div>

                )}

                {loading && (
                    <div className="py-6 text-center">
                        <div className="flex justify-center py-10">
                            <div className="animate-spin h-8 w-8 border-b-2 border-brand-500 rounded-full"></div>
                        </div>
                        Running billing...
                    </div>
                )}
               

                {result && (

                    <div className="space-y-3">

                        <h3 className="text-green-600 font-semibold">
                            Billing Completed
                        </h3>

                        <div className="bg-gray-50 p-4 rounded-lg text-sm">

                            <p>Total Customers: {result.stats.totalCustomers}</p>
                            <p>Billed: {result.stats.billed}</p>
                            <p>Unbilled: {result.stats.unbilled}</p>
                            <p>Failed: {result.stats.failed}</p>

                        </div>

                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg"
                        >
                            Close
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}