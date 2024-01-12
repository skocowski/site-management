"use client"
import { Separator } from '@/components/ui/separator'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { auth, db } from '@/app/firebase/config'

import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useUserPermits } from '@/hooks/useUserPermits'
import { usePermitsTypeContext } from '@/app/utils/PermitsTypeContext'



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
    date: z.date({
        required_error: "A date is required.",
    }),
    permitType: z.string({
        required_error: "Please select a language.",
    }),
    rams: z.string({

        required_error: "RAMS is required.",
    })
        .min(2, {
            message: "RAMS must be at least 2 characters.",
        }),
    badge: z.string({

        required_error: "Badge is required.",
    })
        .min(2, {
            message: "BADGE must be at least 2 characters.",
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
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
    location: "",
    date: new Date(),
    permitType: "",
    rams: "",
    badge: "",
    description: "",
    isolation: "yes"


}

const AddPermit = () => {



    const { data: userData } = useUserData()

    return (
        <div className="space-y-6 max-w-md">
            <div>
                <h3 className="text-lg font-medium">Add Permit</h3>
                <p className="text-sm text-muted-foreground">
                    Add a new permit.
                </p>
            </div>
            <Separator />
            {userData && <AccountForm userData={userData} />}
        </div>
    )
}

export default AddPermit

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
        writeData(values, userData)

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Provide a brief description of the work"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="badge"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Badge number</FormLabel>
                            <FormControl>
                                <Input placeholder="Badge number" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="isolation"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Is isolation required?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="yes" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Yes
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="no" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            No
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="notSure" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Not sure</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="permitType"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Permit type</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? permitTypes.find(
                                                    (permit) => permit.value === field.value
                                                )?.label
                                                : "Select permit"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search permit..." />
                                        <CommandEmpty>No permit found.</CommandEmpty>
                                        <CommandGroup>
                                            {permitTypes.map((permit) => (
                                                <CommandItem
                                                    value={permit.label}
                                                    key={permit.value}
                                                    onSelect={() => {
                                                        form.setValue("permitType", permit.value)
                                                    }}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            permit.value === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {permit.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Add Permit</Button>
            </form>
        </Form>
    )
}

async function writeData(data: AccountFormValues, userData: DocumentData) {
    console.log("write permit to db");
  
    let permitId = "phuket=" + Date.now();

    let permit = {
        id: permitId,
        name: userData.name,
        surname: userData.surname,
        applicant: "me" + permitId,
        description: data.description,
        company: userData.company,
        phoneNumber: userData.phoneNumber,
        location: data.location,
        type: data.permitType,
        rams: data.rams,
        badge: data.badge,
        isolation: data.isolation,
        date: data.date.getTime(),
        status: "rejected",
        email: auth.currentUser?.email

    };

  
    const ref = doc(db, "permits", permitId);
    try {
        await setDoc(ref, permit, { merge: true });
        console.log("Document successfully written!");

        
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}



