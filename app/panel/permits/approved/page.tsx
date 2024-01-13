'use client'
import { useUserPermits } from '@/hooks/useUserPermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'

const ApprovedPermits = () => {
    const { approved } = useUserPermits()
    return (
        <DataTable columns={columns} data={approved} />
    )
}

export default ApprovedPermits