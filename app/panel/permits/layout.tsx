
import { Separator } from "@/components/ui/separator"

import Menu from "./components/Menu"

import { Metadata } from "next"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

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
   
  
            <div className="space-y-6 p-10 pb-16 md:block">
                <div className="flex justify-between">
                    <div className="space-y-0.5">
                        <h2 className="text-2xl font-bold tracking-tight">Permits</h2>
                        <p className="text-muted-foreground">
                            Manage your permits.
                        </p>
                    </div>

                    <Link

                        href="/panel/permits/addpermit"
                        className={cn(
                            buttonVariants({ variant: "default", size: "sm" }),

                            "justify-start"
                        )}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <div>Add New Permit</div>



                    </Link>
                </div>


                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 xl:flex-row xl:space-x-12 xl:space-y-0">
                    <aside className="-mx-4 xl:w-1/5">
                        <Menu />
                    </aside>
                    <div className="flex-1">{children}</div>
                </div>
            </div>





   

    )
}





