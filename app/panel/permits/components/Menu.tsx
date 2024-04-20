'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { ArchiveX, BookCheck, Inbox, Loader2, Settings, PlusCircle } from "lucide-react"

import Link from "next/link"
import { cn } from "@/lib/utils"

import { Separator } from "@/components/ui/separator"
import { auth } from "@/app/firebase/firebaseConfig"
import useAdminStatus from "@/hooks/useAdminStatus"
import { usePermits } from "@/hooks/usePermits"
import { Badge } from "@/components/ui/badge"

const Menu = () => {

    const email = auth.currentUser?.email ?? ""
    const { allAmount, pendingAmount, rejectedAmount, approvedAmount, toReviewAmount, allApprovedAmount } = usePermits(email)
    const isAdmin = useAdminStatus()

    return (

        <nav className="flex flex-col xl:space-y-1">


            {isAdmin &&
                <>
                    <div className={cn(buttonVariants({ variant: "default", size: "sm" }))}>All Permits</div>
                <div className="flex xl:flex-col space-x-5 xl:space-x-0 flex-wrap">
                    <Link
                        href="/panel/permits/toreview"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                        <Loader2 className="mr-2 h-4 w-4" />
                        <div>To review</div>
                        {/*                 {toReviewAmount > 0 && <Badge variant="destructive" className="ml-auto ">NEW!</Badge>} */}
                        <span className="xl:ml-auto ml-5">{toReviewAmount}</span>
                    </Link>

                    <Link
                        href="/panel/permits/allApproved"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                        <Inbox className="mr-2 h-4 w-4" />
                        <div>All approved</div>

                        <span className="xl:ml-auto ml-5">{allApprovedAmount}</span>
                    </Link>   
</div>



                </>
            }

        
             
                    <div className={cn(buttonVariants({ variant: "default", size: "sm" }))}>Your Permits</div>
           

            <div className="flex xl:flex-col space-x-5 xl:space-x-0 flex-wrap">
                    <Link
                        href="/panel/permits/all"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                        <Inbox className="mr-2 h-4 w-4" />
                        <div>All</div>
                        <span className="xl:ml-auto ml-5">{allAmount}</span>
                    </Link>
                    <Link
                        href="/panel/permits/approved"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                        <BookCheck className="mr-2 h-4 w-4" />
                        <div>Approved</div>
                        <span className="xl:ml-auto ml-5">{approvedAmount}</span>
                    </Link>
                    <Link
                        href="/panel/permits/pending"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                        <Inbox className="mr-2 h-4 w-4" />
                        <div>Pending</div>
                        <span className="xl:ml-auto ml-5">{pendingAmount}</span>
                    </Link>
                    <Link
                        href="/panel/permits/rejected"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                        <Inbox className="mr-2 h-4 w-4" />
                        <div>Rejected</div>
                        <span className="xl:ml-auto ml-5">{rejectedAmount}</span>
                    </Link>
           </div>






                <div className="hidden mg:block">
                    <Separator />
                </div>
         


        </nav>


    )
}

export default Menu

