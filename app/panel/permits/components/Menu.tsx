'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { ArchiveX, BookCheck, Inbox, Loader2, Settings, PlusCircle } from "lucide-react"
import { usePermitsTypeContext } from "../../../utils/PermitsTypeContext"
import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useUserPermits } from "@/hooks/useUserPermits"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/app/firebase/config"
import useAdminStatus from "@/hooks/useAdminStatus"
import { usePermits } from "@/hooks/usePermits"

const Menu = () => {
   /*  const { setType, allAmount, rejectededAmount, pendingAmount, approvedAmount } = usePermitsTypeContext() */
    const { allAmount, pendingAmount, rejectedAmount, approvedAmount  } = usePermits() 
    const isAdmin = useAdminStatus()

    return (

        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">



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


            {/*                 <Button onClick={() => setType('all')} variant="default" size="sm" className="dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start">
                    <Inbox className="h-4 w-4 mr-2" />
                    <div>All</div>
                    <span className="lg:ml-auto ml-5 text-background dark:text-white">{allAmount}</span>
                </Button>

                <Button onClick={() => setType('approved')} variant="ghost" size="sm" className="justify-start">
                    <BookCheck className="h-4 w-4 mr-2" />
                    <div>Approved</div>
                <span className="lg:ml-auto ml-5 ">{approvedAmount}</span>
                </Button>

                <Button onClick={() => setType('pending')} variant="ghost" size="sm" className="justify-start">
                    <Loader2 className="h-4 w-4 mr-2" />
                    <div>Pending</div>
                <span className="lg:ml-auto ml-5 ">{pendingAmount}</span>
                </Button>

                <Button onClick={() => setType('rejected')} variant="ghost" size="sm" className="justify-start">
                    <ArchiveX className="h-4 w-4 mr-2" />
                    <div>Rejected</div>
                <span className="lg:ml-auto ml-5 ">{rejectededAmount}</span>
            </Button> */}

            {isAdmin &&

                <Link
                    href="/panel/permits/pending"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start")}>
                    <Loader2 className="mr-2 h-4 w-4" />
                    <div>Permits to review</div>
                    <span className="lg:ml-auto ml-5">{pendingAmount}</span>
                </Link>
            
            }

{/*             {isAdmin && <Button onClick={() => setType('pending')} variant="ghost" size="sm" className="justify-start">
                <Loader2 className="h-4 w-4 mr-2" />
                <div>Permits to approve</div>
                <span className="lg:ml-auto ml-5 ">{pendingAmount}</span>
            </Button>} */}


            <div className="hidden mg:block">
                <Separator />
            </div>

{/*             <Link

                href="/panel/permits/addpermit"
                className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),

                    "justify-start"
                )}
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                <div>Add New Permit</div>



            </Link> */}




            {/*                 <Link

                    href="/"
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),

                        "justify-start"
                    )}
                >
                    <Settings className="mr-2 h-4 w-4" />
                    <div>Account settings</div>



                </Link> */}

        </nav>



        /*         <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
                    <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                        <Button onClick={() => setType('all')} variant="default" size="sm" className="dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white justify-start">
                            <Inbox className="h-4 w-4 mr-2" />
                            <div>All</div>
                            <span className="ml-auto text-background dark:text-white">{allAmount}</span>
                        </Button>
        
                        <Button onClick={() => setType('approved')} variant="ghost" size="sm" className="justify-start">
                            <BookCheck className="h-4 w-4 mr-2" />
                            <div>Approved</div>
                            <span className="ml-auto ">{approvedAmount}</span>
                        </Button>
        
                        <Button onClick={() => setType('pending')} variant="ghost" size="sm" className="justify-start">
                            <Loader2 className="h-4 w-4 mr-2" />
                            <div>Pending</div>
                            <span className="ml-auto ">{pendingAmount}</span>
                        </Button>
        
                        <Button onClick={() => setType('rejected')} variant="ghost" size="sm" className="justify-start">
                            <ArchiveX className="h-4 w-4 mr-2" />
                            <div>Rejected</div>
                            <span className="ml-auto ">{rejectededAmount}</span>
                        </Button>
                        <Separator />
                        <Link
                       
                            href="/panel/permits/addpermit"
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "sm" }),
                               
                                "justify-start"
                            )}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <div>Add Permit</div>
                          
        
                        
                        </Link>
        
                        <Link
        
                            href="/"
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "sm" }),
        
                                "justify-start"
                            )}
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            <div>Account settings</div>
        
        
        
                        </Link>
        
                    </nav>
                </div> */
    )
}

export default Menu

