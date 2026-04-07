import { useState } from "react";
import { customerService } from "../api/CustomerApi";

export function useCustomerBulkUpload() {

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {

    try {

      setUploading(true);
      setError(null);

      return await customerService.bulkUploadCustomers(file);

    } catch (err: any) {

      setError(err.message || "Upload failed");
      throw err;

    } finally {

      setUploading(false);

    }
  };

  return {
    upload,
    uploading,
    error
  };
}