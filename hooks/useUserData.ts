import { auth } from "@/app/firebase/config";
import { readUser } from "@/app/utils/Functions";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useUserData = () => {
  const [user] = useAuthState(auth);

  const [data, setData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          if (auth.currentUser) {
            const response = await readUser(auth.currentUser.uid);
            if (response) {
       
              setData(response);
            } else {
              console.log("Error reading data");
            }
          }
        } catch (err) {
             console.log("Error reading data");
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
    };

    fetchData();
  }, [user]);

  return { data, isLoading, error };
};

export default useUserData;
