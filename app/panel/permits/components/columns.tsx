"use client"

import { Permit } from "@/app/utils/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import Link from "next/link"




export const columns: ColumnDef<Permit>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Permit ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const val = row.getValue("id")
            const permit = row.original


            return (
                                        <Link href={{
                            pathname: `/panel/permits/permit`, query: {
                                permitId: permit.id,
/*                                 location: permit.location,
                                equipment: permit.equipment,
                                startDate: permit.startDate,
                                endDate: permit.endDate,
                                rams: permit.rams,
                                description: permit.description,
                                pointsOfIsolation: permit.pointsOfIsolation,
                                primaryEarthingDevice: permit.primaryEarthingDevice,
                                actionsTaken: permit.actionsTaken,
                                furtherPrecautions: permit.furtherPrecautions,
                                variedPrecautions: permit.variedPrecautions,
                                reason: permit.reason,
                                status: permit.status */
                            }
                        }} passHref>
                    <div className=''>...{typeof val === 'string' && val.slice(11)}</div>
                        </Link>
         
            )


        }

        /*         cell: (props) => <div className='capitalize'>{props.row.getValue("id")}</div> */
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
            const val = row.getValue("location")
            const permit = row.original
            return (
                <Link href={{
                    pathname: `/panel/permits/permit`, query: {
                        permitId: permit.id,
/*                         location: permit.location,
                        equipment: permit.equipment,
                        startDate: permit.startDate,
                        endDate: permit.endDate,
                        rams: permit.rams,
                        description: permit.description,
                        pointsOfIsolation: permit.pointsOfIsolation,
                        primaryEarthingDevice: permit.primaryEarthingDevice,
                        actionsTaken: permit.actionsTaken,
                        furtherPrecautions: permit.furtherPrecautions,
                        variedPrecautions: permit.variedPrecautions,
                        reason: permit.reason,
                        status: permit.status */
                    }
                }} passHref>
                    <div className=''>{ row.getValue("location") }</div>
                </Link>
                  )
              } 
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const val = row.getValue("description")
            const permit = row.original
            return (
                <Link href={{
                    pathname: `/panel/permits/permit`, query: {
                        permitId: permit.id,
/*                         location: permit.location,
                        equipment: permit.equipment,
                        startDate: permit.startDate,
                        endDate: permit.endDate,
                        rams: permit.rams,
                        description: permit.description,
                        pointsOfIsolation: permit.pointsOfIsolation,
                        primaryEarthingDevice: permit.primaryEarthingDevice,
                        actionsTaken: permit.actionsTaken,
                        furtherPrecautions: permit.furtherPrecautions,
                        variedPrecautions: permit.variedPrecautions,
                        reason: permit.reason,
                        status: permit.status */
                    }
                }} passHref>
                    <div className='lowercase'>{row.getValue("description")}</div>
                </Link>
            )
        } 
        /*         cell: (props) => <div className='lowercase truncate'>{props.row.getValue("description")}</div> */
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const timestamp = row.getValue("startDate")
            let formatted: any
            if (typeof timestamp === 'number') {
                formatted = format(timestamp, 'yyyy-MM-dd')
            }
            const permit = row.original

            return (
                                <Link href={{
                    pathname: `/panel/permits/permit`, query: {
                        permitId: permit.id,
/*                         location: permit.location,
                        equipment: permit.equipment,
                        startDate: permit.startDate,
                        endDate: permit.endDate,
                        rams: permit.rams,
                        description: permit.description,
                        pointsOfIsolation: permit.pointsOfIsolation,
                        primaryEarthingDevice: permit.primaryEarthingDevice,
                        actionsTaken: permit.actionsTaken,
                        furtherPrecautions: permit.furtherPrecautions,
                        variedPrecautions: permit.variedPrecautions,
                        reason: permit.reason,
                        status: permit.status */
                    }
                }} passHref>
                    <div className='lowercase'>{formatted && formatted}</div>
                </Link>
               
            )


        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const permit = row.original

            /*             const router = useRouter();
            
                        const handleOpenPermit = () => {
                            // Use the Link component to create a link to the PermitTemplate page
                            // and pass the permit object as a query parameter
                            router.push(`/panel/permits/permit`);
                        }; */

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(permit.id)}
                        >
                            Copy permit ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />


                        <Link href={{
                            pathname: `/panel/permits/permit`, query: {
                                permitId: permit.id,
/*                                 location: permit.location,
                                equipment: permit.equipment,
                                startDate: permit.startDate,
                                endDate: permit.endDate,
                                rams: permit.rams,
                                description: permit.description,
                                pointsOfIsolation: permit.pointsOfIsolation,
                                primaryEarthingDevice: permit.primaryEarthingDevice,
                                actionsTaken: permit.actionsTaken,
                                furtherPrecautions: permit.furtherPrecautions,
                                variedPrecautions: permit.variedPrecautions,
                                reason: permit.reason,
                                status: permit.status */
                            }
                        }} passHref>
                            <DropdownMenuItem >
                                Open permit
                            </DropdownMenuItem>
                        </Link>






                        <DropdownMenuItem>Print</DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]