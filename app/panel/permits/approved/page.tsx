'use client'
import { useUserPermits } from '@/hooks/useUserPermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'
import { usePermits } from '@/hooks/usePermits'
import { auth } from '@/app/firebase/config'

const ApprovedPermits = () => {
    const email = auth.currentUser?.email ?? ""
    const { approved } =  usePermits(email)
    return (
        <DataTable columns={columns} data={approved} />
    )
}

export default ApprovedPermits