'use client'

import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'
import { usePermits } from '@/hooks/usePermits'
import { auth } from '@/app/firebase/config'

const RejectedPermits = () => {
    const email = auth.currentUser?.email ?? ""
    const { rejected } = usePermits(email)
    return (
        <DataTable columns={columns} data={rejected} />
    )
}

export default RejectedPermits