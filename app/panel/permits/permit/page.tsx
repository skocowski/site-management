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
import { FC } from "react"
import ReviewPermit from "../components/ReviewPermit"
import useAdminStatus from "@/hooks/useAdminStatus"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"



const PermitTemplate = () => {
    const searchParams = useSearchParams()
    const permitId = searchParams.get("permitId")
    const location = searchParams.get("location")
    const equipment = searchParams.get("equipment")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const rams = searchParams.get("rams")
    const description = searchParams.get("description")
    const pointsOfIsolation = searchParams.get("pointsOfIsolation")
    const primaryEarthingDevice = searchParams.get("primaryEarthingDevice")
    const actionsTaken = searchParams.get("actionsTaken")
    const furtherPrecautions = searchParams.get("furtherPrecautions")
    const variedPrecautions = searchParams.get("variedPrecautions")
    const reason = searchParams.get("reason")
    const status = searchParams.get("status")

    const isAdmin = useAdminStatus()
    return (
        <>


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
                <div className="border-b-4 border-black p-1 pb-9" >
                    <div className="flex space-x-1 text-md font-semibold">
                        <div>1.</div>
                        <div></div>
                    </div>

                    <div className="px-3 space-y-2">

                        <div className="md:flex md:items-center">
                            <Label className="md:w-40 w-full ">(I) LOCATION</Label>
                            <div className="h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{location}</div>
                        </div>

                        <div className="md:flex md:items-center">
                            <Label className="md:w-40 w-full ">(II) EQUIPMENT</Label>
                            <div className="h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{equipment}</div>
                        </div>

                        <div className="md:flex md:items-center">
                            <Label className="md:w-40 w-full ">(III) WORK TO BE DONE</Label>
                            <div className="h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{description}</div>
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
                            <div className="h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{pointsOfIsolation}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(II)PRIMARY EARTHING DEVICE</Label>
                            <div className="h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{primaryEarthingDevice}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(III) ACTIONS TAKEN TO AVOID <span className="font-bold">DANGER</span> BY DRAINING, VENTING, PURGING AND CONTAINMENT OR DISSIPATION OF STORED ENERGY</Label>
                            <div className="h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{actionsTaken}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(IV) FURTHER PRECAUTIONS TO BE TAKEN DURING THE COURSE OF THE WORK TO AVOID SYSTEM DERIVED HAZARDS</Label>
                            <div className="h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{furtherPrecautions}</div>
                        </div>

                        <div className="">
                            <Label className="md:w-40 w-full ">(V) PRECAUTIONS WHICH MAY BE VARRIED (APPROVED PROCEDURE REQUIRED)</Label>
                            <div className="h-9 bg-gray-200 border-black border border-input w-full px-3 py-2 text-sm shadow-sm">{variedPrecautions}</div>
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
                        <div className="border-2 border-black bg-gray-200 font-semibold flex flex-col md:flex-row">
                            <div className="p-2 md:border-r-2 border-black md:w-60 w-full text-center border-b-2 md:border-b-0">CONTROL ENGINEER</div>
                            <div className="flex-grow grid grid-cols-2 items-center ">
                                <div className='p-2 md:border-r-2 border-black text-center '>John Smith</div>
                                <div className={` text-2xl text-center ${handSignature.className} `}>J. Smith</div>
                            </div>

                        </div>



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


            </div>


        {/*     <Card className="w-full text-slate-950">
                <CardHeader className="bg-blue-600 rounded-t-lg">
                    <CardTitle>


                        <div className="text-white text-center">ELECTRICAL PERMIT TO WORK</div></CardTitle>
                    <CardDescription className="">
                        <div className="w-full flex justify-between items-center">

                            <div className="">
                                {status && status === 'pending' && <div><Badge variant="pending" className="ml-auto p-1">{status}</Badge></div>}
                                {status && status === 'approved' && <Badge variant="approved" className="ml-auto p-1">{status}</Badge>}
                                {status && status === 'rejected' && <Badge variant="rejected" className="ml-auto p-1">{status}</Badge>}
                            </div>

                            <div className="text-white ml-auto">
                                Permit number: {permitId}
                            </div>

                        </div>

                    </CardDescription>

                </CardHeader>
                <CardContent>



                    <div className="space-y-10">

                 

                        <div className="space-y-3 pt-10">
                            <div className="flex justify-between items-center">

                                <h1 className="pb-5"><span className="font-bold mr-2">1.</span>Work details </h1>
                                {isAdmin && permitId && <ReviewPermit permitId={permitId} />}

                            </div>


                            <div className="flex flex-col sm:flex-row sm:gap-5 gap-1 items-start sm:items-center">
                                <div className="font-semibold flex-none sm:w-24 w-full">Location</div>
                                <div className="text-sm text-muted-foreground">    {location}</div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:gap-5 gap-1 items-start sm:items-center">
                                <div className="font-semibold flex-none sm:w-24 w-full">Equipment</div>
                                <div className="text-sm text-muted-foreground">{equipment}</div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:gap-5 gap-1 items-start sm:items-center">
                                <div className="font-semibold flex-none sm:w-24 w-full">Date</div>
                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-5">
                                    <div className="text-sm text-muted-foreground">Start:  {format(Number(startDate), 'yyyy-MM-dd')}</div>
                                    <div className="text-sm text-muted-foreground">End: {format(Number(endDate), 'yyyy-MM-dd')}</div>
                                </div>

                            </div>

                            <div className="flex flex-col sm:flex-row sm:gap-5 gap-1 items-start sm:items-center">
                                <div className="font-semibold flex-none sm:w-24 w-full">Rams</div>
                                <div className="text-sm text-muted-foreground">{rams}</div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:gap-5 gap-1 items-start sm:items-center">
                                <div className="font-semibold flex-none sm:w-24 w-full">Work to be done</div>
                                <div className="text-sm text-muted-foreground">{description}</div>
                            </div>


                        </div>










             

                        <div className="space-y-3">

                            <h1 className="pb-5"><span className="font-bold mr-2">2.</span>Precautions taken to achieve <span className="font-bold">safety from the system</span></h1>

                            <div className="flex flex-col gap-1 items-start ">
                                <div className="font-semibold flex-none w-full">Points of isolation</div>
                                <div className="text-sm text-muted-foreground">   {pointsOfIsolation}</div>
                            </div>

                            <div className="flex flex-col gap-1 items-start ">
                                <div className="font-semibold flex-none w-full">Primary earth device(s)</div>
                                <div className="text-sm text-muted-foreground">  {primaryEarthingDevice}</div>
                            </div>

                            <div className="flex flex-col gap-1 items-start ">
                                <div className="font-semibold flex-none w-full">Actions taken to avoid <span className="font-bold">danger</span> by draining, venting, purging and containment or dissipation of stored energy</div>
                                <div className="text-sm text-muted-foreground">{actionsTaken}</div>
                            </div>

                            <div className="flex flex-col gap-1 items-start ">
                                <div className="font-semibold flex-none w-full">Further precautions to be taken during the course of the work to avoid system derived hazards</div>
                                <div className="text-sm text-muted-foreground">{furtherPrecautions}</div>
                            </div>

                            <div className="flex flex-col gap-1 items-start ">
                                <div className="font-semibold flex-none w-full">Precautions which may be varried (approved procedure required)</div>
                                <div className="text-sm text-muted-foreground">  {variedPrecautions}</div>
                            </div>

                        </div>




                     

                        <div className="space-y-3">

                            <h1 className="pb-5"><span className="font-bold mr-2">3.</span><span className="font-bold">Preparation</span></h1>

                            <div className="italic p-1">I have confirmed with the control engineer that the precautions in section 2(I) & 2(I) have been carried out and iwll be maintained until the permit for work is cancelled.</div>


                            <div className="flex flex-col sm:flex-row sm:gap-5 gap-1 items-start sm:items-center">
                                <div className="font-semibold flex-none sm:w-64 w-full">Control engineer giving consent </div>
                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-5 justify-between w-full">
                                    <div className="text-md text-muted-foreground">Adam Miller</div>
                                    <div className="text-sm text-muted-foreground">Key safe number: <span className="font-semibold">28374</span></div>
                                </div>

                            </div>

                            <Separator />

                            <div className="italic p-1">I certify that precautions carried out in section 2 are adequate to provide <span className="font-semibold">safety from the system</span> for the work specified in section 1.</div>

                            <div className="flex flex-col lg:flex-row md:gap-5 gap-3 items-start lg:items-center">
                                <div className="font-semibold flex-none lg:w-64 w-full">Authorised Person / Senior Authorised </div>
                                <div className="flex flex-col sm:flex-row gap-1 md:gap-10 sm:gap-5 w-full">
                                    <div className={`${handSignature.className} text-3xl text-muted-foreground md:w-64 sm:44`}>John Smith</div>
                                    <div className="block">
                                        <div className="text-sm text-muted-foreground"><span className="text-md">John Smith</span>, Friday, 15 May 2023, 11: 23</div>
                                        <div className="text-sm text-muted-foreground">0044 3384 339417</div>
                                    </div>

                                </div>

                            </div>
                        </div>



                   

                        <div className="space-y-3">

                            <h1 className="pb-5"><span className="font-bold mr-2">4.</span><span className="font-bold">Issue</span></h1>

                            <div className="italic p-1">Issued by the <span className="font-semibold">Authorised Person</span> or <span className="font-semibold">Senior Authorised Person</span> responsible for the issue of this document.</div>


                            <div className="flex flex-col lg:flex-row md:gap-5 gap-3 items-start lg:items-center">
                                <div className="font-semibold flex-none lg:w-64 w-full">Authorised Person / Senior Authorised </div>
                                <div className="flex flex-col sm:flex-row gap-1 md:gap-10 sm:gap-5 w-full">
                                    <div className={`${handSignature.className} text-3xl text-muted-foreground md:w-64 sm:44`}>Thomas Wilson</div>
                                    <div className="block">
                                        <div className="text-sm text-muted-foreground"><span className="text-md">Thomas Wilson</span>, Friday, 15 May 2023, 11: 23</div>
                                        <div className="text-sm text-muted-foreground">0044 3384 339417</div>
                                    </div>

                                </div>

                            </div>

                            <div className="flex flex-col lg:flex-row md:gap-5 gap-3 items-start lg:items-center">
                                <div className="flex-none lg:w-64 w-full">Supporting documentation & items attached</div>
                                <div className="flex flex-col sm:flex-row gap-1 md:gap-10 sm:gap-5 w-full">
                                    <div className="block md:w-64 sm:44">
                                        <div className="text-sm text-muted-foreground flex space-x-10">
                                            <p className="w-18">SLD:</p>
                                            <p>FALSE</p>
                                        </div>
                                        <div className="text-sm text-muted-foreground flex space-x-10">
                                            <p className="w-18">P&ID:</p>
                                            <p>FALSE</p>
                                        </div>

                                    </div>
                                    <div className="block ">
                                        <div className="text-sm text-muted-foreground flex space-x-10">
                                            <p className="w-18">ACCES KEY:</p>
                                            <p>FALSE</p>
                                        </div>
                                        <div className="text-sm text-muted-foreground flex space-x-10">
                                            <p className="w-18">OTHER:</p>
                                            <p></p>
                                        </div>

                                    </div>

                                </div>
                            </div>


                        </div>



                      

                        <div className="space-y-3">

                            <h1 className="pb-5"><span className="font-bold mr-2">4.</span><span className="font-bold">Receipt</span></h1>
                            <section>
                                <p className="italic">I being the <span className="font-semibold">Competent Person</span> in charge understand and accept my responsibilities for the works specified in section 1(III).</p>
                                <p className="italic">I hereby receive this document & any supporting documentation & items as detailed in section 4.</p>
                                <p className="italic">In addition requirements <span className="font-semibold">general safety</span>  have been met and risks mitigated.</p>
                            </section>

                            <div className="flex flex-col lg:flex-row md:gap-5 gap-3 items-start lg:items-center">
                                <div className="font-semibold flex-none lg:w-64 w-full">Competent Person </div>
                                <div className="flex flex-col sm:flex-row gap-1 md:gap-10 sm:gap-5 w-full">
                                    <div className={`${handSignature.className} text-3xl text-muted-foreground md:w-64 sm:44`}>Andrew Lawson</div>
                                    <div className="block">
                                        <div className="text-sm text-muted-foreground"><span className="text-md">Thomas Wilson</span>, CP NO. 38932</div>
                                        <div className="text-sm text-muted-foreground">0044 3384 339417</div>
                                        <div className="text-sm text-muted-foreground">Friday, 15 May 2023, 11: 23</div>
                                        <div className="text-sm text-muted-foreground">Key Safe received</div>

                                    </div>

                                </div>

                            </div>
                        </div>




                    </div>







                </CardContent>
                <CardFooter className="flex justify-between">
          
                </CardFooter>
            </Card> */}

            <div>Reason: {reason}</div>
        </>

    )
}



export default PermitTemplate