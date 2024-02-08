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
      tempResult.sort((a, b) => {
        // Extract the timestamp from the IDs
  const timestampA = a.id ? parseInt(a.id.replace("phk", "")) : 0;
  const timestampB = b.id ? parseInt(b.id.replace("phk", "")) : 0;

        // Compare timestamps for sorting
        return timestampB - timestampA;
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

    const filterAllApproved = (): any[] => {
      return permits.filter((permit) => permit.status === 'approved');
    };

  const filterDataByDate = (): any[] => {
    const currentDate = new Date().getTime();
    return filteredPermitsByEmail.filter(
      (permit) => permit.startDate < currentDate && currentDate < permit.endDate
    );
  };

    const toReview = (status: string): any[] => {
      return status === "all"
        ? permits
        : permits.filter((permit) => permit.status === status);
    };
  
    const approved = filterDataByStatus("approved");

  const all = filteredPermitsByEmail



  const rejected = filterDataByStatus("rejected");
  const pending = filterDataByStatus("pending");
  const activePermits = filterDataByDate();
  const allAmount = filteredPermitsByEmail.length;
  const rejectedAmount = rejected.length;
  const pendingAmount = pending.length;
  const approvedAmount = approved.length;
  const activePermitsAmount = activePermits.length;
  const permitsToReview = toReview("pending")
  const toReviewAmount = permitsToReview.length
  const allApproved = filterAllApproved()
  const allApprovedAmount = allApproved.length

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
    permitsToReview,
    toReviewAmount,
    allApproved,
    allApprovedAmount
  };
}
