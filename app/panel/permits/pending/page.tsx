'use client'
import { useUserPermits } from '@/hooks/useUserPermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'
import { usePermits } from '@/hooks/usePermits'

const PendingPermits = () => {
    const { pending } = usePermits()
    return (
        <DataTable columns={columns} data={pending} />
    )
}

export default PendingPermits