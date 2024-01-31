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




type AccountFormValues = z.infer<typeof permitFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
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
}

const PermitForm = () => {


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

export default PermitForm


const AccountForm = ({ userData }: { userData: DocumentData }) => {
    const router = useRouter()

    const [toPermits, setToPermits] = useState(false)

    useEffect(() => {
        if (toPermits) {
            router.push('/panel/permits')
        }

    }, [toPermits])




    const form = useForm<AccountFormValues>({
        resolver: zodResolver(permitFormSchema),
        defaultValues,
    })
    const [workParty, setWorkParty] = useState<WorkPartyMember[]>([]);

    function onSubmit(values: AccountFormValues) {

        addPermit(values, userData, workParty)
console.log(workParty)

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


                <div className="border-b-4 border-black p-1 pb-9">
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
                                    <TableCell className="border-2 border-black"></TableCell>
                                    <TableCell className={`border-2 border-black text-2xl ${handSignature.className}`}></TableCell>

                                </TableRow>

                                {/* Small Screen */}
                                <TableRow className="lg:hidden">
                                    <TableCell colSpan={2} className="border-2 border-black">CONTROL ENGINEER</TableCell>
                                </TableRow>

                                {/* Small Screen */}
                                <TableRow className="lg:hidden">
                                    <TableCell className="border-2 border-black"></TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}></TableCell>
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
                                    <TableCell className="border-2 border-black"></TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}></TableCell>
                                    <TableCell className="border-2 border-black w-44">KEY SAFE NUMBER</TableCell>
                                    <TableCell className="border-2 border-black"></TableCell>
                                </TableRow>

                                {/* Small Screen */}
                                <TableRow className="lg:hidden">
                                    <TableCell colSpan={2} className="border-2 border-black">SENIOR AUTHORISED PERSON / AUTHORISED PERSON</TableCell>
                                </TableRow>

                                {/* Small Screen */}
                                <TableRow className="lg:hidden">
                                    <TableCell className="border-2 border-black"></TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}></TableCell>
                                </TableRow>

                                {/* Small Screen */}
                                <TableRow className="lg:hidden">
                                    <TableCell className="border-2 border-black">KEY SAFE NUMBER</TableCell>
                                    <TableCell className="border-2 border-black"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>








                    </div>
                </div>



                {/* Section 4 */}




                <div className="border-b-4 border-black p-1 pb-9">
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>4.</div>
                        <div>WORK PARTY REGISTER </div>
                    </div>

                    <div className="px-3 space-y-2 md:space-y-0">
                        <Label className="text-xs">(I) THE COMPETENT PERSON (CP) ENSURED ALL MEMBERS OF THE WORKING PARTY HAVE BEEN INSTRUCTED AND ARE AWARE OF THEIR RESPONSIBILITIES WITH REGARDS TO THE CONTENTS OF THE: SAFETY DOCUMENT RISK ASSESMENT & METHOD STATEMENT (RAMS) TOOLBOX TALK</Label>
                        <Table className="border-2 border-black  font-semibold text-sm text-center">
                            <TableHeader className="bg-[#ff0000]">
                                <TableRow className="">
                                    <TableHead className="border-2 border-black text-white text-center">NAME</TableHead>
                                    <TableHead className="border-2 border-black text-white text-center">COMPANY</TableHead>
                                    <TableHead className="border-2 border-black text-white text-center">CONTACT</TableHead>
                                </TableRow>

                            </TableHeader>
                            <TableBody className="">

                                <TableRow className="">
                                    <TableCell className="border-2 border-black">{userData.name} {userData.surname}</TableCell>
                                    <TableCell className="border-2 border-black">{userData.company}</TableCell>
                                    <TableCell className={`border-2 border-black`}>{userData.phoneNumber}</TableCell>

                                </TableRow>

                                {/* Rows from workParty */}
                                {workParty.map((member, index) => (
                                    <TableRow key={index} className="">
                                        <TableCell className="border-2 border-black">{member.surname}</TableCell>
                                        <TableCell className="border-2 border-black">{member.company}</TableCell>
                                        <TableCell className={`border-2 border-black`}>{member.phone}</TableCell>
                                    </TableRow>
                                ))}


                            </TableBody>
                        </Table>

                        <WorkParty setWorkParty={setWorkParty} />




                    </div>
                </div>


                {/* Section 5 */}




                <div className="border-b-4 border-black p-1 pb-9">
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>5.</div>
                        <div>DETAILS </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="mx-auto pb-10">
                            <Table className="border-2 border-black  font-semibold text-sm text-center max-w-[600px]">

                                <TableBody className="">

                                    <TableRow className="table-row ">
                                        <TableCell className="border-2 border-black bg-[#ff0000] text-white">ISOLATION REQUIRED?</TableCell>
                            <TableCell className="border-2 border-black "> 
                                            <FormField
                                                control={form.control}
                                                name="isolation"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3 ">
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                className="flex "
                                                            >
                                                         
                                                                <FormItem className="flex items-center space-x-3 space-y-0 w-full justify-end text-end">
                                                                        <FormLabel className="font-normal">YES</FormLabel>
                                                                        <FormControl>
                                                                            <RadioGroupItem value="yes" className="rounded-none bg-gray-200 h-5 w-5  " />
                                                                        </FormControl>
                                                                    </FormItem>
                                                           
                                                           
                                                                    <FormItem className="flex items-center space-x-3 space-y-0 justify-end text-end w-full">
                                                                    <FormLabel className="font-normal">NO</FormLabel>
                                                                    <FormControl>
                                                                        <RadioGroupItem value="no" className="rounded-none border-black bg-gray-200 h-5 w-5" />
                                                                    </FormControl>
                                                                    </FormItem>
                                                              
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                   </TableCell> 

                                    </TableRow>

                                    <TableRow className="table-row ">
                                        <TableCell className="border-2 border-black bg-[#ff0000] text-white">Will an SAP/AP be required to operate equipment?</TableCell>
                                        <TableCell className="border-2 border-black">
                                            <FormField
                                                control={form.control}
                                                name="sap"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3">
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                className="flex justify-between"
                                                            >
                                                                <FormItem className="flex items-center space-x-3 space-y-0 w-full justify-end text-end">
                                                                    <FormLabel className="font-normal">YES</FormLabel>
                                                                    <FormControl>
                                                                        <RadioGroupItem value="yes" className="rounded-none border-black bg-gray-200 h-5 w-5" />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormItem className="flex items-center space-x-3 space-y-0 w-full justify-end text-end">
                                                                    <FormLabel className="font-normal">NO</FormLabel>
                                                                    <FormControl>
                                                                        <RadioGroupItem value="no" className="rounded-none border-black bg-gray-200 h-5 w-5" />
                                                                    </FormControl>
                                                                </FormItem>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TableCell>

                                    </TableRow>

                                    <TableRow className="table-row ">
                                        <TableCell className="border-2 border-black bg-[#ff0000] text-white">Is this work Mechanical or Electrical?</TableCell>
                                        <TableCell className="border-2 border-black">
                                            <FormField
                                                control={form.control}
                                                name="workType"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3">
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                className="flex justify-between"
                                                            >
                                                                <FormItem className="flex items-center space-x-3 space-y-0 w-full justify-end text-end">
                                                                    <FormLabel className="font-normal">MECHANICAL</FormLabel>
                                                                    <FormControl>
                                                                        <RadioGroupItem value="mechanical" className="rounded-none border-black bg-gray-200 h-5 w-5" />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormItem className="flex items-center space-x-3 space-y-0 w-full justify-end text-end">
                                                                    <FormLabel className="font-normal">ELECTRICAL</FormLabel>
                                                                    <FormControl>
                                                                        <RadioGroupItem value="electrical" className="rounded-none border-black bg-gray-200 h-5 w-5" />
                                                                    </FormControl>
                                                                </FormItem>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TableCell>

                                    </TableRow>



                                </TableBody>
                            </Table>

                        </div>
