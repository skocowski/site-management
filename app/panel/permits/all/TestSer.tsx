import { db } from "@/app/firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { columns } from '../components/columns'
import { DataTable } from '../components/PermitTable'

const TestSer = async () => {
  const permitsCollection = collection(db, "permits");
  const querySnapshot = await getDocs(permitsCollection);
  const permits: any[] = []
  querySnapshot.forEach((doc) => {
    permits.push(doc.data());
  });

  return (
    <div>
      <DataTable columns={columns} data={permits} />

    </div>
  )
}

export default TestSer

