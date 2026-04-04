import { useEffect,useState } from "react";
import { billingService } from "../api/BillingApi";

// export function useBillings(
//     {  filters }: any
//   //  params:any
// ){
export function useBillings({ page, limit, filters }: any) {
 const [billings,setBillings] = useState([]);
 const [pagination,setPagination] = useState<any>(null);

 const [loading,setLoading] = useState(false);

 const fetchBillings = async()=>{

  try{

   setLoading(true)

   const res = await billingService.getBillings({page, limit, ...filters});
   
  
   

   setBillings(res.data);
   setPagination(res.pagination);

  }finally{
   setLoading(false)
  }

 }


 useEffect(()=>{

  fetchBillings()

 },[page,limit,JSON.stringify(filters)])

 return{

  billings,
  pagination,
  loading,

  refresh:fetchBillings

 }

}