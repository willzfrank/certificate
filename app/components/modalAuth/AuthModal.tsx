import React, { useState } from 'react'
import logo from '/images/CBU_Logo-removebg-preview 1.png'
import Signup from './Signup'
import Login from './Login'
import Image from 'next/image'
import { ExternalCourse } from 'app/types'
interface AuthProps extends ExternalCourse {
  setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>
  setAccessModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthModal: React.FC<AuthProps> = (props) => {
  const [activeTab, setActiveTab] = useState(1)

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex)
  }

  const tabClass = (tabIndex: number) =>
    `text-base md:text-xl w-[215px] justify-center font-medium font-['Inter'] py-3 px-4 flex items-center gap-x-2 rounded-lg hover:hover:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none dark:hover:text-gray-300 ${
      activeTab === tabIndex
        ? 'text-neutral-700 bg-white shadow '
        : 'text-neutral-400 bg-neutral-100'
    }`

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center ">
      <div className="w-[350px] md:w-[590px] h-max px-10 md:px-16 py-5 bg-white rounded-2xl justify-start items-start gap-px flex-col flex">
        <div className="flex items-center justify-center flex-col w-full">
          <Image
            src="/images/CBU_Logo-removebg-preview 1.png"
            alt="Certification by Unify Logo"
            width={80}
            height={40}
          />
          <span className="text-neutral-700 text-base text-center md:text-2xl font-medium font-['Inter']">
            Sign up and start your journey
          </span>
        </div>

        {/* TAB PAGE */}
        <div>
          <div className="flex my-5">
            <div className="flex rounded-lg transition p-1 bg-neutral-100">
              <nav
                className="flex justify-between w-[250px] md:w-[462px] space-x-2"
                aria-label="Tabs"
                role="tablist"
              >
                <button
                  type="button"
                  className={tabClass(1)}
                  onClick={() => handleTabChange(1)}
                  id="segment-item-1"
                  data-hs-tab="#segment-1"
                  aria-controls="segment-1"
                  role="tab"
                >
                  Sign up
                </button>
                <button
                  type="button"
                  className={tabClass(2)}
                  onClick={() => handleTabChange(2)}
                  id="segment-item-2"
                  data-hs-tab="#segment-2"
                  aria-controls="segment-2"
                  role="tab"
                >
                  Log in
                </button>
              </nav>
            </div>
          </div>
          <div>
            <div
              id="segment-1"
              role="tabpanel"
              aria-labelledby="segment-item-1"
            >
              {activeTab === 1 && (
                <Signup
                  setShowAuthModal={props.setShowAuthModal}
                  setActiveTab={setActiveTab}
                />
              )}
            </div>
            <div
              id="segment-2"
              role="tabpanel"
              aria-labelledby="segment-item-2"
            >
              {activeTab === 2 && (
                <Login
                  setShowAuthModal={props.setShowAuthModal}
                  setAccessModal={props.setAccessModal}
                  courseId={props.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
