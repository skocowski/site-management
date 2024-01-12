import { fetchPermits, readData } from '@/app/utils/Functions'
import { Permit } from '@/app/utils/types';
import { useUserPermits } from '@/hooks/useUserPermits';
import { getFunctions } from 'firebase/functions'
import React from 'react'

const PermitsList = () => {

  const { data: permits, isLoading } = useUserPermits()
  
  if (isLoading) return null

  return (
    <div>
      <h2>Permits</h2>
     

    </div> 
  )
}

export default PermitsList

