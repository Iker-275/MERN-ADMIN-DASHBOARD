import { createContext, useContext, useState } from "react";
import { DashboardData } from "../types/DashboardType";

interface DashboardContextType {
  dashboard: DashboardData | null;
  setDashboard: (data: DashboardData) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: any) {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  return (
    <DashboardContext.Provider value={{ dashboard, setDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("DashboardContext not found");
  return ctx;
};