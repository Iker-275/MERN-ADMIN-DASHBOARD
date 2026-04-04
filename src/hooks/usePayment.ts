// ================= HOOK =================
// hooks/usePayments.ts

import { useContext, useEffect } from "react";
import { PaymentContext } from "../context/PaymentContext";

export const usePayments = (params: any) => {

  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error("usePayments must be used inside PaymentProvider");
  }

  const { fetchPayments, payments, pagination, loading } = context;

  useEffect(() => {
    fetchPayments(params);
  }, [params.page,JSON.stringify(params)]);

  return {
    payments,
    pagination,
    loading
  };
};
