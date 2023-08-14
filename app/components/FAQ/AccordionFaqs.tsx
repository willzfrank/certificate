import React from 'react'
import Link from 'next/link'
import { Disclosure, Transition } from '@headlessui/react'

type IconProps = {
  open: boolean
}

const ExpandIcon = (props: IconProps) => {
  return (
    <div>
      {props.open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="10"
          fill="none"
          viewBox="0 0 16 10"
        >
          <path
            stroke="#2F2D37"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1 8.5l7-7 7 7"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="10"
          fill="none"
          viewBox="0 0 16 10"
        >
          <path
            stroke="#2F2D37"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 1.5l-7 7-7-7"
          ></path>
        </svg>
      )}
    </div>
  )
}

const AccordionFaqs = ({
  qAndA,
}: {
  qAndA: Array<{ question: string; answer: React.ReactNode }>
}) => {
  return (
    <div className="w-full md:px-4 px-1 pt-16">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-transparent p-2 divide-y divide-[80%]">
        {qAndA.map((_q) => (
          <div className="py-4 m-2" key={_q.question}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-transparent py-2 text-left text-[16px] font-medium text-black">
                    <div className="flex items-center">
                      <span className="pl-0">{_q.question}</span>
                    </div>

                    <ExpandIcon open={open} />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 pl-0 text-base font-normal text-black">
                      {_q.answer}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  )
}

export { AccordionFaqs }
