import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { Link } from "react-router";
import { useZones } from "../../../hooks/useZone";
import { useVillage } from "../../../hooks/useVillage";
import { useUsers } from "../../../hooks/useUser";
import { useRoles } from "../../../hooks/useRoles";
import { useBillingPeriods } from "../../../hooks/usePeriod";
import { useRates } from "../../../hooks/useRate";
import { Customer } from "../../../types/CustomerType";
import { useState } from "react";
import BillingRunModal from "../../customComponents/BillingModal";
import { useBillingRun } from "../../../hooks/useBillingRun";
import { useVisit } from "../../../hooks/useVisit";


function ZoneTable() {
  const { zones, loading, removeZone, pagination, fetchZones } = useZones();

  if (loading) return <div className="flex justify-center py-10">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
  </div>;
  //  <p>Loading zones...</p>;

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link
          to="/zones/create"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          + Create Zone
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">


          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">

              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Code</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Name</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {zones.map((zone) => (
                <TableRow key={zone._id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">{zone.code}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">{zone.name}</TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {zone.isActive ? "Active" : "Inactive"}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        to={`/zones/edit/${zone._id}`}
                        className="text-blue-500"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => removeZone(zone._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Pagination */}
      {pagination && (
        <div className="flex gap-3 mt-4">
          <button
            disabled={pagination.page === 1}
            onClick={() => fetchZones(pagination.page - 1)}
          >
            Prev
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => fetchZones(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      )}

    </>
  );
}



function VillageTable() {
  const { villages, loading, deleteVillage, pagination, fetchVillages } =
    useVillage();

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );

  return (
    <>
      {/* Create Button */}
      <div className="flex justify-end mb-4">
        <Link
          to="/villages/create"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          + Create Village
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Zone Code
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Village Code
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Village Name
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {villages.map((village) => (
                <TableRow key={village._id}>
                  <TableCell className="px-5 py-4 text-start">
                    {village.zoneCode}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start">
                    {village.code}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start">
                    {village.name}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start">
                    <Badge size="sm" color={village.isActive ? "success" : "error"}>
                      {village.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {/* {village.isActive ? "Active" : "Inactive"} */}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        to={`/villages/edit/${village._id}`}
                        className="text-blue-500"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteVillage(village._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex gap-3 mt-4 items-center">
          <button
            className="px-3 py-1 border rounded"
            disabled={pagination.page === 1}
            onClick={() => fetchVillages(pagination.page - 1)}
          >
            Prev
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            className="px-3 py-1 border rounded"
            disabled={pagination.page === pagination.totalPages}
            onClick={() => fetchVillages(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

function UsersTable() {
  const { loading, users, deleteUser } = useUsers();

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link
          to="/users/create"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          + Create User
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  User Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Role
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  CreatedAt
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">

              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="px-5 py-4 text-start">

                    {user.email}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start">

                    {user.role}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start">

                    <Badge
                      size="sm"
                      color={
                        user.active === true
                          ? "success"
                          : user.active === false
                            ? "warning"
                            : "error"
                      }
                    >
                      {user.active.toString() === "true" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">

                    {user.createdAt}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        to={`/users/edit/${user._id}`}
                        className="text-blue-500"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}


function PeriodsTable() {
  const { loading, periods, deletePeriod, closePeriod, lockPeriod, pagination, fetchPeriods } =
    useBillingPeriods();

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link
          to="/billing-periods/create"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          + Create Period
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3">Period</TableCell>
                <TableCell isHeader className="px-5 py-3">Notes</TableCell>
                <TableCell isHeader className="px-5 py-3">Status</TableCell>
                <TableCell isHeader className="px-5 py-3">Created</TableCell>
                <TableCell isHeader className="px-5 py-3">Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {periods.map((period) => (
                <TableRow key={period._id}>
                  <TableCell className="px-5 py-4">
                    {period.period}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    {period.notes}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <Badge
                      size="sm"
                      color={
                        period.status === "OPEN"
                          ? "success"
                          : period.status === "CLOSED"
                            ? "warning"
                            : "error"
                      }
                    >
                      {period.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    {new Date(period.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-3">

                      {period.status === "OPEN" && (
                        <button
                          onClick={() => closePeriod(period._id)}
                          className="text-yellow-500"
                        >
                          Close
                        </button>
                      )}

                      {period.status === "CLOSED" && (
                        <button
                          onClick={() => lockPeriod(period._id)}
                          className="text-purple-500"
                        >
                          Lock
                        </button>
                      )}

                      <button
                        onClick={() => deletePeriod(period._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>

                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Pagination */}
      {pagination && (
        <div className="flex gap-3 mt-4">
          <button
            disabled={pagination.page === 1}
            onClick={() => fetchPeriods(pagination.page - 1)}
          >
            Prev
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => fetchPeriods(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

function RolesTable() {
  const { loading, roles, deleteRole } = useRoles();

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link
          to="/roles/create"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          + Create Role
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">

          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>

                <TableCell isHeader className="px-5 py-3 text-start">
                  Name
                </TableCell>

                <TableCell isHeader className="px-5 py-3 text-start">
                  Description
                </TableCell>

                <TableCell isHeader className="px-5 py-3 text-start">
                  Status
                </TableCell>

                <TableCell isHeader className="px-5 py-3 text-start">
                  Created At
                </TableCell>

                <TableCell isHeader className="px-5 py-3 text-start">
                  Actions
                </TableCell>

              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">

              {roles.map((role) => (
                <TableRow key={role._id}>

                  <TableCell className="px-5 py-4 text-start">
                    {role.name}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start">
                    {role.description}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start">

                    <Badge
                      size="sm"
                      color={role.active ? "success" : "error"}
                    >
                      {role.active ? "Active" : "Inactive"}
                    </Badge>

                  </TableCell>

                  <TableCell className="px-5 py-4 text-start">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-3">

                      <Link
                        to={`/roles/edit/${role._id}`}
                        className="text-blue-500"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteRole(role._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>

                    </div>
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>
          </Table>

        </div>
      </div>
    </>
  );
}

function RatesTable() {
  const { loading, rates, deleteRate } = useRates();

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link
          to="/rates/create"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          + Create Rate
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3">
                  Pricing Per Unit
                </TableCell>

                <TableCell isHeader className="px-5 py-3">
                  Currency
                </TableCell>

                <TableCell isHeader className="px-5 py-3">
                  Discount Type
                </TableCell>

                <TableCell isHeader className="px-5 py-3">
                  Discount Value
                </TableCell>

                <TableCell isHeader className="px-5 py-3">
                  Created
                </TableCell>

                <TableCell isHeader className="px-5 py-3">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {rates.map((rate) => (
                <TableRow key={rate._id}>

                  <TableCell className="px-5 py-4">
                    {rate.pricingPerUnit}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    {rate.currency}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    {rate.discount.type}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    {rate.discount.value}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    {new Date(rate.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <button
                      onClick={() => deleteRate(rate._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}


interface Props {
  customers: Customer[];
  loading: boolean;
}




function CustomersTable({ customers, loading }: Props) {

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-end gap-3 mb-6">

        <Link
          to="/customers/create/bulk"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Bulk Upload Customers
        </Link>

        <Link
          to="/customers/create"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Customer
        </Link>

      </div>


      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="max-w-full overflow-x-auto">

          <Table>

            <TableHeader>

              <TableRow>

                <TableCell isHeader>Customer</TableCell>
                <TableCell isHeader>Phone</TableCell>
                <TableCell isHeader>Village</TableCell>
                <TableCell isHeader>Zone</TableCell>
                <TableCell isHeader>Meter</TableCell>
                <TableCell isHeader>Balance</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Actions</TableCell>

              </TableRow>

            </TableHeader>

            <TableBody>

              {customers?.map((customer) => (

                <TableRow key={customer._id}>

                  <TableCell className="px-5 py-4">

                    <div>

                      <div className="font-medium text-gray-800">
                        {customer.name}
                      </div>

                      <div className="text-xs text-gray-500">
                        {customer.customerCode}
                      </div>

                    </div>

                  </TableCell>

                  <TableCell>
                    {customer.phone}
                  </TableCell>

                  <TableCell>
                    {customer.villageName}
                  </TableCell>

                  <TableCell>
                    {customer.zoneCode}
                  </TableCell>

                  <TableCell>
                    {customer.meter?.meterNo}
                  </TableCell>

                  <TableCell>

                    <span
                      className={
                        customer.balances?.unpaid > 0
                          ? "text-red-600 font-medium"
                          : "text-green-600"
                      }
                    >
                      {customer.balances?.unpaid}
                    </span>

                  </TableCell>

                  <TableCell>

                    <Badge
                      size="sm"
                      color={
                        customer.status === "active"
                          ? "success"
                          : "error"
                      }
                    >
                      {customer.status}
                    </Badge>

                  </TableCell>

                  <TableCell>

                    <div className="flex gap-3">

                      <Link
                        to={`/customers/${customer._id}`}
                        className="text-green-600"
                      >
                        View
                      </Link>


                      <Link
                        to={`/visits/create/${customer._id}`}
                         className="text-blue-600"
                      >
                         Visit
                      </Link>


                      <Link
                        to={`/customers/edit/${customer._id}`}
                        className="text-blue-600"
                      >
                        Edit
                      </Link>

                    </div>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </div>

      </div>

    </>
  );
}



interface Props2 {
  billings: any[];
  loading: boolean;

  onBillAll: () => void;
  onBillZone: () => void;
  onBillVillage: () => void;
  onPreviewPdf: () => void;
}


function BillingsTable({ billings, loading, onBillAll, onBillVillage, onBillZone, onPreviewPdf }: Props2) {

  const [openRunModal, setOpenRunModal] = useState(false);
  const [runType, setRunType] = useState<"GLOBAL" | "ZONE" | "VILLAGE">("GLOBAL");

  const { runGlobal, runZone, runVillage } = useBillingRun();

  const handleRun = async (data: any) => {

    if (runType === "GLOBAL") {
      setRunType("GLOBAL")

      return runGlobal(data.billingPeriod,);

    }

    if (runType === "ZONE") {

      return runZone(data.zoneId, data.billingPeriod,);

    }

    if (runType === "VILLAGE") {

      return runVillage(data.villageId, data.billingPeriod,);

    }

  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-b-2 border-brand-500 rounded-full"></div>
      </div>
    );

  return (
    <>

      {/* ACTION BUTTONS */}

      <div className="flex justify-end gap-3 mb-4">
        <div className="flex justify-end">

          <button
            onClick={onPreviewPdf}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Preview PDF
          </button>

        </div>

        <button
          onClick={onBillAll}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Bill All Customers
        </button>

        <button
          onClick={onBillZone}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Bill Zone
        </button>

        <button
          onClick={onBillVillage}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          Bill Village
        </button>
        <div className="flex justify-end mb-4">
          <Link
            to="/billings/unbilled"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
          >
            Unbilled
          </Link>
        </div>

      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="max-w-full overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-5 py-3 text-left">Customer</th>
                <th>Period</th>
                <th>Units</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {billings?.map((bill) => (

                <tr key={bill._id} className="border-t">

                  <td className="px-5 py-4">

                    <div>

                      <div className="font-medium">
                        {bill.customerId?.name}
                      </div>

                      <div className="text-xs text-gray-500">
                        {bill.customerId?.customerCode}
                      </div>

                    </div>

                  </td>

                  <td>{bill.billingPeriod}</td>

                  <td>{bill.unitsConsumed}</td>

                  <td>{bill.ratePerUnit}</td>

                  <td className="font-medium">{bill.totalAmount}</td>

                  <td>{bill.status}</td>

                  <td>

                    <div className="flex gap-3">

                      <Link
                        to={`/billing/${bill._id}`}
                        className="text-green-600"
                      >
                        View
                      </Link>

                      <button className="text-yellow-600">
                        Adjust
                      </button>

                      <button className="text-red-600">
                        Reverse
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL */}

      <BillingRunModal
        open={openRunModal}
        runType={runType}
        onClose={() => setOpenRunModal(false)}
        onRun={handleRun}
      />

    </>
  );
}

function UnbilledTable({ unbilled, loading, onPreviewPdf }: any) {

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-b-2 border-brand-500 rounded-full"></div>
      </div>
    );

  return (

    <div className="space-y-4">

      <div className="flex justify-end">

        <button
          onClick={onPreviewPdf}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Preview PDF
        </button>

      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="max-w-full overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-5 py-3 text-left">Customer</th>
                <th>House</th>
                <th>Village</th>
                <th>Zone</th>
                <th>Reason</th>
                <th>Unpaid</th>

              </tr>

            </thead>

            <tbody>

              {unbilled?.map((item: any) => (

                <tr key={item._id} className="border-t">

                  <td className="px-5 py-4">

                    <div className="font-medium">
                      {item.customerId?.name}
                    </div>

                    <div className="text-xs text-gray-500">
                      {item.customerId?.customerCode}
                    </div>

                  </td>

                  <td>{item.customerId?.houseNo}</td>

                  <td>{item.customerId?.villageId?.name}</td>

                  <td>{item.customerId?.zoneId?.name}</td>

                  <td className="text-red-600 font-medium">
                    {item.reason}
                  </td>

                  <td>
                    {item.customerId?.balances?.unpaid}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}



interface Props3 {
  payments: any[];
  loading: boolean;
  onCancel: (paymentId: string) => void;
  onPreviewPdf: () => void;
  onView: (paymentId: string) => void;

}

function PaymentsTable({
  payments,
  loading,
  onCancel,
  onPreviewPdf, onView
}: Props3) {

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-b-2 border-brand-500 rounded-full"></div>
      </div>
    );

  return (
    <>

      {/* ACTION BAR */}

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

        <div>
          <button
            onClick={onPreviewPdf}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Preview Report
          </button>
        </div>

      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="max-w-full overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr>
                <th className="px-5 py-3 text-left">Customer</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {payments?.map((payment) => (

                <tr key={payment._id} className="border-t">

                  {/* CUSTOMER */}

                  <td className="px-5 py-4">

                    <div>
                      <div className="font-medium">
                        {payment.customerId?.name}
                      </div>

                      <div className="text-xs text-gray-500">
                        {payment.customerId?.customerCode}
                      </div>
                    </div>

                  </td>

                  {/* AMOUNT */}

                  <td
                    className={`font-medium ${payment.amountCents < 0
                        ? "text-red-600"
                        : "text-green-600"
                      }`}
                  >
                    {payment.amountCents}
                  </td>

                  {/* METHOD */}

                  <td>{payment.method}</td>

                  {/* STATUS */}

                  <td>
                    <span
                      className={`text-sm font-medium ${payment.status === "ACTIVE"
                          ? "text-green-600"
                          : payment.status === "CANCELLED"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  {/* DATE */}

                  <td>
                    {new Date(payment.receivedAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="flex gap-3">


                      <button onClick={() => onView(payment._id)} className="text-green-600">Receipt</button>

                      {payment.status === "ACTIVE" && (
                        <button
                          onClick={() => onCancel(payment._id)}
                          className="text-red-600"
                        >
                          Cancel
                        </button>
                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
}
// ================= TABLE =================
function VisitsTable() {
  const { visits, loading, pagination, goToPage } = useVisit();

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-b-2 border-brand-500 rounded-full"></div>
      </div>
    );

  return (
    <div className="space-y-4">
      {/* ACTION BUTTONS */}

      <div className="flex justify-end gap-3 mb-4">


        <div className="flex justify-end mb-4">
          <Link
            to="/visits/create"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
          >
            New Visit
          </Link>
        </div>

      </div>



      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left">Customer</th>
                <th>Last</th>
                <th>Current</th>
                <th>Consumption</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {visits?.map((v: any) => {
                const consumption = v.currentReading - v.lastReading;

                return (
                  <tr key={v._id} className="border-t">
                    <td className="px-5 py-4">
                      <div>
                        <div className="font-medium">
                          {v.customerId?.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {v.customerId?.customerCode}
                        </div>
                      </div>
                    </td>

                    <td>{v.lastReading}</td>
                    <td>{v.currentReading}</td>
                    <td className="font-medium">{consumption}</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${v.isBilled
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                          }`}
                      >
                        {v.isBilled ? "Billed" : "Unbilled"}
                      </span>
                    </td>

                    <td>
                      {new Date(v.visitedAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {pagination && (
        <div className="flex justify-between items-center">
          <button
            disabled={pagination.page === 1}
            onClick={() => goToPage(pagination.page - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={!pagination.hasNextPage}
            onClick={() => goToPage(pagination.page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export { ZoneTable, VillageTable, UsersTable, PeriodsTable, RolesTable, RatesTable, CustomersTable, BillingsTable, UnbilledTable, PaymentsTable, VisitsTable }