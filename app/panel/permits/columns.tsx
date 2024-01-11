"use client"

import { Permit } from "@/app/utils/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

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
           


            return (
                <div className='lowercase'>...{typeof val === 'string' && val.slice(11)}</div>
            )


        }
      
/*         cell: (props) => <div className='capitalize'>{props.row.getValue("id")}</div> */
    },
    {
        accessorKey: "location",
        header: "Location",
 /*        cell: (props) => <div className='lowercase'>{props.row.getValue("location")}</div> */
    },
    {
        accessorKey: "description",
        header: "Description",
/*         cell: (props) => <div className='lowercase truncate'>{props.row.getValue("description")}</div> */
    },
    {
        accessorKey: "date",
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
            const timestamp = row.getValue("date")
            let formatted: any
            if (typeof timestamp === 'number') {
                formatted = format(timestamp, 'yyyy-MM-dd')   
     }
         
  
            return (
                <div className='lowercase'>{formatted && formatted  }</div> 
            )
                
          
         }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const permit = row.original

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
                        <DropdownMenuItem>Oepn permit</DropdownMenuItem>
                        <DropdownMenuItem>Print</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]