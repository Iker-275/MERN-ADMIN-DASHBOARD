import { useParams, Link } from "react-router-dom";
import { useCustomer } from "../../hooks/useCustomer";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import CustomerForm from "../customforms/CustomerForm";
import { useEffect, useState } from "react";
import { usePayments } from "../../hooks/usePayment";
import { useBillings } from "../../hooks/useBillings";
import { useVisit } from "../../hooks/useVisit";
import { usePaymentActions } from "../../hooks/usePaymentActions";
import { useAuth } from "../../hooks/useAuth";
import { CustomerBillings, CustomerPayments, CustomerVisits } from "./CustomerAdditionalInfo";
import BillingRunModal from "./BillingModal";
import { useBillingRun } from "../../hooks/useBillingRun";

export default function CustomerInfoCard() {

  const { id } = useParams();
  const { customer, loading, fetchCustomer } = useCustomer(id);
  const { manualBill } = useBillingRun();
  const { isOpen, openModal, closeModal } = useModal();
  const [openRunModal, setOpenRunModal] = useState(false);

  const [activeModal, setActiveModal] = useState<
    "payments" | "billings" | "visits" | null
  >(null);
  const [runType, setRunType] = useState<"GLOBAL" | "ZONE" | "VILLAGE" | "MANUAL">("GLOBAL");
  const { clearSingle } = usePaymentActions();

  const { user } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);


  const handleSuccess = () => {
    alert("Customer created successfully");


  };

  const handleMakePayment = async () => {
    if (!amount) {
      alert("Enter amount");
      return;
    }

    try {
      setSubmitting(true);

      const res = await clearSingle({
        customerId: customer?._id,
        amountCents: Number(amount),
        method: "ACCOUNT",
        userId: user?._id
      });

      alert(res.message || "Payment successful");

      setIsPaymentModalOpen(false);
      setAmount("");

      // 🔥 refresh page OR just refresh payments
      fetchCustomer()
      //window.location.reload();
      // better: call payments refresh if you want smarter UX
      fetch
    } catch (err: any) {
      alert(err.message || "Failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRun = async (data: any) => {

    return manualBill(customer?._id, {
      billingPeriod: data.billingPeriod,
      rateId: data.rateId,
      userId: user?._id
    });

  };




  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">

        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            Customer Details
          </h4>

          <p className="text-sm text-gray-500">
            {customer.customerCode}
          </p>
        </div>

        <button
          onClick={openModal}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
        >
          Edit Customer
        </button>

      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">

        <Info label="Customer Name" value={customer.name} />
        <Info label="Phone" value={customer.phone} />

        <Info label="House No" value={customer.houseNo} />
        <Info label="Purpose" value={customer.purpose} />

        <Info label="Village" value={customer.villageName} />
        <Info label="Zone" value={customer.zoneCode} />

        <Info label="Collector" value={customer.collectorName} />

        <Info
          label="Status"
          value={customer.status}
          highlight
        />

      </div>

      {/* Meter Section */}
      <div className="mt-8">

        <h5 className="text-md font-semibold mb-4 text-gray-800 dark:text-white">
          Meter Information
        </h5>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          <Info label="Meter Number" value={customer.meter?.meterNo} />

          <Info
            label="Current Reading"
            value={customer.meter?.currentReading}
          />

          <Info
            label="Last Reading Date"
            value={
              customer.meter?.lastReadAt
                ? new Date(customer.meter.lastReadAt).toLocaleDateString()
                : "-"
            }
          />

        </div>

      </div>

      {/* Financial Section */}
      <div className="mt-8">

        <h5 className="text-md font-semibold mb-4 text-gray-800 dark:text-white">
          Financial Summary
        </h5>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          <Info
            label="Previous Balance"
            value={customer.balances?.previousBalance}
          />

          <Info
            label="Total Paid"
            value={customer.balances?.totalPaid}
          />

          <Info
            label="Outstanding Balance"
            value={customer.balances?.unpaid}
            highlight
          />

        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-start">

          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Make Payment
          </button>

          <button
            onClick={() => {
              setRunType("MANUAL");
              setOpenRunModal(true);
            }}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Bill Customer
          </button>

        </div>

      </div>



      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveModal("billings")}
          className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
        >
          Billings
        </button>

        <button
          onClick={() => setActiveModal("visits")}
          className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
        >
          Meter Visits
        </button>

        <button
          onClick={() => setActiveModal("payments")}
          className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
        >
          Payments
        </button>
      </div>
      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        className="max-w-[600px] m-4 p-6"
      >
        <h3 className="text-lg font-semibold mb-4 capitalize">
          {activeModal}
        </h3>

        {activeModal === "payments" && (
          <CustomerPayments customerId={customer._id} />
        )}

        {activeModal === "billings" && (
          <CustomerBillings customerId={customer._id} />
        )}

        {activeModal === "visits" && (
          <CustomerVisits customerId={customer._id} />
        )}
      </Modal>
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        className="max-w-[400px] m-4 p-6"
      >
        <h3 className="text-lg font-semibold mb-4">
          Make Payment
        </h3>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <button
            onClick={handleMakePayment}
            disabled={submitting}
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            {submitting ? "Processing..." : "Submit Payment"}
          </button>
        </div>
      </Modal>
      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">

        <div className="p-6">

          <h4 className="text-xl font-semibold mb-4">
            Edit Customer
          </h4>

          <CustomerForm
            customer={customer}
            onSuccess={handleSuccess}

          />

        </div>

      </Modal>

      <BillingRunModal
        open={openRunModal}
        runType={runType}
        onClose={() => setOpenRunModal(false)}
        onRun={handleRun}
      />

    </div>

  );
}

