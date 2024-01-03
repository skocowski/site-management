 'use client' 
import { promises as fs } from "fs"
import path from "path"

import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import { permitSchema } from "./data/schema"
import { usePermitsList } from "@/hooks/usePermitsList"
import { fetchPermits } from "@/app/utils/Functions"
import { MainTable } from "./MainTable"



// Simulate a database read for tasks.
async function getTasks() {
    const data = await fs.readFile(
        path.join(process.cwd(), "/app/panel/permits/data/tasks.json")
    )

    const tasks = JSON.parse(data.toString())

    return z.array(permitSchema).parse(tasks)
}

const Permits = () => {
 /*    const tasks = await getTasks() */
    const { data: permits, isLoading } = usePermitsList()

    if (isLoading) return null  

 /*    const permits = await fetchPermits() */

    return (
        <>
            <MainTable />
        </>
/*         <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of your tasks for this month!
                    </p>
                </div>

            </div>
            <DataTable data={permits} columns={columns} />
        </div> */

/*         <div>
            <h2>Permits</h2>

            <ul>
                {permits.map((permit: Permit, index: any) => (
                    <li key={index}>
                        <h3>{permit.applicant}</h3>
                        <p>Badge: {permit.badge}</p>
                        <p>Company: {permit.company}</p>
                        <p>Contact Number: {permit.contactNumber}</p>
                         <p>Date: {permit.date.toDate().toLocaleDateString()}</p> 
                        <p>Description: {permit.description}</p>
                        <p>Isolation: {permit.isolation}</p>
                        <p>Location: {permit.location}</p>
                        <p>Rams: {permit.rams}</p>
                        <p>Type: {permit.type}</p>
                    </li>
                ))}
            </ul>
        </div> */
    )
}

export default Permits



