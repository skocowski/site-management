'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config'

import AddPermit from "@/components/AddPermit";
import PermitsList from "@/components/PermitsList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import { readUser } from "./utils/Functions";
import { Button } from "@/components/ui/button";
import Pricing from "./pricing/page";




const Home = () => {
 const [user] = useAuthState(auth) 







  return (


   <div className="space-y-10">
      
      <div className="flex flex-col">
        
{/*         {auth.currentUser ?
        
          <div className="w-[200px]">


            <Button onClick={() => {
              auth.currentUser!.getIdTokenResult().then(r => {
                console.log("admin claim? ", r.claims.admin);
              })
            }}>Jestem adminem?</Button>

          </div>

          :

          <Pricing />
      
      } */}
      
        <Pricing />

    
</div>
    
    


   

   </div> 


  );
}

export default Home