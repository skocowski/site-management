'use client'
import { useUserPermits } from '@/hooks/useUserPermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'

const AllPermits = () => {
    const {all} = useUserPermits()
  return (
      <DataTable columns={columns} data={all} />
  )
}

export default AllPermits