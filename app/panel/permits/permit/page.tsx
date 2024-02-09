'use client'
import { handSignature } from "@/app/utils/fonts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import { useSearchParams } from "next/navigation"
import { FC, useEffect, useRef, useState } from "react"
import ReviewPermit from "../components/ReviewPermit"
import useAdminStatus from "@/hooks/useAdminStatus"

import { Label } from "@/components/ui/label"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useReactToPrint } from 'react-to-print'
import { Button, buttonVariants } from "@/components/ui/button"
import { Printer, PrinterIcon } from "lucide-react"

import { fetchPermit } from "@/app/utils/Functions"
import Link from "next/link"
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { auth } from "@/app/firebase/config"
import { CheckIcon } from "@radix-ui/react-icons"
import TransferPermit from "../components/TransferPermit"







const PermitTemplate = () => {
    const searchParams = useSearchParams()
    const permitId = searchParams.get('permitId')
    const isAdmin = useAdminStatus()

    const componentRef = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    const [data, setData] = useState<any | null>(null);
    const mail = auth.currentUser?.email
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

    if (!data && !mail) {
        return (
            <div className="space-y-2 p-6">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        )
    }



    if (data === null) {
        return (
            <div className="space-y-2 p-6">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        )
    }




    return (
        <div className="space-y-5">
         

            <div className="border-4 border-black" ref={componentRef}>

                {/*  HEADER  */}

                <div className="border-b-4 border-black flex justify-between bg-[#ff0000] px-1 items-center flex-col lg:flex-row print-lg-flex-row" >
                    <div className="bg-white">YOUR LOGO</div>
                    <div className="text-white lg:text-3xl">ELETRICAL PERMIT TO WORK</div>
                    <div className="flex gap-1">
                        <div className="text-white">PERMIT NO:</div>
                        <div className="bg-white px-1  text-black">{permit.id}</div>
                    </div>

                </div>

                {/*     1 */}
                <div className="border-b-4 border-black p-1 pb-9" >
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>1.</div>
                        <div></div>
                    </div>

                    <div className="px-3 space-y-2">

                        <div className="md:flex md:items-center">
                            <Label className="md:w-40 w-full ">(I) LOCATION</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.location}</div>
                        </div>

                        <div className="md:flex md:items-center">
                            <Label className="md:w-40 w-full ">(II) EQUIPMENT</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.equipment}</div>
                        </div>

                        <div className="md:flex md:items-center">
                            <Label className="md:w-40 w-full ">(III) WORK TO BE DONE</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.description}</div>
                        </div>

                    </div>
                </div>


                {/*    SECTION 2 */}

                <div className="border-b-4 border-black p-1 pb-9">
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>2.</div>
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

