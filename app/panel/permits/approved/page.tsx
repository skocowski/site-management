'use client'
import { useUserPermits } from '@/hooks/useUserPermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'
import { usePermits } from '@/hooks/usePermits'

const ApprovedPermits = () => {
    const { approved } =  usePermits()
    return (
        <DataTable columns={columns} data={approved} />
    )
}

export default ApprovedPermits