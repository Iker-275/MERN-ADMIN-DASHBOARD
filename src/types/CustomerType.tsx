import { CustomerStatement } from "./StatementType";

export interface MeterReading {
  _id: string;
  visitId: string;
  reading: number;
  date: string;
}

export interface Meter {
  meterNo: string;
  initialReading?: number;
  currentReading: number;
  lastReadAt?: string;
  readings?: MeterReading[];
}

export interface Balances {
  previousBalance?: number;
  expectedTotal?: number;
  totalPaid?: number;
  unpaid: number;
}

export interface Customer {
  _id: string;
  customerCode: string;

  houseNo: string;
  name: string;
  phone: string;

  purpose: "domestic" | "commercial";
  businessName?: string;

  zoneId: string;
  zoneCode: string;
  zoneName?: string;

  villageId: string;
  villageName: string;

  collectorId: string;
  collectorName: string;

  meter: Meter;

  balances: Balances;

  status: "active" | "disconnected";

  createdAt: string;
  updatedAt: string;
}

export interface CustomerFilters {
  zoneId?: string;
  villageId?: string;
  customerCode?: string;
  status?: string;
  collectorId?: string;

  phone?: string;
  name?: string;

  hasBalance?: boolean;
  minBalance?: number;
  maxBalance?: number;

  dateFrom?: string;
  dateTo?: string;
}

export interface CreateCustomerPayload {
  houseNo: string;
  phone: string;

  zoneCode: string;
  zoneId: string;

  name: string;

  purpose: "domestic" | "commercial";
  businessName?: string;

  villageId: string;
  villageName: string;

  collectorId: string;
  collectorName?: string;

  previousBalance?: number;

  meter: {
    meterNo: string;
    initialReading: number;
    currentReading: number;
  };

  status?: "active" | "disconnected";
}

export interface UpdateCustomerPayload {
  houseNo?: string;
  phone?: string;

  zoneCode?: string;
  zoneId?: string;

  name?: string;

  purpose?: "domestic" | "commercial";
  businessName?: string;

  villageId?: string;
  villageName?: string;

  meter?: {
    meterNo?: string;
    initialReading?: number;
    currentReading?: number;
  };
  previousBalance?: number;
  balances?: {
    previousBalance?: number;
    expectedTotal?: number;
    totalPaid?: number;
    unpaid?: number;
  };

  status?: "active" | "disconnected";
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface CustomersResponse {
  success: boolean;
  message: string;
  data: Customer[];
  pagination: Pagination;
}

export interface CustomerResponse {
  success: boolean;
  message: string;
  data: Customer;
}

export interface CustomerStatementResponse {
  success: boolean;
  message: string;
  data: CustomerStatement;
}
