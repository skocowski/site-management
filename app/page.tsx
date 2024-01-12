'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config'

import AddPermit from "@/components/AddPermit";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import { readUser } from "./utils/Functions";
import { Button } from "@/components/ui/button";
import Pricing from "./pricing/page";
import PermitForm from "./panel/permits/PermitForm";
import PermitLayout from "./panel/permits/PermitLayout";
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
      
        

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Forma</TabsTrigger>
            <TabsTrigger value="permit">Permit</TabsTrigger>
          </TabsList>
          <TabsContent value="form">
<PermitForm />
          </TabsContent>
          <TabsContent value="permit">
            <PermitLayout permit={tempPermit} />
          </TabsContent>
        </Tabs>






        <div className="block space-y-10">
    {/*       <PermitForm /> */}

      {/*     <PermitLayout permit={tempPermit}/> */}
        </div>


    {/*     <Pricing /> */}

    
</div>
    
    

   </div> 


  );
}

export default Home

const tempPermit = {
  location: "rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant",
  equipment: "rhoncus est pellentesque elit ullamcorper",
  startDate: "10 April 2023, 07:30",
  endDate: "10 April 2023, 19:30",
  rams: "at urna condimentum mattis pellentesque",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Volutpat odio facilisis mauris sit amet massa. Id semper risus in hendrerit gravida rutrum quisque. Pellentesque nec nam aliquam sem et. Nibh tellus molestie nunc non blandit.",
  pointsOfIsolation: "at urna condimentum mattis pellentesque",
  primaryEarthingDevice: "at urna condimentum mattis pellentesque",

  actionsTaken: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Volutpat odio facilisis mauris sit amet massa. Id semper risus in hendrerit gravida rutrum quisque. Pellentesque nec nam aliquam sem et. Nibh tellus molestie nunc non blandit.",
  furtherPrecautions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Volutpat odio facilisis mauris sit amet massa. Id semper risus in hendrerit gravida rutrum quisque. Pellentesque nec nam aliquam sem et. Nibh tellus molestie nunc non blandit.",
  variedPrecautions: "at urna condimentum mattis pellentesque",
}