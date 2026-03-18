import { useEffect, useState } from "react";
import { visitService } from "../api/VisitApi";
import { useVisitContext } from "../context/VisitContext";

export function useVisit() {

  const {
    visits,
    setVisits,
    pagination,
    setPagination,
    filters,
    setFilters
  } = useVisitContext();

  const [loading, setLoading] = useState(false);

 
  const fetchVisits = async () => {
    try {
      setLoading(true);

      const res = await visitService.getVisits(filters);

      setVisits(res.data);
      setPagination(res.pagination);

    } finally {
      setLoading(false);
    }
  };

  const createVisit = async (data: {
    customerId: string;
    collectorId: string;
    currentReading: number;
    notes?: string;
  }) => {

    const res = await visitService.createVisit(data);

    
    alert(res.message);

    fetchVisits();

    return res;
  };

  
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters({
      ...filters,
      ...newFilters,
      page: 1 
    });
  };

 
  const goToPage = (page: number) => {
    setFilters({
      ...filters,
      page
    });
  };
  const resetFilters = () => {
  setFilters({
    page: 1,
    limit: 10,
    customerId: undefined,
    zoneId: undefined,
    villageId: undefined,
    collectorId: undefined,
    dateFrom: undefined,
    dateTo: undefined
  });
};

  useEffect(() => {
    fetchVisits();
  }, [filters]);

  return {
    visits,
    pagination,
    filters,
    loading,
resetFilters,
    createVisit,
    updateFilters,
    goToPage,
    refresh: fetchVisits
  };
}