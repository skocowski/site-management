'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config'

import AddPermit from "@/components/AddPermit";
import PermitsList from "@/components/PermitsList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import { readUser } from "./utils/Functions";




const Home = () => {
 const [user] = useAuthState(auth) 







  return (


   <MaxWidthWrapper className="space-y-10">
      

        <h1>Siema Rawai</h1>
    


   

   </MaxWidthWrapper> 


  );
}

export default Home