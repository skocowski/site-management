'use client'

import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useUserPermits } from '@/hooks/useUserPermits'
import React from 'react'
import { DataTable } from '../components/PermitTable'
import { columns } from '../components/columns'
import { db } from "@/app/firebase/config";
import { usePermits } from "@/hooks/usePermits";

const AllPermits = () => {
  /*     const {all} = useUserPermits() */
  
  const {permits} = usePermits()


  return (
      <DataTable columns={columns} data={permits} />
  )
}

export default AllPermits


