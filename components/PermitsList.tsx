import { fetchPermits, readData } from '@/app/utils/Functions'
import { Permit } from '@/app/utils/types';
import { usePermitsList } from '@/hooks/usePermitsList';
import { getFunctions } from 'firebase/functions'
import React from 'react'

const PermitsList = () => {

  const { data: permits, isLoading } = usePermitsList()
  
  if (isLoading) return null

  return (
    <div>
      <h2>Permits</h2>
     
      <ul>
        {permits.map((permit: Permit, index: any) => (
          <li key={index}>
            <h3>{permit.applicant}</h3>
            <p>Badge: {permit.badge}</p>
            <p>Company: {permit.company}</p>
            <p>Contact Number: {permit.contactNumber}</p>
     {/*        <p>Date: {permit.date.toDate().toLocaleDateString()}</p> */}
            <p>Description: {permit.description}</p>
            <p>Isolation: {permit.isolation}</p>
            <p>Location: {permit.location}</p>
            <p>Rams: {permit.rams}</p>
            <p>Type: {permit.type}</p>
          </li>
        ))}
      </ul>
    </div> 
  )
}

export default PermitsList

