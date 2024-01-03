import { auth } from "@/app/firebase/config";
import { fetchPermits, readUser } from "@/app/utils/Functions";
import { Permit } from "@/app/utils/types";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const usePermitsList = () => {
  const [data, setData] = useState<Permit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetchPermits();
        console.log(response);
        setData(response);
      } catch (err) {
        console.error("Error reading data", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
