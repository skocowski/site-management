
import { Separator } from "@/components/ui/separator"

import { TooltipProvider } from "@/components/ui/tooltip"


import Menu from "./permits/components/Menu"
import { MainMenu } from "@/components/MainMenu"






export default function PanelLayout({
    children,
   

}: { children: React.ReactNode }) {




    return (
   
            <TooltipProvider delayDuration={0}>
             {/*    <MainMenu /> */}
            <div className="flex flex-row gap-3 border rounded-sm shadow-md md:shadow-xl">
                


                <div className="w-full">
                    {children}
                </div>


            </div>

            </TooltipProvider>
  
    )
}





