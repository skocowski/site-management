'use client'
import { useUserPermits } from '@/hooks/useUserPermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'

const RejectedPermits = () => {
    const { rejected } = useUserPermits()
    return (
        <DataTable columns={columns} data={rejected} />
    )
}

export default RejectedPermits