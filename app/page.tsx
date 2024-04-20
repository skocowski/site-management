'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/firebaseConfig'


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

