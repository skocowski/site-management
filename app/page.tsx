"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";




export default function Home() {
const [user] = useAuthState(auth)
  const router = useRouter()
 /*  const userSession = sessionStorage.getItem('user') */
  
  /*   if (!user && !userSession) { */
  if (!user) {
    router.push('/sign-up')
  }
  return (
   
      <div className=' min-h-screen mx-auto flex flex-col gap-5'>
   
      <div className='text-5xl'>
        Hello Rawai!
      </div>
      <div>
        <button onClick={() => {
          signOut(auth)
          sessionStorage.removeItem('user')
        } }>
          WYLOGUJ SIĘ
        </button>
      </div>


      </div>
  
  );
}


{/* <div className="flex-grow max-w-7xl mx-auto">


  <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
    <TeamMembers />
    <ReportAnIssue />
    <CreateAccount />
    <AddPermit />



  </div>


</div> */}