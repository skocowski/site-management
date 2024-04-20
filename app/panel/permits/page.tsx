'use client'
import { DataTable } from '@/app/panel/permits/components/PermitTable'

import React, { useEffect, useState } from 'react'
import { columns } from './components/columns'

import { auth } from '@/app/firebase/firebaseConfig'
import { usePermits } from '@/hooks/usePermits'

const PermitsMain = () => {


    const email = auth.currentUser?.email ?? ""
const {permits} = usePermits(email)





    
  return (

         
            
              <DataTable columns={columns} data={permits} />

  )
}

export default PermitsMain

