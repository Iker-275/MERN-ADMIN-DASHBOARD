
import { useEffect, useState } from "react";
import { customerService } from "../api/CustomerApi";
import {
  Customer,
  CreateCustomerPayload,
  UpdateCustomerPayload
} from "../types/CustomerType";

export function useCustomer(id?: string) {

  const [customer, setCustomer] = useState<Customer | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // ===============================
  // Fetch Single Customer
  // ===============================
  const fetchCustomer = async () => {

    if (!id) return;

    try {

      setLoading(true);
      setError(null);

      const res = await customerService.getCustomer(id);

      setCustomer(res.data);

    } catch (err: any) {

      setError(err.message || "Failed to fetch customer");

    } finally {

      setLoading(false);

    }
  };

  // ===============================
  // Create Customer
  // ===============================
  const createCustomer = async (
    payload: CreateCustomerPayload
  ): Promise<Customer | null> => {

    try {

      setSaving(true);
      setError(null);

      const res = await customerService.createCustomer(payload);

      return res.data;

    } catch (err: any) {

      setError(err.message || "Failed to create customer");

      return null;

    } finally {

      setSaving(false);

    }
  };

  // ===============================
  // Update Customer
  // ===============================
  const updateCustomer = async (
    payload: UpdateCustomerPayload
  ): Promise<Customer | null> => {

    if (!id) return null;

    try {

      setSaving(true);
      setError(null);

      const res = await customerService.updateCustomer(id, payload);

      setCustomer(res.data);

      return res.data;

    } catch (err: any) {

      setError(err.message || "Failed to update customer");

      return null;

    } finally {

      setSaving(false);

    }
  };

  // ===============================
  // Load customer on mount
  // ===============================
  useEffect(() => {

    fetchCustomer();

  }, [id]);

  return {

    customer,

    loading,
    saving,
    error,

    fetchCustomer,
    refresh: fetchCustomer,

    createCustomer,
    updateCustomer

  };
}