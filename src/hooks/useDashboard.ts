import { useEffect, useState } from "react";
import { dashboardService } from "../api/DashboardApi";
import { useDashboardContext } from "../context/DashboardContext";

export function useDashboard() {
  const { dashboard, setDashboard } = useDashboardContext();

  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await dashboardService.getDashboard();

      setDashboard(res.data);

    } catch (err: any) {
      alert(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    refresh: fetchDashboard
  };
}