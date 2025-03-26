"use client"

import React from 'react'
import { MaxWidthWrapper } from './max-widht-wrapeer'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { usePlan } from '@/context/Plan-Context'
  


const CurrentPlan = () => {
  const { plan,loading } = usePlan()
  
  return (
    <div className='mt-2 mb-5'>
      <h1 className='font-semibold text-xl mb-1'>Current Plan</h1>
        <Card>
          <CardHeader><CardTitle>Your current plan</CardTitle></CardHeader>
          <CardContent className=''>
            <div>{loading?<div className='w-1/4 border rounded-md h-10 animate-pulse bg-gray-200/40 transition-all' />:
            <p>{plan}</p>}
            </div>
          
          </CardContent>
        </Card>
      
    </div>
  );
  
}

export default CurrentPlan