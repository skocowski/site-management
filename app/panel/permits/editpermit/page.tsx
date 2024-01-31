'use client'
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
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
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { handSignature } from "@/app/utils/fonts"
import { Label } from "@/components/ui/label"

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

import { Skeleton } from "@/components/ui/skeleton"
import { permitFormSchema } from "@/app/utils/Forms"
import { fetchPermit } from "@/app/utils/Functions"
import { WorkPartyMember } from "@/app/utils/types"
import AddEditForm from "../components/AddEditForm"





type AccountFormValues = z.infer<typeof permitFormSchema>

// This can come from your database or API.


const EditPermit = () => {
    const searchParams = useSearchParams()
    const permitId = searchParams.get('permitId')

    const { data: userData } = useUserData()

    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchPermit(permitId as string);
                setData(result);
            } catch (error) {
                console.error('Error fetching permit:', error);
                setData(null);
            }
        };

        if (permitId) {
            fetchData();
        }
    }, [permitId]);

    // Rest of your component logic...

    const permit = JSON.parse(String(data));

    type FormValues = z.infer<typeof permitFormSchema>


    const defaultValues: Partial<FormValues> = {
        location: permit?.location ?? "",
        description: permit?.description ?? "",
        equipment: permit?.equipment ?? "",
        rams: permit?.rams ?? "",
        pointsOfIsolation: permit?.pointsOfIsolation ?? "N/A",
        primaryEarthingDevice: permit?.primaryEarthingDevice ?? "N/A",
        actionsTaken: permit?.actionsTaken ?? "N/A",
        furtherPrecautions: permit?.furtherPrecautions ?? "N/A",
        variedPrecautions: permit?.variedPrecautions ?? "N/A",
        workDuration: permit?.workDuration ?? "",
        otherInformation: permit?.otherInformation ?? "",
        isolation: permit?.isolation ?? "",
        sap: permit?.sap ?? "",
        workType: permit?.workType ?? "",
        startDate: permit?.startDate ?? new Date(),
        endDate: permit?.endDate ?? new Date(),
      
    } 

    const workers = permit?.workParty?.arrayValue?.values ?? []

    if (!permit) {
        return <div>Loading...</div>;
    }

    if (permit === null) return <div>Error</div>;

    return (
        <>





            {userData ?

                <div className="border-4 border-black">

                    {/*  HEADER  */}

                    <div className="border-b-4 border-black flex justify-between bg-[#ff0000] px-1 items-center flex-col lg:flex-row" >
                        <div className="bg-white">YOUR LOGO</div>
                        <div className="text-white lg:text-3xl">ELETRICAL PERMIT TO WORK</div>
                        <div className="flex gap-1">
                            <div className="text-white">PERMIT NO:</div>
                            <div className="bg-white w-32 text-white">{permitId }</div>
                        </div>

                    </div>

                    {/*     1 */}

                    {/*     {permitId && <AccountForm userData={userData} parsedPermit={parsedPermit} permitId={permitId} />} */}
                    {permitId && <AddEditForm userData={userData} defaultValues={defaultValues} type="edit" permitId={permitId} workers={workers} />}


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

export default EditPermit


