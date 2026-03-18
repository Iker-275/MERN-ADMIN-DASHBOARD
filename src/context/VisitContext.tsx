import { createContext, useContext, useState } from "react";
import { Visit, Pagination, VisitFilters } from "../types/VisitType";

interface VisitContextType {
  visits: Visit[];
  pagination: Pagination | null;
  filters: VisitFilters;

  setVisits: (data: Visit[]) => void;
  setPagination: (p: Pagination | null) => void;
  setFilters: (f: VisitFilters) => void;
}

const VisitContext = createContext<VisitContextType | null>(null);

export function VisitProvider({ children }: any) {

  const [visits, setVisits] = useState<Visit[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [filters, setFilters] = useState<VisitFilters>({
    page: 1,
    limit: 10
  });

  return (
    <VisitContext.Provider
      value={{
        visits,
        pagination,
        filters,

        setVisits,
        setPagination,
        setFilters
      }}
    >
      {children}
    </VisitContext.Provider>
  );
}

export const useVisitContext = () => {
  const ctx = useContext(VisitContext);
  if (!ctx) throw new Error("VisitContext not found");
  return ctx;
};