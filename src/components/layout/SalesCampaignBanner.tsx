"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const SalesCampaignBanner = () => {
    const router = useRouter();


  return (
    <div className='w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 relative overflow-hidden'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm-gap-6 text-white'>
            <div className='flex items-center gap-2'>
                <span className='text-xl sm:text-2xl font-bold'>
                    ⚡️
                </span>
                <div className='text-sm sm:text-base font-bold'>
                    FLASH SALE :
                </div>
                <div className='bg-white/20 rounded px-2 py-1 text-sm sm:text-base font-bold animate-pulse'>
                    50% OFF on all products
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <span className='text-xl font-bold'>!</span>
            </div>

            <button 
            className='bg-white text-red-500 px-4 py-1 rounded-full font-bold text-sm hover:bg-purple-100 trasition-colors shadow-lg'
            onClick={() => {
                router.push('/')
            }}
            >
                SHOP NOW!
            </button>

        </div>
      </div>
    </div>
  )
}

export default SalesCampaignBanner
