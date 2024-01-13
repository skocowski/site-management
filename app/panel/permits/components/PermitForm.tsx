'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"



import { Separator } from '@/components/ui/separator'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { auth, db } from '@/app/firebase/config'

import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Calendar } from '@/components/ui/calendar'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAuthState } from 'react-firebase-hooks/auth'
import { DocumentData, doc, setDoc } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { readUser } from '@/app/utils/Functions'
import useUserData from '@/hooks/useUserData'

import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useUserPermits } from '@/hooks/useUserPermits'
import { usePermitsTypeContext } from '@/app/utils/PermitsTypeContext'
import MeasuresOptions from "./MeasuresOptions"



const permitTypes = [
    { label: "Electrical", value: "electrical" },
    { label: "Hot Work", value: "hotWork" },
    { label: "Riser", value: "riser" },

] as const

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
    date: z.date({
        required_error: "A date is required.",
    }),

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
    isolation: z.enum(["yes", "no", "notSure"], {
        required_error: "You need to select an isolation need.",
    }),
    pointsOfIsolation: z.string(),
    primaryEarthingDevice: z.string(),
    actionsTaken: z.string(),
    furtherPrecautions: z.string(),
  variedPrecautions: z.string(),

})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
    location: "",
    date: new Date(),
   
    rams: "",
   
    description: "",
    isolation: "yes",

    equipment: "",
    pointsOfIsolation: "",
    primaryEarthingDevice: "",
    actionsTaken: "",
    furtherPrecautions: "",
    variedPrecautions: ""


}

const PermitForm = () => {


    const { data: userData } = useUserData()

    return (
        <Card className="w-full">
            <CardHeader className="bg-red-600 rounded-t-lg">
                <CardTitle><div className="text-white text-center">ELECTRICAL PERMIT TO WORK</div></CardTitle>
                <CardDescription className="ml-auto">Permit number: </CardDescription>
            </CardHeader>
            <CardContent>
                {userData && <AccountForm userData={userData} />}
              
            </CardContent>
            <CardFooter className="flex justify-between">
            {/*     <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button> */}
            </CardFooter>
        </Card>
    )
}

export default PermitForm


const AccountForm = ({ userData }: { userData: DocumentData }) => {
    const router = useRouter()
    const { refetch: refetchData } = usePermitsTypeContext()
    const [toPermits, setToPermits] = useState(false)
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        if (toPermits) {
            router.push('/panel/permits')
        }

    }, [toPermits])

    useEffect(() => {

        refetchData()
    }, [refetch])

    const { toast } = useToast()

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues,
    })

    function onSubmit(values: AccountFormValues) {
        console.log("submit?")
        addPermit(values, userData)

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })

        setRefetch(true)

        setToPermits(true)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                {/*    SECTION 1 */}
                
                <div className="bg-gray-200 border p-1 mt-5"><span className="font-bold mr-2">1.</span>Work details </div>
                <div className="flex justify-between gap-10">
                    <div className="w-full">

                        <FormField
                            control={form.control}
                            name="location"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Work location" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="equipment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Equipment Identification</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Equipment" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>


                <div className="flex justify-between gap-10">
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
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

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Work to be done</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Provide a brief description of the work"
                                    className="resize"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />



                {/*    SECTION 2 */}

                <div className="bg-gray-200 border p-1"><span className="font-bold mr-2">2.</span>Precautions taken to achieve <span className="font-bold">safety from the system</span></div>



                <div className="flex justify-between gap-10 flex-col lg:flex-row">
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="pointsOfIsolation"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Points of isolation</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="primaryEarthingDevice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Primary earthing device(s)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-between gap-10 flex-col lg:flex-row">
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="actionsTaken"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Actions taken to avoid <span className="font-bold">danger</span> by draining, venting, purging and containment or dissipation of stored energy</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="furtherPrecautions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Further precautions to be taken during the course of the work to avoid system derived hazards</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            className="resize"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="variedPrecautions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precautions which may be varried (approved procedure required)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""
                                    className="resize"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/*    SECTION 3 */}

                <div className="bg-gray-200 border p-1"><span className="font-bold mr-2">3.</span> <span className="font-bold">Preparation</span></div>
                <div className=" p-1">I have confirmed with the control engineer that the precautions in section 2(I) & 2(I) have been carried out and iwll be maintained until the permit for work is cancelled.</div>





                <Button type="submit">Add Permit</Button>
            </form>
        </Form>
    )
}



async function addPermit(data: AccountFormValues, userData: DocumentData) {
    console.log("write permit to db");

    let permitId = "phk" + Date.now();

    let permit = {
        id: permitId,
        name: userData.name ?? "",
        surname: userData.surname ?? "",
        applicant: "me" + permitId,
        description: data.description,
        company: userData.company ?? "",
        phoneNumber: userData.phoneNumber ?? "",
        location: data.location,
        rams: data.rams,
        isolation: data.isolation,
        date: data.date.getTime(),
        status: "rejected",
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



