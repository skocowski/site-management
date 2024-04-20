'use client'

import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'
import { auth, db } from "@/app/firebase/firebaseConfig";
import { usePermits } from "@/hooks/usePermits";


const AllPermits = () => {

  
const email = auth.currentUser?.email ?? ""

  const { permits } = usePermits(email)
  
  return (
    <DataTable columns={columns} data={permits} /> 
   
  )
}

export default AllPermits


