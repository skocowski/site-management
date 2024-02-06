'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { ArchiveX, BookCheck, Inbox, Loader2, Settings, PlusCircle } from "lucide-react"

import Link from "next/link"
import { cn } from "@/lib/utils"

import { Separator } from "@/components/ui/separator"
import { auth } from "@/app/firebase/config"
import useAdminStatus from "@/hooks/useAdminStatus"
import { usePermits } from "@/hooks/usePermits"
import { Badge } from "@/components/ui/badge"

const Menu = () => {
    /*  const { setType, allAmount, rejectededAmount, pendingAmount, approvedAmount } = usePermitsTypeContext() */
    const email = auth.currentUser?.email ?? ""
    const { allAmount, pendingAmount, rejectedAmount, approvedAmount, permitsToReview, toReviewAmount  } = usePermits(email) 
    const isAdmin = useAdminStatus()

    return (

        <nav className="flex space-x-2 xl:flex-col xl:space-x-0 xl:space-y-1">



            <Link
                href="/panel/permits/all"
                className={cn(buttonVariants({ variant: "default", size: "sm" }), "justify-start")}>
                <Inbox className="mr-2 h-4 w-4" />
                <div>All</div>
                <span className="lg:ml-auto ml-5">{allAmount}</span>
            </Link>
            <Link
                href="/panel/permits/approved"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                <BookCheck className="mr-2 h-4 w-4" />
                <div>Approved</div>
                <span className="lg:ml-auto ml-5">{approvedAmount}</span>
            </Link>
            <Link
                href="/panel/permits/pending"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                <Inbox className="mr-2 h-4 w-4" />
                <div>Pending</div>
                <span className="lg:ml-auto ml-5">{pendingAmount}</span>
            </Link>
            <Link
                href="/panel/permits/rejected"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                <Inbox className="mr-2 h-4 w-4" />
                <div>Rejected</div>
                <span className="lg:ml-auto ml-5">{rejectedAmount}</span>
            </Link>


<Separator className="hidden xl:block"/>
            {isAdmin &&

                <Link
                    href="/panel/permits/toreview"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                    <Loader2 className="mr-2 h-4 w-4" />
                    <div>Review</div>
                    {toReviewAmount > 0 && <Badge variant="destructive" className="ml-auto ">NEW!</Badge>}
                    <span className="lg:ml-auto ml-5">{toReviewAmount}</span>
                </Link>
            
            }


            <div className="hidden mg:block">
                <Separator />
            </div>

        </nav>


    )
}

export default Menu

