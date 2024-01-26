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


/* const permitId = searchParams.get("permitId")
const startDate = searchParams.get("startDate")
const endDate = searchParams.get("endDate") */



const accountFormSchema = z.object({

    location: z
        .string()
        .min(2, {
            message: "Location must be at least 2 characters.",
        })
        .max(30, {
            message: "Location must not be longer than 30 characters.",
        }),
    equipment: z
        .string()
        .min(2, {
            message: "Location must be at least 2 characters.",
        })
        .max(30, {
            message: "Location must not be longer than 30 characters.",
        }),
    startDate: z.date({
        required_error: "A date is required.",
    }),
    endDate: z.date({
        required_error: "A date is required.",
    })
    ,
    rams: z.string({

        required_error: "RAMS is required.",
    })
        .min(2, {
            message: "RAMS must be at least 2 characters.",
        }),

    description: z
        .string()
        .min(5, {
            message: "Description must be at least 5 characters.",
        })
        .max(300, {
            message: "Description must not be longer than 300 characters.",
        }),

    pointsOfIsolation: z.string(),
    primaryEarthingDevice: z.string(),
    actionsTaken: z.string(),
    furtherPrecautions: z.string(),
    variedPrecautions: z.string(),

})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.


const EditPermit = () => {


    const { data: userData } = useUserData()

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
                            <div className="bg-white w-32 text-white">{ }</div>
                        </div>

                    </div>

                    {/*     1 */}

                    <AccountForm userData={userData} />


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


const AccountForm = ({ userData }: { userData: DocumentData }) => {
    const router = useRouter()
  
    const [toPermits, setToPermits] = useState(false)
    const searchParams = useSearchParams()

    const defaultValues: Partial<AccountFormValues> = {
        location: searchParams.get("location") ?? '',
        startDate:  new Date(),
        endDate: new Date(),
        rams: searchParams.get("rams")  ?? "",
        description: searchParams.get("description")  ?? "",
        equipment: searchParams.get("equipment")  ?? "",
        pointsOfIsolation: searchParams.get("pointsOfIsolation") ?? "N/A",
        primaryEarthingDevice: searchParams.get("primaryEarthingDevice")  ?? "N/A",
        actionsTaken: searchParams.get("actionsTaken")  ?? "N/A",
        furtherPrecautions: searchParams.get("furtherPrecautions")  ?? "N/A",
        variedPrecautions: searchParams.get("variedPrecautions")  ?? "N/A"
    }

const permitId = searchParams.get("permitId") ?? ''
    useEffect(() => {
        if (toPermits) {
            router.push('/panel/permits')
        }

    }, [toPermits])





    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues,
    })

    function onSubmit(values: AccountFormValues) {
 
        editPermit(values, userData, permitId)

        setToPermits(true)
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                {/*    SECTION 1 */}


                <div className="border-b-4 border-black p-1 pb-9" >
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>1.</div>
                        <div></div>
                    </div>

                    <div className="px-3 space-y-2 md:space-y-0">
                        <FormField
                            control={form.control}
                            name="location"

                            render={({ field }) => (
                                <FormItem className="md:flex md:items-center">
                                    <FormLabel className="md:w-40 w-full">(I) LOCATION</FormLabel>

                                    <FormControl>
                                        <Input placeholder="Work location" {...field} className="rounded-none bg-gray-200 border-black" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="equipment"
                            render={({ field }) => (
                                <FormItem className="md:flex md:items-center">
                                    <FormLabel className="md:w-40 w-full">(II) EQUIPMENT ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Equipment" {...field} className="rounded-none bg-gray-200 border-black" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="md:flex md:items-center">
                                    <FormLabel className="md:w-40 w-full">(III) WORK TO BE DONE</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Provide a brief description of the work"
                                            className="resize rounded-none bg-gray-200 border-black"
                                            {...field}

                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>
                </div>



                {/*    SECTION 2 */}


                <div className="border-b-4 border-black p-1 pb-9" >
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>2.</div>
                        <div>PRECAUTIONS TAKEN TO ACHIEVE <span className="font-bold">SAFETY WORK SYSTEM.</span></div>
                    </div>

                    <div className="px-3 space-y-2 md:space-y-0">

                        <FormField
                            control={form.control}
                            name="pointsOfIsolation"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">(I) POINTS OF ISOLATION</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize rounded-none bg-gray-200 border-black"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="primaryEarthingDevice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">(II)PRIMARY EARTHING DEVICE</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize rounded-none bg-gray-200 border-black"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="actionsTaken"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">(III) ACTIONS TAKEN TO AVOID <span className="font-bold">DANGER</span> BY DRAINING, VENTING, PURGING AND CONTAINMENT OR DISSIPATION OF STORED ENERGY</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize rounded-none bg-gray-200 border-black"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="furtherPrecautions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">(IV) FURTHER PRECAUTIONS TO BE TAKEN DURING THE COURSE OF THE WORK TO AVOID SYSTEM DERIVED HAZARDS</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize rounded-none bg-gray-200 border-black"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="variedPrecautions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">(V) PRECAUTIONS WHICH MAY BE VARRIED (APPROVED PROCEDURE REQUIRED)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize rounded-none bg-gray-200 border-black"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                </div>



                {/*    SECTION 3 */}


                <div className="border-b-4 border-black p-1 pb-9" >
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>3.</div>
                        <div>PREPARATIONS</div>
                    </div>

                    <div className="px-3 space-y-2 md:space-y-0">
                        <Label className="text-xs">I HAVE CONFIRMED WITHE THE CONTROL ENGINEER THAT THE PRECAUTIONS IN SECTION 2(I) & 2(II) HAVE BEEN CARRIED OUT AND WILL BE MAINTAINED UNTIL THE PERMIT FOR WORK IS CANCELLED.</Label>
                        <Table className="border-2 border-black bg-gray-200 font-semibold text-sm text-center">
                            <TableBody className="">
                                <TableRow className="hidden lg:table-row ">
                                    <TableCell className="border-2 border-black w-60">CONTROL ENGINEER</TableCell>
                                    <TableCell className="border-2 border-black">John Smith</TableCell>
                                    <TableCell className={`border-2 border-black text-2xl ${handSignature.className}`}>J. Smith</TableCell>

                                </TableRow>

                                {/* Small Screen */}
                                <TableRow className="lg:hidden">
                                    <TableCell colSpan={2} className="border-2 border-black">CONTROL ENGINEER</TableCell>
                                </TableRow>

                                {/* Small Screen */}
                                <TableRow className="lg:hidden">
                                    <TableCell className="border-2 border-black">John Smith</TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>J. Smith</TableCell>
                                </TableRow>


                            </TableBody>
                        </Table>



                    </div>





                    <div className="px-3 space-y-2 md:space-y-0">
                        <Label className="text-xs">I CERTIFY PRECAUTIONS CARRIED OUT IN SECTION 2 ARE ADEQUATE TO PROVIDE SAFETY.</Label>

                        <Table className="border-2 border-black bg-gray-200 font-semibold text-sm text-center">
                            <TableBody className="">
                                <TableRow className="hidden lg:table-row ">
                                    <TableCell className="border-2 border-black w-60">SENIOR AUTHORISED PERSON / AUTHORISED PERSON</TableCell>
                                    <TableCell className="border-2 border-black">Michael Jordan</TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>M. Jordan</TableCell>
                                    <TableCell className="border-2 border-black">KEY SAFE NUMBER</TableCell>
                                    <TableCell className="border-2 border-black">Date</TableCell>
                                </TableRow>

                                {/* Small Screen */}
                                <TableRow className="lg:hidden">
                                    <TableCell colSpan={2} className="border-2 border-black">SENIOR AUTHORISED PERSON / AUTHORISED PERSON</TableCell>
                                </TableRow>

                                {/* Small Screen */}
                                <TableRow className="lg:hidden">
                                    <TableCell className="border-2 border-black">Michael Jordan</TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>M. Jordan</TableCell>
                                </TableRow>

                                {/* Small Screen */}
                                <TableRow className="lg:hidden">
                                    <TableCell className="border-2 border-black">KEY SAFE NUMBER</TableCell>
                                    <TableCell className="border-2 border-black">Date</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>








                    </div>
                </div>









                <div className="flex justify-between gap-10">
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="rams"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RAMS number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="RAMS" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                </div>













                <Button type="submit">Edit Permit</Button>
            </form>
        </Form>
    )


}





async function editPermit(data: AccountFormValues, userData: DocumentData, permitId: string) {
    console.log("write permit to db");

   

    let permit = {
        id: permitId,
        name: userData.name,
        surname: userData.surname ?? "",
        applicant: "me" + permitId,
        description: data.description,
        company: userData.company ?? "",
        phoneNumber: userData.phoneNumber ?? "",
        location: data.location,
        rams: data.rams,
        startDate: data.startDate.getTime(),
        endDate: data.endDate.getTime(),
        status: "pending",
        email: auth.currentUser?.email ?? "",
        equipment: data.equipment,
        pointsOfIsolation: data.pointsOfIsolation,
        primaryEarthingDevice: data.primaryEarthingDevice,
        actionsTaken: data.actionsTaken,
        furtherPrecautions: data.furtherPrecautions,
        variedPrecautions: data.variedPrecautions

    };


    const ref = doc(db, "permits", permitId);
    try {
        await setDoc(ref, permit, { merge: true });
        console.log("Document successfully written!");


    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

