'use client'
import { auth } from '@/app/firebase/config'
import { usePermits } from '@/hooks/usePermits'
import React from 'react'
import { columns } from '../components/columns'
import { DataTable } from '../components/PermitTable'

const ToReview = () => {
    const email = auth.currentUser?.email ?? ""
    const { permitsToReview } = usePermits(email)
    return (
        <DataTable columns={columns} data={permitsToReview} />
    )
}

export default ToReview