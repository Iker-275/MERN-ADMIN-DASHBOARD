import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";

import { ThemeProvider } from "./context/ThemeContext.tsx";

import { AppWrapper } from './components/common/PageMeta.tsx';
import { ZoneProvider } from './context/ZonesContext.tsx';
import { VillageProvider } from './context/VillageContext.tsx';
import { RoleProvider } from './context/RoleContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { BillingPeriodProvider } from './context/BillingPeriodContext.tsx';
import { RateProvider } from './context/RateContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { PaymentProvider } from './context/PaymentContext.tsx';
import { NotificationProvider } from "./context/NotificationContext.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <ThemeProvider>
      <AuthProvider>
        <AppWrapper>
          <NotificationProvider>
          <ZoneProvider>
            <VillageProvider>
              <UserProvider>

                <RoleProvider>
                  <RateProvider>
                    {/* <BillingContext> */}
                      <BillingPeriodProvider>
                        <PaymentProvider>
                          <App />
                        </PaymentProvider>
                      </BillingPeriodProvider>
                    {/* </BillingContext> */}
                  </RateProvider>
                </RoleProvider>
              </UserProvider>
            </VillageProvider>
          </ZoneProvider>
          </NotificationProvider>
        </AppWrapper>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);


