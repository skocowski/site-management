import { useEffect, useState } from "react";

import { auth } from "@/app/firebase/config";

const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);


  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const result = await auth.currentUser?.getIdTokenResult();
        const isAdminUser = result?.claims?.admin === true;
        setIsAdmin(isAdminUser);


      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkAdminStatus();
  }, []);

  return isAdmin;
};

export default useAdminStatus;
