// ================= PAYMENTS PAGE =================
// pages/PaymentsPage.tsx

import { useState } from "react";

import PaymentFilters from "../../components/customComponents/PaymentFilters";
import { PaymentsTable } from "../../components/tables/BasicTables/BasicTableOne";
import CancelPaymentModal from "../../components/customComponents/CancelPaymentModal";
import PdfPreviewModal from "../../components/customComponents/PDFPreview";

import { usePayments } from "../../hooks/usePayment";
import { usePaymentActions } from "../../hooks/usePaymentActions";
import { useAuth } from "../../hooks/useAuth";
import PaymentReceiptModal from "../../components/customComponents/ReceiptModal";

export default function PaymentsPage() {

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [receiptOpen, setReceiptOpen] = useState(false);


  // const { payments, pagination, loading, } = usePayments(filters
    
  // );
const { payments, pagination, loading } = usePayments({
  page,
  limit: 10,
  ...filters
});
  const { cancel, getPdf } = usePaymentActions();
  const { user } = useAuth();

  const handleCancel = async ({ paymentId, reason }: any) => {

    if (!user?._id) return;

    const res = await cancel(paymentId, {
      userId: user._id,
      reason
    });



    return res;
  };

  const previewPdf = async () => {

    const blob = await getPdf(filters);


    const url = URL.createObjectURL(blob);

    setPdfUrl(url);
    setPdfOpen(true);
  };

  return (

    <div className="space-y-6">

      {/* FILTERS */}

      {/* <PaymentFilters
        filters={filters}
        setFilters={setFilters}
      
      /> */}
      <PaymentFilters
  filters={filters}
  setFilters={(newFilters) => {
    setPage(1); // 🔥 critical
    setFilters(newFilters);
  }}
/>

      {/* TABLE */}

      <PaymentsTable
        payments={payments}
        loading={loading}
        onPreviewPdf={previewPdf}
        onCancel={(id) => {
          setSelectedPayment(id);
          setCancelOpen(true);
        }}
        onView={(id) => { setSelectedPayment(id); setReceiptOpen(true); }}
      />

      {/* CANCEL MODAL */}

      <CancelPaymentModal
        open={cancelOpen}
        paymentId={selectedPayment}
        onClose={() => {
          setCancelOpen(false);
          setSelectedPayment(null);
        }}
        onConfirm={handleCancel}
      />
      <PaymentReceiptModal
        open={receiptOpen}
        paymentId={selectedPayment}
        onClose={() => setReceiptOpen(false)}
      />

      {/* PDF MODAL */}

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