</div>
                    <div className="px-3 space-y-2 md:space-y-0">




                        <FormField
                            control={form.control}
                            name="rams"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Risk Assesment/Method Statement Number (RAMS)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} className="rounded-none bg-gray-200 border-black" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="workDuration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expected Duration of Work</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} className="rounded-none bg-gray-200 border-black" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="otherInformation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Any other Information</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} className="rounded-none bg-gray-200 border-black" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="flex justify-between gap-10 pt-10">
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
                                                            new Date() > date
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






                        </div>


                    </div>
                </div>





                <Button type="submit">Add Permit</Button>
            </form>
        </Form>
    )


}



async function addPermit(data: AccountFormValues, userData: DocumentData, workParty: WorkPartyMember[]) {
    console.log("write permit to db");

    let permitId = "phk" + Date.now();

    let permit = {
        id: permitId,
        name: userData.name,
        surname: userData.surname ?? "",
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
        variedPrecautions: data.variedPrecautions,
        isolation: data.isolation,
        sap: data.sap,
        workType: data.workType,
        workDuration: data.workDuration,
        workParty: workParty,
        otherInformation: data.otherInformation

    };


    const ref = doc(db, "permits", permitId);
    try {
        await setDoc(ref, permit, { merge: true });
        console.log("Document successfully written!");


    } catch (error) {
        console.error("Error writing document: ", error);
    }
}


interface WorkPartyMember {
    surname: string;
    company: string;
    phone: string;
}

const WorkParty = ({ setWorkParty }: { setWorkParty: React.Dispatch<React.SetStateAction<WorkPartyMember[]>> }) => {

    const [surname, setSurname] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');

    const handleWorkPartyAdd = (e: React.FormEvent) => {
        e.preventDefault();


        // Create a new object with data from the form
        const newWorkPartyMember: WorkPartyMember = {
            surname,
            company,
            phone,
        };

        // Add the new object to the workParty array
        setWorkParty((prevWorkParty: WorkPartyMember[]) => [...prevWorkParty, newWorkPartyMember]);

        // Clear the form fields
        setSurname('');
        setCompany('');
        setPhone('');
    };

    return (
        <div className="flex w-full items-center space-x-2 pt-10">
            <Button onClick={handleWorkPartyAdd}>Add</Button>
            <Input
                placeholder="Name and Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <Input
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <Input
                type="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
        </div>
    );
};