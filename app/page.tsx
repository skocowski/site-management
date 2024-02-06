'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config'

import AddPermit from "@/components/AddPermit";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import { readUser } from "./utils/Functions";
import { Button } from "@/components/ui/button";
import Pricing from "./pricing/page";
import PermitForm from "./panel/permits/components/PermitForm";
import PermitLayout from "./panel/permits/components/PermitLayout";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";




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
      
        








        <div className="block space-y-10">
    {/*       <PermitForm /> */}

      {/*     <PermitLayout permit={tempPermit}/> */}
        </div>


        <Pricing /> 

    
</div>
    
    

   </div> 


  );
}

export default Home

