
import { useState } from "react";

import BillingFilters from "../../components/customComponents/BillingFilters";
import { BillingsTable } from "../../components/tables/BasicTables/BasicTableOne";
import BillingRunModal from "../../components/customComponents/BillingModal";

import { useBillings } from "../../hooks/useBillings";
import { useBillingRun } from "../../hooks/useBillingRun";
import { useAuth } from "../../hooks/useAuth";
import { billingService } from "../../api/BillingApi";
import PdfPreviewModal from "../../components/customComponents/PDFPreview";

export default function BillingPage() {

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const [openRunModal, setOpenRunModal] = useState(false);
  const [runType, setRunType] = useState<"GLOBAL" | "ZONE" | "VILLAGE">("GLOBAL");
   const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const { user } = useAuth();

  const { runGlobal, runZone, runVillage } = useBillingRun();

  const { billings, pagination, loading } = useBillings({
    page,
    limit: 10,
    filters
  });
  
  const previewPdf = async () => {
  
      const blob = await billingService.downloadBillingsReport(filters);
  
      const url = URL.createObjectURL(blob);
  
      setPdfUrl(url);
      setPdfOpen(true);
  
    };

  const handleRun = async (data: any) => {

    if (!user?._id) return;

    if (runType === "GLOBAL") {
      return runGlobal({
        billingPeriod: data.billingPeriod,
        rateId: data.rateId,
        userId: user._id
      });
    }

    if (runType === "ZONE") {
      return runZone(data.zoneId, {
        billingPeriod: data.billingPeriod,
        rateId: data.rateId,
        userId: user._id
      });
    }

    if (runType === "VILLAGE") {
      return runVillage(data.villageId, {
        billingPeriod: data.billingPeriod,
        rateId: data.rateId,
        userId: user._id
      });
    }
  };

  return (

    <div className="space-y-6">

      {/* FILTERS */}

      {/* <BillingFilters
        filters={filters}
        setFilters={setFilters}
        // setFilters={(f) => {
        //    setPage(1);
        //   setFilters(f);
        // }}
      /> */}
      <BillingFilters
  filters={filters}
  setFilters={(newFilters) => {
    setPage(1); // 🔥 CRITICAL FIX
    setFilters(newFilters);
  }}
/>

       {/* RUN MODAL */}

      <BillingRunModal
        open={openRunModal}
        runType={runType}
        onClose={() => setOpenRunModal(false)}
        onRun={handleRun}
      />

      {/* BILLINGS TABLE */}

      <BillingsTable
        billings={billings}
        loading={loading}
       onPreviewPdf={previewPdf}
        onBillAll={() => {
          setRunType("GLOBAL");
          setOpenRunModal(true);
        }}

        onBillZone={() => {
          setRunType("ZONE");
          setOpenRunModal(true);
        }}

        onBillVillage={() => {
          setRunType("VILLAGE");
          setOpenRunModal(true);
        }}
      />
      <PdfPreviewModal
              open={pdfOpen}
              url={pdfUrl}
              onClose={() => setPdfOpen(false)}
            />

     

      {/* PAGINATION */}

      {pagination && (

        <div className="flex justify-between items-center">

          <span className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <div className="flex gap-2">

            <button
              disabled={pagination.page === 1}
              onClick={() => setPage((p) => p - 1)}
              // onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
              // onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>

          </div>

        </div>

      )}

    </div>

  );
}