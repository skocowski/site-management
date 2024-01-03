'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config'

import AddPermit from "@/components/AddPermit";
import PermitsList from "@/components/PermitsList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import { readUser } from "./utils/Functions";
import { Button } from "@/components/ui/button";




const Home = () => {
 const [user] = useAuthState(auth) 







  return (


   <MaxWidthWrapper className="space-y-10">
      
      <div className="flex flex-col">
        
        <h1>Siema Rawai</h1>
        <div className="w-[200px]">

          {auth.currentUser &&
            <Button onClick={() => {
              auth.currentUser!.getIdTokenResult().then(r => {
                console.log("admin claim? ", r.claims.admin);
              })
            }}>Jestem adminem?</Button>
          }
        </div>

    
</div>
    
    


   

   </MaxWidthWrapper> 


  );
}

export default Home