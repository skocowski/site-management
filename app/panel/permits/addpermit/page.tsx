'use client'
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { auth, db } from '@/app/firebase/config'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { DocumentData, doc, setDoc } from 'firebase/firestore'
import useUserData from '@/hooks/useUserData'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUserPermits } from "@/hooks/useUserPermits"
import { handSignature } from "@/app/utils/fonts"
import { Label } from "@/components/ui/label"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LoaderIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { permitFormSchema } from "@/app/utils/Forms"
import { WorkPartyMember } from "@/app/utils/types"
import WorkParty from "../components/WorkParty"
import AddEditForm from "../components/AddEditForm"




type AccountFormValues = z.infer<typeof permitFormSchema>
type FormValues = z.infer<typeof permitFormSchema>
// This can come from your database or API.
/* const defaultValues: Partial<AccountFormValues> = {
    location: "",
    startDate: new Date(),
    endDate: new Date(),
    rams: "",
    description: "",
    equipment: "",
    pointsOfIsolation: "N/A",
    primaryEarthingDevice: "N/A",
    actionsTaken: "N/A",
    furtherPrecautions: "N/A",
    variedPrecautions: "N/A",
    workDuration: "",
    otherInformation: ""
} */

 const defaultValues: Partial<FormValues> = {
    description: "",
    equipment: "",
    pointsOfIsolation: "N/A",
    primaryEarthingDevice: "N/A",
    actionsTaken: "N/A",
    furtherPrecautions: "N/A",
    variedPrecautions: "N/A",
    workDuration: "",
    otherInformation: ""
} 

const PermitForm = () => {


    const { data: userData } = useUserData()

    return (
        <>

            {userData ?

                <div className="border-4 border-black pb-3">

                    {/*  HEADER  */}

                    <div className="border-b-4 border-black flex justify-between bg-[#ff0000] px-1 items-center flex-col lg:flex-row" >
                        <div className="bg-white">YOUR LOGO</div>
                        <div className="text-white lg:text-3xl">ELETRICAL PERMIT TO WORK</div>
                        <div className="flex gap-1">
                            <div className="text-white">PERMIT NO:</div>
                            <div className="bg-white w-32 text-white">{ }</div>
                        </div>

                    </div>

                    {/*     1 */}

                    <AddEditForm userData={userData} defaultValues={defaultValues} type='add' />

               {/*      <AccountForm userData={userData} /> */}


                </div>

                :

                <div className="space-y-2 p-6">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            }


        </>
    )
}

export default PermitForm



