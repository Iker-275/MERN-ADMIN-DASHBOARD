
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AppLayout from "../layout/AppLayout"
import Home from "../pages/Dashboard/Home";
import NotFound from "../pages/OtherPage/NotFound";
import SignIn from "../pages/AuthPages/SignIn"
import SignUp from "../pages/AuthPages/SignUp"
import Zones from "../pages/ZonePages/Zones";
import CreateZone from "../pages/ZonePages/CreateZones";
import EditZone from "../pages/ZonePages/EditZone";
import Villages from "../pages/VillagePages/Villages";
import CreateVillage from "../pages/VillagePages/CreateVillage";
import EditVillage from "../pages/VillagePages/UpdateVillage";
import Users from "../pages/UserPages/Users";
import EditUser from "../pages/UserPages/UpdateUsers";
import BillingPeriods from "../pages/PeriodPages/BillingPeriods";
import CreatePeriod from "../pages/PeriodPages/CreateBillingPeriod";
import Roles from "../pages/RolesPages/Roles";
import CreateRole from "../pages/RolesPages/CreateRoles";
import UpdateRole from "../pages/RolesPages/UpdateRoles";
import Rates from "../pages/RatesPages/Rates";
import CreateRate from "../pages/RatesPages/CreateRate";
import CustomersPage from "../pages/CustomerPages/CustomersPage";
import CustomerPage from "../pages/CustomerPages/CustomerPage";
import CreateCustomer from "../pages/CustomerPages/CustomerCreate";
import EditCustomer from "../pages/CustomerPages/CustomerEdit";
import BulkCreateCustomer from "../pages/CustomerPages/BulkUploadPage";
import { ProtectedRoute, AuthRoute } from "../pages/ProtectedRoute";
import BillingPage from "../pages/BillingPages/BillingPage";
import UnbilledPage from "../pages/BillingPages/UnbilledPage";
import PaymentsPage from "../pages/PaymentPages/PaymentPage";
import NotificationsPage from "../pages/NotificationPages/NotificationsPage";
import CreateNotification from "../pages/NotificationPages/CreateNotification";
import VisitsPage from "../pages/VisitPages/VisitPage";
import CreateVisitPage from "../pages/VisitPages/CreateVisit";





const AppRoutes = () => {
  return (
    <Router>

      <Routes>

        {/* PROTECTED DASHBOARD */}

        <Route element={<ProtectedRoute />}>

          <Route element={<AppLayout />}>

            <Route path="/" element={<Home />} />

            <Route path="/zones" element={<Zones />} />
            <Route path="/zones/create" element={<CreateZone />} />
            <Route path="/zones/edit/:id" element={<EditZone />} />

            <Route path="/villages" element={<Villages />} />
            <Route path="/villages/create" element={<CreateVillage />} />
            <Route path="/villages/edit/:id" element={<EditVillage />} />

            <Route path="/users" element={<Users />} />
            <Route path="/users/edit/:id" element={<EditUser />} />

            <Route path="/billing-periods" element={<BillingPeriods />} />
            <Route path="/billing-periods/create" element={<CreatePeriod />} />

            <Route path="/roles" element={<Roles />} />
            <Route path="/roles/create" element={<CreateRole />} />
            <Route path="/roles/edit/:id" element={<UpdateRole />} />

            <Route path="/rates" element={<Rates />} />
            <Route path="/rates/create" element={<CreateRate />} />

            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/:id" element={<CustomerPage />} />
            <Route path="/customers/create" element={<CreateCustomer />} />
            <Route path="/customers/create/bulk" element={<BulkCreateCustomer />} />
            <Route path="/customers/edit/:id" element={<EditCustomer />} />

            <Route path="/billings" element={<BillingPage />} />
            <Route path="/billings/unbilled" element={<UnbilledPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/notifications/create" element={<CreateNotification />} />
            <Route path="/visits" element={<VisitsPage />} />
            <Route path="/visits/create" element={<CreateVisitPage />} />

            <Route path="/visits/create/:customerId?" element={<CreateVisitPage />} />







          </Route>

        </Route>

        {/* AUTH PAGES */}
        <Route element={<AuthRoute />}>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

        </Route>

        {/* NOT FOUND */}

        <Route path="*" element={<NotFound />} />

      </Routes>

    </Router>
  );
};

export default AppRoutes;