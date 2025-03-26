import UpgradePlan from '@/components/Upgrade-Plan';
import React from 'react'
import CurrentPlan from '@/components/Current-Plan';
import CustomTheme from '@/components/Custom-Theme';
import { Heading } from '@/components/Heading';
import { MaxWidthWrapper } from '@/components/max-widht-wrapeer';
const Page = () => {
  return (
    <div>
      {/* 1. show upgrade plan option and integrate with razorpay and upon success upgrade in db
      2. show current plan
      3. show option to change theme */}
   <MaxWidthWrapper>
        <Heading className='mt-5 mb-4'>Settings</Heading>
        <h2 className='text-sm'>Manage your account general settings, preferences and integrations</h2>
      
      <UpgradePlan></UpgradePlan>
      <CurrentPlan></CurrentPlan>
      <CustomTheme></CustomTheme>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page;