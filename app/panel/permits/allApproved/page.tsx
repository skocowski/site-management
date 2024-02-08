'use client'
import { auth } from '@/app/firebase/config'
import { usePermits } from '@/hooks/usePermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'

const AllApproved = () => {
    const email = auth.currentUser?.email ?? ""
    const { allApproved } = usePermits(email)
    return (
        <DataTable columns={columns} data={allApproved} />
    )
}

export default AllApproved