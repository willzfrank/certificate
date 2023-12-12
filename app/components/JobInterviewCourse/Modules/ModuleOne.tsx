import React from 'react'

const ModuleOne = () => {
  return (
    <div className="flex items-start justify-start flex-col mb-[150px] md:mb-0">
      <div className="w-[305px] h-[57px] pb-3 border-b border-neutral-100 justify-between items-center inline-flex">
        <div className="justify-start items-center gap-[9px] flex">
          {/* <div className="w-[45px] h-[45px] relative">
            <div className="w-[45px] h-[45px] left-0 top-0 absolute bg-rose-50 rounded-full" />
            <div className="left-[11px] top-[13px] absolute text-red-900 text-base font-medium font-['Inter']">
              M1
            </div>
          </div> */}
          <div className="text-neutral-700 text-left text-base font-medium font-['Inter']">
            The Art of Communication
          </div>
        </div>
        <div className="justify-start items-center gap-1 flex">
          <div className="w-3.5 h-3.5 relative" />
          <div className="text-neutral-700 w-max text-sm font-medium font-['Inter']">
            7 topics
          </div>
        </div>
      </div>
      <div className="w-[286px] h-[335px] flex-col justify-start items-start gap-2 inline-flex">
        <div className="flex-col justify-start items-start gap-2 flex">
          <div className="text-neutral-700 text-sm font-medium font-['Inter']">
            Description:
          </div>
          <div className="w-[300px] h-max text-justify text-neutral-400 text-sm font-medium font-['Inter'] leading-tight">
            Unlock the powerful secrets of verbal and non-verbal communication
            that is guaranteed to make you stand out.
          </div>
        </div>

        <div className="h-max w-full p-3 rounded-lg border border-red-200 flex-col justify-start items-start gap-6 flex ">
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Introduction
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Connecting with your interviewer
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Storytelling
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Rules of Networking
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Limiting Beliefs & Winning Beliefs
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Effective Communication
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-[9px] inline-flex">
            <div className="text-neutral-700 text-sm font-medium font-['Inter']">
              Verbal and Non-Verbal Communication{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleOne
