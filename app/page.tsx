"use client";


import Image from 'next/image';
import Header from './Header';
import AddPermitOld from './AddPermitOld';
import PermitOld from './PermitOld';
import RegisterAccount from './RegisterAccount';
import TeamMembers from '@/components/TeamMembers';
import ReportAnIssue from '@/components/ReportAnIssue';
import CreateAccount from '@/components/CreateAccount';
import AddPermit from '@/components/AddPermit';



export default function Home() {


  return (
   
      <div className=' min-h-screen '>
   

      <div className="flex-grow max-w-7xl mx-auto">
      

        <div className='grid grid-cols-2 gap-8'>
          <TeamMembers />
          <ReportAnIssue />
          <CreateAccount />
          <AddPermit />
     

       
</div>
       

        </div>
      </div>
  
  );
}
