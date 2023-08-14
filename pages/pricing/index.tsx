import React, { useState, useEffect } from 'react'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import Link from 'next/link'
import { MainLayout } from 'app/components'
import { PriceCards } from 'app/components/cards'

const cards = [
  {
    packageTitle: 'Standard',
    price: 15000,
    features: [
      'Course curriculum & content',
      'Certificate of completion',
      'Extra Videos and learning materials',
      'Lifetime access',
    ],
  },
  {
    packageTitle: 'Premium',
    price: 30000,
    features: [
      'Course curriculum & content',
      'Certificate of completion',
      'Extra Videos and learning materials',
      'Lifetime access',
      'One on one with instructor',
    ],
  },
  {
    packageTitle: 'Lite',
    price: 10000,
    features: [
      'Course curriculum & content',
      'Certificate of completion',
      'Lifetime access',
    ],
  },
]

const Pricing: NextPageWithLayout<{}> = () => {
  return (
    <>
      <div className="md:h-48 h-12 md:bg-app-dark-500 relative bg-white">
        <div className="md:font-semibold text-center font-medium text-3xl md:text-white text-black md:mx-auto md:absolute md:top-[50%] md:left-[50%] md:m-0 md:translate-x-[-50%] md:translate-y-[-50%]">
          Pricing and Packages
        </div>
      </div>

      <div className="md:flex flex-row md:justify-center mt-16 md:mt-[100px] max-w-[88vw] mx-auto w-full mb-24 md:mb-0 ">
        {cards.map((c, i) => (
          <PriceCards {...c} key={i} />
        ))}
      </div>

      <div className="mt-[70px] font-medium text-base mb-[163px] md:ml-[70px] md:block hidden">
        Note: Some explanation of how the pricing works
      </div>
    </>
  )
}

export default Pricing

Pricing.getLayout = function (page) {
  return (
    <MainLayout allowedUserTypes={[USERTYPES.INSTRUCTOR, USERTYPES.STUDENT]}>
      {page}
    </MainLayout>
  )
}