function Info({ label, value, highlight = false }: any) {
  return (
    <div>
      <p className="mb-1 text-xs text-gray-500">{label}</p>

      <p
        className={`text-sm font-medium ${highlight ? "text-red-600" : "text-gray-800 dark:text-white"
          }`}
      >
        {value ?? "-"}
      </p>
    </div>
  );
}


// export default function CustomerInfoCard() {
//   const { id } = useParams();

//   const { customer, loading, fetchCustomer } = useCustomer(id);
//   const { user } = useAuth();
//   const { clearSingle } = usePaymentActions();
//   const { manualBill } = useBillingRun();

//   const { isOpen, openModal, closeModal } = useModal();

//   const [activeModal, setActiveModal] = useState<
//     "payments" | "billings" | "visits" | null
//   >(null);

//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [openRunModal, setOpenRunModal] = useState(false);

//  if (loading) {
//     return (
//       <div className="flex justify-center py-10">
//         <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full"></div>
//       </div>
//     );
//   }
//   if (!customer) return null;

//   // ================= PAYMENT =================
//   const handleMakePayment = async (amount: number) => {
//     const res = await clearSingle({
//       customerId: customer._id,
//       amountCents: amount,
//       method: "ACCOUNT",
//       userId: user?._id
//     });

//     alert(res.message || "Payment successful");

//     fetchCustomer();
//   };

//   // ================= BILLING =================
//   const handleRun = async (data: any) => {
//     return manualBill(customer._id, {
//       billingPeriod: data.billingPeriod,
//       rateId: data.rateId,
//       userId: user?._id
//     });
//   };

//   return (
//     <div className="p-5 border rounded-2xl">

//       <CustomerHeader customer={customer} onEdit={openModal} />

//       {/* <CustomerDetails customer={customer} /> */}

//       <CustomerFinancialSection
//         customer={customer}
//         onMakePayment={() => setIsPaymentModalOpen(true)}
//         onRunBilling={() => setOpenRunModal(true)}
//       />

//       <CustomerQuickActions onOpen={setActiveModal} />

//       {/* DATA MODAL */}
//       <CustomerDataModal
//         type={activeModal}
//         customerId={customer._id}
//         onClose={() => setActiveModal(null)}
//       />

//       {/* PAYMENT MODAL */}
//       <PaymentModal
//         open={isPaymentModalOpen}
//         onClose={() => setIsPaymentModalOpen(false)}
//         onSubmit={handleMakePayment}
//       />

//       {/* EDIT MODAL */}
//       <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
//         <div className="p-6">
//           <h4 className="text-xl font-semibold mb-4">Edit Customer</h4>
//           <CustomerForm customer={customer} onSuccess={fetchCustomer} />
//         </div>
//       </Modal>

//       {/* BILLING MODAL */}
//       <BillingRunModal
//         open={openRunModal}
//         runType="MANUAL"
//         onClose={() => setOpenRunModal(false)}
//         onRun={handleRun}
//       />
//     </div>
//   );
// }

// function CustomerHeader({ customer, onEdit }: any) {
//   return (
//     <div className="flex justify-between mb-6">
//       <div>
//         <h4 className="text-lg font-semibold">Customer Details</h4>
//         <p className="text-sm text-gray-500">{customer.customerCode}</p>
//       </div>

//       <button onClick={onEdit} className="btn-primary">
//         Edit
//       </button>
//     </div>
//   );
// }

// function CustomerFinancialSection({ customer, onMakePayment, onRunBilling }: any) {
//   return (
//     <div className="mt-8">
//       <h5 className="font-semibold mb-4">Financial Summary</h5>

//       <div className="grid grid-cols-3 gap-4">
//         <Info label="Previous Balance" value={customer.balances?.previousBalance} />
//         <Info label="Total Paid" value={customer.balances?.totalPaid} />
//         <Info label="Outstanding" value={customer.balances?.unpaid} highlight />
//       </div>

//       <div className="flex gap-3 mt-4">
//         <button onClick={onMakePayment} className="btn-success">
//           Make Payment
//         </button>

//         <button onClick={onRunBilling} className="btn-purple">
//           Run Billing
//         </button>
//       </div>
//     </div>
//   );
// }

// function CustomerQuickActions({ onOpen }: any) {
//   return (
//     <div className="mt-10 flex gap-3">
//       <button onClick={() => onOpen("billings")} className="btn-light">Billings</button>
//       <button onClick={() => onOpen("visits")} className="btn-light">Visits</button>
//       <button onClick={() => onOpen("payments")} className="btn-light">Payments</button>
//     </div>
//   );
// }

// function CustomerDataModal({ type, customerId, onClose }: any) {
//   if (!type) return null;

//   return (
//     <Modal isOpen={!!type} onClose={onClose} className="max-w-[600px] m-4 p-6">
//       <h3 className="text-lg font-semibold mb-4 capitalize">{type}</h3>

//       {type === "payments" && <CustomerPayments customerId={customerId} />}
//       {type === "billings" && <CustomerBillings customerId={customerId} />}
//       {type === "visits" && <CustomerVisits customerId={customerId} />}
//     </Modal>
//   );
// }

// function PaymentModal({ open, onClose, onSubmit }: any) {
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!open) return null;

//   const handleSubmit = async () => {
//     if (!amount) return alert("Enter amount");

//     try {
//       setLoading(true);
//       await onSubmit(Number(amount));
//       onClose();
//       setAmount("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal isOpen={open} onClose={onClose} className="max-w-[400px] m-4 p-6">
//       <h3 className="text-lg font-semibold mb-4">Make Payment</h3>

//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="w-full border px-3 py-2 rounded-lg"
//         placeholder="Enter amount"
//       />

//       <button
//         onClick={handleSubmit}
//         className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg"
//       >
//         {loading ? "Processing..." : "Submit"}
//       </button>
//     </Modal>
//   );
// }