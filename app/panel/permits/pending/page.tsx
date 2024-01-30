'use client'
import { useUserPermits } from '@/hooks/useUserPermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'
import { usePermits } from '@/hooks/usePermits'
import { auth } from '@/app/firebase/config'

const PendingPermits = () => {
    const email = auth.currentUser?.email ?? ""
    const { pending } = usePermits(email)
    return (
        <DataTable columns={columns} data={pending} />
    )
}

export default PendingPermits