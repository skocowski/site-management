"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config'
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";




const Home = () => {
const [user] = useAuthState(auth)
  const router = useRouter()
 /*  const userSession = sessionStorage.getItem('user') */
  
  /*   if (!user && !userSession) { */
/*    if (!user) {
    router.push('/sign-up')
  }  */

  useEffect(() => {
    if (!user) {
      router.push('/sign-up')
    } 
  },[])


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

export default Home