import React from 'react'

const ModuleFive = () => {
  return (
    <div className="flex items-start justify-start flex-col pt-10">
      <div className="w-[305px] h-[57px]  pb-3 border-b border-neutral-100 justify-between items-center inline-flex">
        <div className="justify-start items-center gap-[9px] flex">
          <div className="text-neutral-700 text-base font-medium font-['Inter']">
            Bonus
          </div>
        </div>
        <div className="justify-start items-center gap-1 flex">
          <div className="w-3.5 h-3.5 relative" />
          <div className="text-neutral-700 text-sm w-max font-medium font-['Inter']">
            5 topics
          </div>
        </div>
      </div>
      <div className="w-[286px] h-[335px] flex-col justify-start items-start gap-2 inline-flex">
        <div className="flex-col justify-start items-start gap-2 flex">
          <div className="text-neutral-700 text-sm  font-medium font-['Inter']">
            Description:
          </div>
          <div className="w-[300px] h-max md:h-[69px] pb-5 md:pb-0 text-neutral-400 text-justify text-sm font-medium font-['Inter'] leading-tight">
            Preparations before Interview day
          </div>
        </div>

        <div className="h-max w-full p-3 rounded-lg border border-red-200 flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Imagine talking to a friend
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Use simple language
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Internet backup
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Conducive environment
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Journal & pen
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleFive
