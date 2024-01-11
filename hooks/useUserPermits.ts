import { fetchPermits } from "@/app/utils/Functions";
import { Permit } from "@/app/utils/types";
import { useState, useEffect, useRef } from "react";


export const useUserPermits = () => {
    const [data, setData] = useState<Permit[]>([]);
/*   const [data, setData] = useState<Permit[]>(() => {
    // Retrieve data from localStorage on initial mount
    const storedData = localStorage.getItem("permitsData");
    return storedData ? JSON.parse(storedData) : [];
  }); */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Use useRef to store the initial state and persist it across renders
  const initialData = useRef<Permit[]>([]);
  const isInitialMount = useRef(true);

  const fetchData = async () => {
    try {
      console.log(isInitialMount)
      setIsLoading(true);

      // Fetch data only on the initial mount or if explicitly requested
      const response = isInitialMount.current
        ? await fetchPermits()
        : initialData.current;

      setData(response);
      initialData.current = response;

      // Store the data in localStorage
      localStorage.setItem("permitsData", JSON.stringify(response));
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
      isInitialMount.current = false; // Update the flag after the initial fetch
    },
    [
      /* Dependencies for when you explicitly want to trigger a refetch */
    ]
  );

    const filterDataByStatus = (status: string): Permit[] => {
      return status === "all"
        ? data
        : data.filter((permit) => permit.status === status);
    };

  const allAmount = data.length
  const approvedAmount = filterDataByStatus("approved").length; 
  const rejectededAmount = filterDataByStatus("rejected").length; 
  const pendingAmount = filterDataByStatus("pending").length; 

  return { data, isLoading, error, refetchData: fetchData, allAmount, rejectededAmount, pendingAmount, approvedAmount }; // Expose the refetch function
};