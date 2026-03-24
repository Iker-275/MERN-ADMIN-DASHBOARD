import { useCustomers } from "../../hooks/useCustomers";
import {CustomersTable} from "../../components/tables/BasicTables/BasicTableOne";
import CustomersFilters from "../../components/customComponents/CustomerFilters";
import { useState } from "react";
import { customerService } from "../../api/CustomerApi";
import PdfPreviewModal from "../../components/customComponents/PDFPreview";




export default function CustomersPage() {

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const {
    customers,
    pagination,
    loading,
    
  } = useCustomers(
    {
    page,
    limit: 10,
    filters
  }
);
const previewPdf = async () => {

    const blob = await customerService.downloadCustomersReport(filters);

    const url = URL.createObjectURL(blob);

    setPdfUrl(url);
    setPdfOpen(true);

  };

  return (
    <div className="space-y-6">

      <CustomersFilters
        filters={filters}
        setFilters={(f) => {
          setPage(1); // reset page when filters change
          setFilters(f);
        }}
      />

      <CustomersTable
        customers={customers}
        loading={loading}
        onPreviewPdf={previewPdf}
      />
       <PdfPreviewModal
              open={pdfOpen}
              url={pdfUrl}
              onClose={() => setPdfOpen(false)}
            />

      {pagination && (
        <div className="flex items-center justify-between mt-4">

          <span className="text-sm text-gray-500">
            Showing page {pagination.page} of {pagination.totalPages}
          </span>

          <div className="flex gap-2">

            <button
              disabled={pagination.page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage(page + 1)}
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