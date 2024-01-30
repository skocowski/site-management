import { db } from "@/app/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function usePermits(email: string) {
  const [permits, setPermits] = useState<any[]>([]);

  useEffect(() => {
    const permitsCollection = collection(db, "permits");

    const unsubscribe = onSnapshot(permitsCollection, (querySnapshot) => {
      const tempResult: any[] = [];
      querySnapshot.forEach((doc) => {
        tempResult.push(doc.data());
      });

      // Update the state with the new permits data
      setPermits(tempResult);
    });

    // Cleanup function to stop listening when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const filteredPermitsByEmail = permits.filter(
    (permit) => permit.email === email
  );

  const filterDataByStatus = (status: string): any[] => {
    return status === "all"
      ? filteredPermitsByEmail
      : filteredPermitsByEmail.filter((permit) => permit.status === status);
  };

  const filterDataByDate = (): any[] => {
    const currentDate = new Date().getTime();
    return filteredPermitsByEmail.filter(
      (permit) => permit.startDate < currentDate && currentDate < permit.endDate
    );
  };

  const all = filteredPermitsByEmail;
  const approved = filterDataByStatus("approved");
  const rejected = filterDataByStatus("rejected");
  const pending = filterDataByStatus("pending");
  const activePermits = filterDataByDate();
  const allAmount = filteredPermitsByEmail.length;
  const rejectedAmount = rejected.length;
  const pendingAmount = pending.length;
  const approvedAmount = approved.length;
  const activePermitsAmount = activePermits.length;

  return {
    permits: filteredPermitsByEmail,
    all,
    approved,
    rejected,
    pending,
    activePermits,
    allAmount,
    rejectedAmount,
    pendingAmount,
    approvedAmount,
    activePermitsAmount,
  };
}
