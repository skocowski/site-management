'use client'
import { useUserPermits } from '@/hooks/useUserPermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'
import { usePermits } from '@/hooks/usePermits'

const RejectedPermits = () => {
    const { rejected } = usePermits()
    return (
        <DataTable columns={columns} data={rejected} />
    )
}

export default RejectedPermits