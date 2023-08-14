import Link from 'next/link'
import React from 'react'

interface HeadingProps {
  currentNumber: number
  totalNumber: number
}

const InstructorHeading = (props: HeadingProps) => {
  return (
    <div>
      <div className="flex justify-between p-6 border">
        <div>
          Step {props.currentNumber} of {props.totalNumber}
        </div>
        <div>Instructor Application process</div>
        <div className="text-[#B61046]">
          <Link href={'./overview'}>
            <a>Cancel</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export { InstructorHeading }
