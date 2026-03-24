

import { useState } from "react";
import { billingService } from "../api/BillingApi";

export function useBillingRun(){

 const [loading,setLoading] = useState(false)

 const runGlobal = async(payload:any)=>{

  setLoading(true)

  const res = await billingService.runGlobalBilling(payload)

  setLoading(false)

  return res

 }

 const runZone = async(zoneId:string,payload:any)=>{

  const res = await billingService.runZoneBilling(zoneId,payload)

  return res

 }

 const runVillage = async(villageId:string,payload:any)=>{

  const res = await billingService.runVillageBilling(villageId,payload)

  return res

 }

 const manualBill = async(customerId:any,payload:any)=>{

  const res = await billingService.manualBillCustomer(customerId,payload)

  return res

 }

 return{

  runGlobal,
  runZone,
  runVillage,
  manualBill,
  loading

 }

}