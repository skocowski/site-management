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
import { useReactToPrint} from 'react-to-print'
import { Button, buttonVariants } from "@/components/ui/button"
import { Printer, PrinterIcon } from "lucide-react"

import { fetchPermit } from "@/app/utils/Functions"
import Link from "next/link"
import { format } from "date-fns"







const PermitTemplate = () => {
    const searchParams = useSearchParams()
    const permitId =  searchParams.get('permitId')
    const isAdmin = useAdminStatus()

    const componentRef = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    const [permit, setPermit] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchPermit(permitId as string);
                setPermit(result);
            } catch (error) {
                console.error('Error fetching permit:', error);
                setPermit(null);
            }
        };

        if (permitId) {
            fetchData();
        }
    }, [permitId]);

    // Rest of your component logic...

    const parsedPermit = JSON.parse(String(permit));

    if (!parsedPermit) {
        return <div>Loading...</div>;
    }
  




    if (parsedPermit  === null) return <div>Error</div>;


    return (
        <div className="space-y-5">


            <div className="border-4 border-black" ref={componentRef}>

                {/*  HEADER  */}

                <div className="border-b-4 border-black flex justify-between bg-[#ff0000] px-1 items-center flex-col lg:flex-row print-lg-flex-row" >
                    <div className="bg-white">YOUR LOGO</div>
                    <div className="text-white lg:text-3xl">ELETRICAL PERMIT TO WORK</div>
                    <div className="flex gap-1">
                        <div className="text-white">PERMIT NO:</div>
                        <div className="bg-white px-1  text-black">{parsedPermit?.id?.stringValue}</div>
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
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.location?.stringValue}</div>
                        </div>

                        <div className="md:flex md:items-center">
                            <Label className="md:w-40 w-full ">(II) EQUIPMENT</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.equipment?.stringValue}</div>
                        </div>

                        <div className="md:flex md:items-center">
                            <Label className="md:w-40 w-full ">(III) WORK TO BE DONE</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.description?.stringValue}</div>
                        </div>

                    </div>
                </div>


                {/*    SECTION 2 */}


                <div className="border-b-4 border-black p-1 pb-9" >
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>2.</div>
                        <div>PRECAUTIONS TAKEN TO ACHIEVE <span className="font-bold">SAFETY WORK SYSTEM.</span></div>
                    </div>

                    <div className="px-3 space-y-2">

                        <div className="">
                            <Label className="md:w-40 w-full ">(I) POINTS OF ISOLATION</Label>
                            <div className=" bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.pointsOfIsolation?.stringValue}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(II)PRIMARY EARTHING DEVICE</Label>
                            <div className=" bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.primaryEarthingDevice?.stringValue}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(III) ACTIONS TAKEN TO AVOID <span className="font-bold">DANGER</span> BY DRAINING, VENTING, PURGING AND CONTAINMENT OR DISSIPATION OF STORED ENERGY</Label>
                            <div className=" bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.actionsTaken?.stringValue}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(IV) FURTHER PRECAUTIONS TO BE TAKEN DURING THE COURSE OF THE WORK TO AVOID SYSTEM DERIVED HAZARDS</Label>
                            <div className=" bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.furtherPrecautions?.stringValue}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(V) PRECAUTIONS WHICH MAY BE VARRIED (APPROVED PROCEDURE REQUIRED)</Label>
                            <div className=" bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.variedPrecautions?.stringValue}</div>
                        </div>



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
                                    <TableCell className="border-2 border-black">    {parsedPermit.status.stringValue === 'approved' && <div>John Smith</div>}</TableCell>
                                    <TableCell className={`border-2 border-black text-2xl ${handSignature.className}`}> {parsedPermit.status.stringValue === 'approved' && <div>J. Smith</div>}</TableCell>

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
                                    <TableCell className="border-2 border-black">{parsedPermit.status.stringValue === 'approved' && <div>J. Smith</div>}</TableCell>
                                    <TableCell className={`border-2 border-black ${handSignature.className}`}>{parsedPermit.status.stringValue === 'approved' && <div>J. Smith</div>}</TableCell>
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

                                <TableRow className="hidden lg:table-row ">
                                    <TableCell className="border-2 border-black">{parsedPermit?.name?.stringValue} { parsedPermit?.surname?.stringValue }</TableCell>
                                    <TableCell className="border-2 border-black">{ parsedPermit?.company?.stringValue }</TableCell>
                                    <TableCell className={`border-2 border-black`}>{parsedPermit?.phoneNumber?.stringValue}</TableCell>

                                </TableRow>


                                {/* Rows from workParty */}
                                {parsedPermit.workParty && Array.isArray(parsedPermit.workParty.arrayValue.values) && parsedPermit.workParty.arrayValue.values.map((member: any, index: number) => (
                                    <TableRow key={index} className="hidden lg:table-row">
                                        <TableCell className="border-2 border-black">{member.mapValue.fields.surname.stringValue}</TableCell>
                                        <TableCell className="border-2 border-black">{member.mapValue.fields.company.stringValue}</TableCell>
                                        <TableCell className={`border-2 border-black`}>{member.mapValue.fields.phone.stringValue}</TableCell>
                                    </TableRow>
                                ))}



                            </TableBody>
                        </Table>

                    




                    </div>
                </div>


                {/* Section 5 */}




                <div className=" border-black p-1 pb-9">
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>5.</div>
                        <div>DETAILS </div>
                    </div>

                    <div className="px-3 space-y-2 md:space-y-0">
                        <div className="flex justify-center">
                        <div className="pb-10 mx-auto">
                            <Table className="border-2 border-black  font-semibold text-sm text-center max-w-[600px]">

                                <TableBody className="">

                                    <TableRow className="table-row ">
                                        <TableCell className="border-2 border-black bg-[#ff0000] text-white">ISOLATION REQUIRED?</TableCell>
                                        <TableCell className="border-2 border-black ">{parsedPermit?.isolation?.stringValue }</TableCell>
                                      

                                    </TableRow>

                                    <TableRow className="table-row ">
                                        <TableCell className="border-2 border-black bg-[#ff0000] text-white">Will an SAP/AP be required to operate equipment?</TableCell>
                                        <TableCell className="border-2 border-black ">{parsedPermit?.sap?.stringValue}</TableCell>

                                    </TableRow>

                                    <TableRow className="table-row ">
                                        <TableCell className="border-2 border-black bg-[#ff0000] text-white">Is this work Mechanical or Electrical?</TableCell>
                                        <TableCell className="border-2 border-black ">{parsedPermit?.workType?.stringValue}</TableCell>

                                    </TableRow>



                                </TableBody>
                            </Table>

                        </div>
                        </div>


                        <div className="">
                            <Label className="md:w-40 w-full ">Risk Assesment/Method Statement Number (RAMS)</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.rams?.stringValue}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">Expected Duration of Work</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.workDuration?.stringValue}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">Any other Information</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{parsedPermit?.otherInformation?.stringValue}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">Start Date</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{format(new Date(Number(parsedPermit?.startDate?.integerValue)), 'dd MMMM, yyyy') }</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">End Date</Label>
                            <div className="min-h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{format(new Date(Number(parsedPermit?.endDate?.integerValue)), 'dd MMMM, yyyy')}</div>
                        </div>





                    </div>
                </div>


            </div>





            <Card>
                <CardHeader>
                    {parsedPermit?.reason?.stringValue && <CardTitle>Comment</CardTitle>}


                </CardHeader>
                <CardContent>

                    <CardDescription>  {parsedPermit?.reason?.stringValue}  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                            {isAdmin && permitId && <ReviewPermit permitId={permitId} />}
                   {parsedPermit.status.stringValue === 'rejected' && 
                                        <Link  href={{
                            pathname: `/panel/permits/editpermit`, query: {
                                permitId: permitId,


                            }
                        }} passHref className={buttonVariants({ variant: "default" })}>
                          
                                Edit permit
                         
                        </Link>
                    }   
                    <Button onClick={handlePrint}><PrinterIcon className="mr-2 h-4 w-4" />Print the Permit</Button>
                </CardFooter>
            </Card>

        </div>

    )


}



export default PermitTemplate