{/*                                 <TableRow className="hidden lg:table-row ">
                                    <TableCell className="border-2 border-black">{permit.name} {permit.surname}</TableCell>
                                    <TableCell className="border-2 border-black">{permit.company}</TableCell>
                                    <TableCell className={`border-2 border-black`}>{permit.phoneNumber}</TableCell>

                                </TableRow> */}


                                {/* Rows from workParty */}
                                {Array.isArray(permit.workParty) && permit.workParty.map((member: any, index: number) => (
                                    <TableRow key={index} className="">
                                        <TableCell className="border-2 border-black">{member.surname}</TableCell>
                                        <TableCell className="border-2 border-black">{member.company}</TableCell>
                                        <TableCell className={`border-2 border-black`}>{member.phone}</TableCell>
                                    </TableRow>
                                ))}



                            </TableBody>
                        </Table>






                    </div>
                </div>


                {/*                 <div className="border-b-4 border-black p-1 pb-9" >
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>2.</div>
                        <div>PRECAUTIONS TAKEN TO ACHIEVE <span className="font-bold">SAFETY WORK SYSTEM.</span></div>
                    </div>

                    <div className="px-3 space-y-2">

                        <div className="">
                            <Label className="md:w-40 w-full ">(I) POINTS OF ISOLATION</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.pointsOfIsolation}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(II)PRIMARY EARTHING DEVICE</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.primaryEarthingDevice}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(III) ACTIONS TAKEN TO AVOID <span className="font-bold">DANGER</span> BY DRAINING, VENTING, PURGING AND CONTAINMENT OR DISSIPATION OF STORED ENERGY</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.actionsTaken}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(IV) FURTHER PRECAUTIONS TO BE TAKEN DURING THE COURSE OF THE WORK TO AVOID SYSTEM DERIVED HAZARDS</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.furtherPrecautions}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(V) PRECAUTIONS WHICH MAY BE VARRIED (APPROVED PROCEDURE REQUIRED)</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.variedPrecautions}</div>
                        </div>



                    </div>
                </div> */}

                {/*    SECTION 3 */}

                <div className=" border-black p-1 pb-9">
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>3.</div>
                        <div>DETAILS </div>
                    </div>

                    <div className="px-3 space-y-2 md:space-y-0">
                        <div className="flex justify-center">
                            <div className="pb-10 mx-auto">
                                <Table className="border-2 border-black  font-semibold text-sm text-center max-w-[600px]">

                                    <TableBody className="">

                                        <TableRow className="table-row ">
                                            <TableCell className="border-2 border-black bg-[#ff0000] text-white">ISOLATION REQUIRED?</TableCell>
                                            <TableCell className="border-2 border-black">
                                                <div className="flex space-x-3 justify-end">
                                                    <div>YES</div>
                                                    <div className="bg-gray-200 border border-black w-5 h-5">
                                                        {permit.isolation === 'yes' && <CheckIcon className="h-5 w-5 fill-primary" />}
                                                    </div>

                                                </div>



                                            </TableCell>
                                            <TableCell className="border-2 border-black ">                                       <div className="flex space-x-3 justify-end">
                                                <div>NO</div>
                                                <div className="bg-gray-200 border border-black w-5 h-5">
                                                    {permit.isolation === 'no' && <CheckIcon className="h-5 w-5 fill-primary" />}
                                                </div>

                                            </div></TableCell>


                                        </TableRow>

                                        <TableRow className="table-row ">
                                            <TableCell className="border-2 border-black bg-[#ff0000] text-white">Will an SAP/AP be required to operate equipment?</TableCell>
                                            <TableCell className="border-2 border-black ">                                             <div className="flex space-x-3 justify-end">
                                                <div>YES</div>
                                                <div className="bg-gray-200 border border-black w-5 h-5">
                                                    {permit.sap === 'yes' && <CheckIcon className="h-5 w-5 fill-primary" />}
                                                </div>

                                            </div></TableCell>
                                            <TableCell className="border-2 border-black ">                <div className="flex space-x-3 justify-end">
                                                <div>NO</div>
                                                <div className="bg-gray-200 border border-black w-5 h-5">
                                                    {permit.sap === 'no' && <CheckIcon className="h-5 w-5 fill-primary" />}
                                                </div>

                                            </div></TableCell>

                                        </TableRow>

                                        <TableRow className="table-row ">
                                            <TableCell className="border-2 border-black bg-[#ff0000] text-white">Is this work Mechanical or Electrical?</TableCell>
                                            <TableCell className="border-2 border-black ">                                                <div className="flex space-x-3">
                                                <div>MECHANICAL</div>
                                                <div className="bg-gray-200 border border-black w-5 h-5">
                                                    {permit.workType === 'mechanical' && <CheckIcon className="h-5 w-5 fill-primary" />}
                                                </div>

                                            </div></TableCell>
                                            <TableCell className="border-2 border-black ">      <div className="flex space-x-3">
                                                <div>ELECTRICAL</div>
                                                <div className="bg-gray-200 border border-black w-5 h-5">
                                                    {permit.workType === 'electrical' && <CheckIcon className="h-5 w-5 fill-primary" />}
                                                </div>

                                            </div></TableCell>

                                        </TableRow>



                                    </TableBody>
                                </Table>

                            </div>
                        </div>


                        <div className="">
                            <Label className="md:w-40 w-full ">Risk Assesment/Method Statement Number (RAMS)</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.rams}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">Expected Duration of Work</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.workDuration}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">Any other Information</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{permit.otherInformation}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">Start Date</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{format(new Date(Number(permit.startDate)), 'dd MMMM, yyyy')}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">End Date</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{format(new Date(Number(permit.endDate)), 'dd MMMM, yyyy')}</div>
                        </div>





                    </div>
                </div>





                {/* Section 4 */}


                <div className="border-b-4 border-black p-1 pb-9">
                    <div className="flex space-x-1 text-md font-semibold pb-10">
                        <div>4.</div>
                        <div>APPROVALS</div>
                    </div>

                    <div className="px-3 space-y-2 md:space-y-0">
                        <Table className="border-2 border-black  font-semibold text-sm text-center">
                            <TableHeader className="">
                                <TableRow className="">
                                    <TableHead className="bg-[#ff0000] border-2 border-black text-white text-center">POSITION</TableHead>
                                    <TableHead className="border-2 border-black text-black text-center">NAME</TableHead>
                                    <TableHead className="border-2 border-black text-black text-center">CONTACT NUMBER</TableHead>
                                    <TableHead className="border-2 border-black text-black text-center">SIGNATURE</TableHead>
                                </TableRow>

                            </TableHeader>
                            <TableBody className="">

                                <TableRow className="hidden lg:table-row ">
                                    <TableCell className="bg-[#ff0000] border-2 border-black text-white text-center">CONTROL ENGINEER</TableCell>
                                    <TableCell className="border-2 border-black">{permit.engineerApproved && <div>John Smith</div>} </TableCell>
                                    <TableCell className="border-2 border-black">{permit.engineerApproved && <div>+3483764783</div>} </TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>{permit.engineerApproved && <div>J. Smith</div>}</TableCell>

                                </TableRow>

                                <TableRow className="hidden lg:table-row ">
                                    <TableCell className="bg-[#ff0000] border-2 border-black text-white text-center">SAP</TableCell>
                                    <TableCell className="border-2 border-black">{permit.sapApproved && <div>George Williams</div>} </TableCell>
                                    <TableCell className="border-2 border-black">{permit.sapApproved && <div>+24874543</div>} </TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>{permit.sapApproved && <div>J. Williams</div>}</TableCell>

                                </TableRow>






                            </TableBody>
                        </Table>






                    </div>
                </div>




                {/* Section 5 */}


                <div className=" border-black p-1 pb-9">
                    <div className="flex space-x-1 text-md font-semibold pb-10">
                        <div>5.</div>
                        <div>RECEIVER</div>
                    </div>

                    <div className="px-3 space-y-2 md:space-y-0">
                        <Table className="border-2 border-black  font-semibold text-sm text-center">
                            <TableHeader className="">
                                <TableRow className="">
                                    <TableHead className="bg-[#ff0000] border-2 border-black text-white text-center">POSITION</TableHead>
                                    <TableHead className="border-2 border-black text-black text-center">NAME</TableHead>
                                    <TableHead className="border-2 border-black text-black text-center">CONTACT NUMBER</TableHead>
                                    <TableHead className="border-2 border-black text-black text-center">SIGNATURE</TableHead>
                                </TableRow>

                            </TableHeader>
                            <TableBody className="">

                                <TableRow className="hidden lg:table-row ">
                                    <TableCell className="bg-[#ff0000] border-2 border-black text-white text-center">COMPETENT PERSON</TableCell>
                                    <TableCell className="border-2 border-black">{permit.name} {permit.surname}</TableCell>
                                    <TableCell className="border-2 border-black">{permit.phoneNumber} </TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>{permit.name.slice(0, 1)} {permit.surname}</TableCell>

                                </TableRow>







                            </TableBody>
                        </Table>






                    </div>
                </div>


                {/*                 <div className="border-b-4 border-black p-1 pb-9" >
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
                                    <TableCell className="border-2 border-black">{permit.engineerApproved && <div>John Smith</div>}</TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>{permit.engineerApproved && <div>J. Smith</div>}</TableCell>

                                </TableRow>

                                <TableRow className="lg:hidden">
                                    <TableCell colSpan={2} className="min-h-9 border-2 border-black">CONTROL ENGINEER</TableCell>
                                </TableRow>

                            
                                <TableRow className="lg:hidden min-h-9">
                                    <TableCell className="border-2 border-black">{permit.engineerApproved && <div>John Smith</div>}</TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>{permit.engineerApproved && <div>J. Smith</div>}</TableCell>
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
                                    <TableCell className="min-h-9 border-2 border-black">{permit.sapApproved && <div>George Williams</div>}</TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>{permit.sapApproved && <div>G. Williams</div>}</TableCell>

                                </TableRow>

                          
                                <TableRow className="lg:hidden">
                                    <TableCell colSpan={2} className="min-h-9 border-2 border-black">SENIOR AUTHORISED PERSON / AUTHORISED PERSON</TableCell>
                                </TableRow>

                         
                                <TableRow className="lg:hidden">
                                    <TableCell className="min-h-9 border-2 border-black">{permit.sapApproved && <div>George Williams</div>}</TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>{permit.sapApproved && <div>G. Williams</div>}</TableCell>
                                </TableRow>


                            </TableBody>
                        </Table>



                                            <Table className="border-2 border-black bg-gray-200 font-semibold text-sm text-center">
                            <TableBody className="">
                                <TableRow className="hidden lg:table-row ">
                                    <TableCell className="border-2 border-black w-60">SENIOR AUTHORISED PERSON / AUTHORISED PERSON</TableCell>
                                    <TableCell className="border-2 border-black">{permit.status === 'approved' && <div>Dariusz Gólczyński</div>}</TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>{permit.status === 'approved' && <div>D. Gólczyński</div>}</TableCell>
                                    <TableCell className="border-2 border-black">KEY SAFE NUMBER</TableCell>
                                    <TableCell className="border-2 border-black"></TableCell>
                                </TableRow>

                           
                                <TableRow className="lg:hidden">
                                    <TableCell colSpan={2} className="border-2 border-black">SENIOR AUTHORISED PERSON / AUTHORISED PERSON</TableCell>
                                </TableRow>

                              
                                <TableRow className="lg:hidden">
                                    <TableCell className="border-2 border-black">{permit.status === 'approved' && <div>Dariusz Gólczyński</div>}</TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>{permit.status === 'approved' && <div>D. Gólczyński</div>}</TableCell>
                                </TableRow>

                              
                                <TableRow className="lg:hidden">
                                    <TableCell className="border-2 border-black">KEY SAFE NUMBER</TableCell>
                                    <TableCell className="border-2 border-black"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>  

                    </div>







                </div> */}




            </div>





            <Card>
                <CardHeader>
                    {permit.reason && <CardTitle>Comment</CardTitle>}



                </CardHeader>
                <CardContent>

                    <CardDescription>  {permit.reason}  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {isAdmin && permitId && <ReviewPermit permitId={permitId} email={mail!} sapApproved={permit.sapApproved} engineerApproved={permit.engineerApproved} />}
                    {permit.status === 'rejected' &&
                        <Link href={{
                            pathname: `/panel/permits/editpermit`, query: {
                                permitId: permitId,


                            }
                        }} passHref className={buttonVariants({ variant: "default" })}>

                            Edit permit

                        </Link>
                    }

                    {permit.status === 'approved' && permitId &&
                        <TransferPermit permitId={permitId} />
                    }

                    <Button onClick={handlePrint}><PrinterIcon className="mr-2 h-4 w-4" />Print the Permit</Button>
                </CardFooter>
            </Card>

        </div>

    )


}



export default PermitTemplate




