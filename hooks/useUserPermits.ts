import { fetchPermits } from "@/app/utils/Functions";
import { Permit } from "@/app/utils/types";
import { useState, useEffect, useRef } from "react";


export const useUserPermits = () => {
  const [data, setData] = useState<Permit[]>([]);

 const [isLoading, setIsLoading] = useState<boolean>(true); 
const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchPermits();
      setData(response);

    } catch (err) {
      console.error("Error reading data", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    } 
  };

  useEffect(
    () => {
      fetchData();
    },[]);

    const filterDataByStatus = (status: string): Permit[] => {
      return status === "all"
        ? data
        : data.filter((permit) => permit.status === status);
    };

  const all = data
  const approved = filterDataByStatus("approved");
  const rejected = filterDataByStatus("rejected"); 
  const pending = filterDataByStatus("pending"); 
  const allAmount = all.length
  const rejectedAmount = rejected.length
  const pendingAmount = pending.length
  const approvedAmount = approved.length

  return { all, isLoading, error, refetchData: fetchData, rejected, pending, approved, allAmount, rejectedAmount, pendingAmount, approvedAmount }; 
};




