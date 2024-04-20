'use client'

import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'
import { usePermits } from '@/hooks/usePermits'
import { auth } from '@/app/firebase/firebaseConfig'

const PendingPermits = () => {
    const email = auth.currentUser?.email ?? ""
    const { pending } = usePermits(email)
    return (
        <DataTable columns={columns} data={pending} />
    )
}

export default PendingPermits