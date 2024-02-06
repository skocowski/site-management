'use client'
import * as z from "zod"
import useUserData from '@/hooks/useUserData'
import { Skeleton } from "@/components/ui/skeleton"
import { permitFormSchema } from "@/app/utils/Forms"
import AddEditForm from "../components/AddEditForm"


type FormValues = z.infer<typeof permitFormSchema>


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



