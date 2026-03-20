import { useEffect,useState } from "react";
import { billingService } from "../api/BillingApi";

export function useBillings(
    {  filters }: any
  //  params:any
){

 const [billings,setBillings] = useState([]);
 const [pagination,setPagination] = useState<any>(null);

 const [loading,setLoading] = useState(false);

 const fetchBillings = async()=>{

  try{

   setLoading(true)

   const res = await billingService.getBillings(filters);
   
   

   setBillings(res.data);
   setPagination(res.pagination);

  }finally{
   setLoading(false)
  }

 }

 useEffect(()=>{

  fetchBillings()

 },[JSON.stringify(filters)])

 return{

  billings,
  pagination,
  loading,

  refresh:fetchBillings

 }

}