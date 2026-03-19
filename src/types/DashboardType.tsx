import { Pagination } from "./NotificationType"; // reuse if already exists

// ================= VISITS =================
export interface Visit {
  _id: string;
  customerId: {
    _id: string;
    customerCode: string;
    name: string;
  };
  collectorId: string;
  lastReading: number;
  currentReading: number;
  isBilled: boolean;
  notes?: string;
  dateOfVisit: string;
  visitedAt: string;
  createdAt: string;
  updatedAt: string;
}

// ================= PAYMENTS =================
export interface Payment {
  _id: string;
  customerId: {
    _id: string;
    customerCode: string;
    name: string;
  };
  amountCents: number;
  currency: string;
  method: string;
  status: string;
  receivedAt: string;
}

// ================= TREND =================
export interface BillingTrend {
  month: string;
  billed: number;
  paid: number;
}

// ================= DASHBOARD =================
export interface DashboardData {
  currentMonth: string;

  visits: {
    total: number;
    recent: Visit[];
  };

  customers: {
    total: number;
  };

  billingVsPayments: {
    totalBilled: number;
    totalPayments: number;
  };

  billingVsPaymentsTrend: BillingTrend[];

  payments: {
    total: number;
    recent: Payment[];
  };
}

// ================= RESPONSE =================
export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
  pagination?: Pagination | null;
}