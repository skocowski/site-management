
import { Separator } from "@/components/ui/separator"

import Menu from "./Menu"
import { PermitsTypeContextProvider } from "@/app/utils/PermitsTypeContext"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Permits",
    description: "Manage your permits.",
}

interface PermitsLayoutProps {
    children: React.ReactNode
}

export default function PermitLayout({
    children,
   
}: PermitsLayoutProps) {


    return (
    <PermitsTypeContextProvider> 
  
            <div className="space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Permits</h2>
                    <p className="text-muted-foreground">
                        Manage your permits.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <Menu />
                    </aside>
                    <div className="flex-1">{children}</div>
                </div>
            </div>




{/*             <div className="flex flex-row gap-3 border rounded-sm shadow-md md:shadow-xl">
                
                <div className="w-64">
                
                   <Menu /> 
                    <Separator />


                </div>

                <div className="w-full">
                    {children}
                </div>


            </div> */}

   
       </PermitsTypeContextProvider> 
    )
}





