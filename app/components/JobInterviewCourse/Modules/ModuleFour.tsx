import React from 'react'

const ModuleFour = () => {
  return (
    <div className="flex items-start justify-start flex-col pt-10 mb-[60px] md:mb-0">
      <div className="w-[305px] h-[57px] pb-3 border-b border-neutral-100 justify-between items-center inline-flex">
        <div className="justify-start items-center gap-[9px] flex">
          <div className="text-neutral-700 text-base font-medium font-['Inter']">
            Sell Yourself Like a Pro - 2
          </div>
        </div>
        <div className="justify-start items-center gap-1 flex">
          <div className="w-3.5 h-3.5 relative" />
          <div className="text-neutral-700 text-sm w-max font-medium font-['Inter']">
            6 topics
          </div>
        </div>
      </div>
      <div className="w-[286px] h-[335px] flex-col justify-start items-start gap-2 inline-flex">
        <div className="flex-col justify-start items-start gap-2 flex">
          <div className="text-neutral-700 text-sm  font-medium font-['Inter']">
            Description:
          </div>
          <div className="w-[300px] h-max text-neutral-400 text-justify text-sm font-medium font-['Inter'] leading-tight">
            We guide you through a simulated job interview, step by step,
            showing you how to address some common interview questions using
            our special formula
          </div>
        </div>

        <div className="h-max w-full p-3 rounded-lg border border-red-200 flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Introduction
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              8 elements of Odabor’s formula
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Persuasion principle
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Ethos, Pathos & Logos
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              3 moods of interviewers
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Odabor’s 8-step system{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleFour
