import { db } from "@/app/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function usePermits() {
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
    
    
      const filterDataByStatus = (status: string): any[] => {
        return status === "all"
          ? permits
          : permits.filter((permit) => permit.status === status);
      };
  
    const filterDataByDate = (): any[] => {
      const currentDate = new Date().getTime();
      return permits.filter(
        (permit) =>
          permit.startDate < currentDate && currentDate < permit.endDate
      );
    };

    const all = permits
      const approved = filterDataByStatus("approved");
      const rejected = filterDataByStatus("rejected");
  const pending = filterDataByStatus("pending");
  const activePermits = filterDataByDate();
      const allAmount = permits.length;
      const rejectedAmount = rejected.length;
      const pendingAmount = pending.length;
  const approvedAmount = approved.length;
  const activePermitsAmount = activePermits.length;
    

  return { permits, all, approved, rejected, pending, activePermits, allAmount, rejectedAmount, pendingAmount, approvedAmount, activePermitsAmount };
}
