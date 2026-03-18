export interface VisitCustomer {
  _id: string;
  name: string;
  customerCode: string;
}

export interface Visit {
  _id: string;
  customerId: VisitCustomer | string;
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

export interface VisitFilters {
  page?: number;
  limit?: number;

  customerId?: string;
  zoneId?: string;
  villageId?: string;
  collectorId?: string;

  dateFrom?: string;
  dateTo?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface VisitResponse {
  success: boolean;
  message: string;
  data: Visit | Visit[];
  pagination?: Pagination | null;
}