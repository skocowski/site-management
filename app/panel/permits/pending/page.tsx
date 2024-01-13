'use client'
import { useUserPermits } from '@/hooks/useUserPermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'

const PendingPermits = () => {
    const { pending } = useUserPermits()
    return (
        <DataTable columns={columns} data={pending} />
    )
}

export default PendingPermits