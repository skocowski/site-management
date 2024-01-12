'use client'
import { DataTable } from '@/components/table/data-table'
import { useUserPermits } from '@/hooks/useUserPermits'
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { Permit } from '@/app/utils/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePermitsTypeContext } from '@/app/utils/PermitsTypeContext'

const PermitsMain = () => {
   /*  const searchParams = useSearchParams()
    const type = searchParams.get("type") || 'all' */
    /*     const { data } = useUserPermits() */
    const { data, type } = usePermitsTypeContext() 
  
    const filterDataByStatus = (status: string): Permit[] => {
        return status === 'all' ? data : data.filter((permit) => permit.status === status);
    };

     let filteredData = filterDataByStatus(type); 


    useEffect(() => {
        filteredData = filterDataByStatus(type)
    }, [type]) 



    
  return (
      <section className=''>
          <div className='container'>
         
            
              <DataTable columns={columns} data={filteredData} />
          </div>
  </section>
  )
}

export default PermitsMain

