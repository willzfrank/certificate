import React from 'react'

const ModuleTwo = () => {
  return (
    <div className="flex items-start justify-start flex-col">
      <div className="w-[305px] h-[57px] pb-3 border-b border-neutral-100 justify-between items-center inline-flex">
        <div className="justify-start items-center gap-[9px] flex">
          {/* <div className="w-[45px] h-[45px] relative">
            <div className="w-[45px] h-[45px] left-0 top-0 absolute bg-rose-50 rounded-full" />
            <div className="left-[11px] top-[13px] absolute text-red-900 text-base font-medium font-['Inter']">
              M2
            </div>
          </div> */}
          <div className="text-neutral-700 text-base font-medium font-['Inter']">
            The ABCs of Communication
          </div>
        </div>
        <div className="justify-start items-center gap-1 flex">
          <div className="w-3.5 h-3.5 relative" />
          <div className="text-neutral-700 text-sm w-max font-medium font-['Inter']">
            4 topics
          </div>
        </div>
      </div>
      <div className="w-[286px] h-[335px] flex-col justify-start items-start gap-2 inline-flex">
        <div className="flex-col justify-start items-start gap-2 flex">
          <div className="text-neutral-700 text-sm font-medium font-['Inter']">
            Description:
          </div>
          <div className="w-[300px] text-justify h-max text-neutral-400 text-sm font-medium font-['Inter'] leading-tight">
            Our exclusive formula—6A&apos;s, 4B&apos;s, and 2C&apos;s—unveils
            strategies you won&apos;t find on Google.
          </div>
        </div>

        <div className="h-max w-full p-3 rounded-lg border border-red-200 flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="w-[26px] h-[26px] relative">
              <div className="w-[26px] h-[26px] left-0 top-0 absolute bg-neutral-100 rounded-full" />
              <div className="w-5 h-2.5 left-[5px] top-[5px] absolute text-neutral-700 text-sm font-medium font-['Inter']">
                T1
              </div>
            </div>
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Introduction to 6 A&apos;s, 4 B&apos;s, and 2 C&apos;s{' '}
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="w-[26px] h-[26px] relative">
              <div className="w-[26px] h-[26px] left-0 top-0 absolute bg-neutral-100 rounded-full" />
              <div className="w-5 h-2.5 left-[5px] top-[5px] absolute text-neutral-700 text-sm font-medium font-['Inter']">
                T2
              </div>
            </div>
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              6 A&apos;s of Communication
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="w-[26px] h-[26px] relative">
              <div className="w-[26px] h-[26px] left-0 top-0 absolute bg-neutral-100 rounded-full" />
              <div className="w-5 h-2.5 left-[5px] top-[5px] absolute text-neutral-700 text-sm font-medium font-['Inter']">
                T3
              </div>
            </div>
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              4 B&apos;s of Communication
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="w-[26px] h-[26px] relative">
              <div className="w-[26px] h-[26px] left-0 top-0 absolute bg-neutral-100 rounded-full" />
              <div className="w-5 h-2.5 left-[5px] top-[5px] absolute text-neutral-700 text-sm font-medium font-['Inter']">
                T4
              </div>
            </div>
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              2 C&apos;s of Communication{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleTwo
