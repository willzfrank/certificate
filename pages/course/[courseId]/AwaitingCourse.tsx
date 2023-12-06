import CourseDetailsNavbar from 'app/components/courseDetailsComponent/CourseDetailsNavbar'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useAppSelector } from 'app/hooks'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { TOKEN_KEY, USER_TYPE_KEY } from 'app/constants'
import Link from 'next/link'
import { USERTYPES } from 'app/types'

const AwaitingCourse = () => {
  const [cookie] = useCookies([TOKEN_KEY, USER_TYPE_KEY])
  const user = useAppSelector((store) => store.user)
  const [mobileNavVisible, setMobileNavVisible] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const toggleMobileNav = () => {
    setMobileNavVisible(!mobileNavVisible)
  }

  function signUp() {
    if (!Boolean(user.id || cookie[TOKEN_KEY])) {
      console.log('User is not logged in')
      return
    }
  }

  function navigateToCoursePage() {
    window.location.href = '/courses/browseCourses'
  }

  useEffect(() => {
    setTimeout(navigateToCoursePage, 3000)
  }, [])

  // Render user section
  const renderUserSection = () => {
    return (
      <div className="flex-row lg:flex-row items-center gap-2  flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        {user.id ? (
          <>
            <div className="w-[43px] h-[43px] relative cursor-pointer">
              <div
                className="w-10 h-10 left-0 top-0 absolute rounded-full "
                onClick={() => setShowOptions(!showOptions)}
              >
                {user?.profilePictureUrl ? (
                  <Image
                    src={user?.profilePictureUrl}
                    alt={`${user?.firstName} image`}
                    width="100%"
                    height="100%"
                    className="rounded-full border border-orange-400"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-white font-medium relative overflow-clip bg-red-500">
                    {`${(user.firstName as string).charAt(0).toUpperCase()}${(
                      user.lastName as string
                    )
                      .charAt(0)
                      .toUpperCase()}`}
                  </div>
                )}
              </div>
              <div className="w-[18px] h-[18px] left-[25px] top-[25px] absolute">
                <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-white rounded-full shadow flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FA7941"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#FA7941"
                    className="w-3 h-3 flex items-center justify-center"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </div>
                <div className="w-3 h-3 left-[3px] top-[3px] absolute" />
              </div>
            </div>

            <div className="hidden justify-start items-start gap-1.5 md:inline-flex">
              <div className="text-neutral-700 text-sm font-medium font-['Inter']">
                {user.firstName} {user.lastName}
              </div>
            </div>
          </>
        ) : (
          <button
            className=" w-max lg:w-max h-[42px] lg:h-[33px] px-3 md:px-10 py-2 cursor-pointer rounded border justify-center lg:justify-center items-center gap-2 inline-flex hover:shadow bg-rose-600  hover:border-rose-600 border-rose-600 text-center "
            onClick={signUp}
          >
            <div className="flex flex-row gap-1">
              <span className="text-white w-max text-sm font-medium font-['Inter']">
                Enroll Now
              </span>
            </div>
          </button>
        )}
      </div>
    )
  }

  // Render mobile icon
  const renderMobileIcon = () => (
    <div className="block lg:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        onClick={toggleMobileNav}
      >
        {mobileNavVisible ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        )}
      </svg>
    </div>
  )

  return (
    <>
      {/* Desktop Navigation */}
      <div className="w-screen h-[83px] px-5 lg:px-[78px] py-5 border-b border-neutral-200 flex-col justify-start items-start gap-px inline-flex">
        <div className="w-full justify-between items-center inline-flex">
          <div className="justify-center items-center gap-[416px] flex">
            <Link
              href={
                user.token
                  ? user.roleName?.toLowerCase() === USERTYPES.STUDENT
                    ? '/dashboard'
                    : user.roleName?.toLowerCase() === USERTYPES.INSTRUCTOR
                    ? '/instructors/overview'
                    : '/'
                  : '/'
              }
            >
              <a>
                <Image
                  src="/images/unifyLogo.png"
                  alt="Certification by Unify Logo"
                  width={100}
                  height={40}
                />
              </a>
            </Link>
            <div className="lg:flex space-x-12 hidden h-[19px] ">
              <Link href="/courses/browseCourses">
                <a className="flex items-center space-x-2 text-neutral-700 text-base font-medium font-['Inter']">
                  <span>Courses</span>
                </a>
              </Link>
              <Link href="/about">
                <a className="flex items-center space-x-2 text-neutral-700 text-base font-medium font-['Inter']">
                  <span> About us</span>
                </a>
              </Link>
              <Link href="/faqs">
                <a className="flex items-center space-x-2 text-neutral-700 text-base font-medium font-['Inter']">
                  <span>FAQ</span>
                </a>
              </Link>
            </div>
          </div>
          {renderUserSection()}
          {renderMobileIcon()}
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileNavVisible && (
          <motion.div
            className="w-screen h-max bg-white z-50 flex flex-col items-start gap-4 p-4"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
          >
            <div className="flex items-end gap-2">
              <div className="w-4 h-4 relative" />
              <div className="text-neutral-700 text-sm font-medium font-['Inter']">
                Courses
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div className="w-4 h-4 relative" />
              <div className="text-neutral-700 text-sm font-medium font-['Inter']">
                FAQ
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div className="w-4 h-4 relative" />
              <div className="text-neutral-700 text-sm font-medium font-['Inter']">
                About us
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BODY */}

      <div className="flex items-center justify-center w-full  h-[85vh] flex-col gap-5">
        <svg
          width="97"
          height="78"
          viewBox="0 0 97 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_6554_20530)">
            <rect
              width="96.1395"
              height="78"
              rx="4.19137"
              fill="url(#paint0_linear_6554_20530)"
            />
            <g filter="url(#filter0_d_6554_20530)">
              <rect
                x="21.7681"
                y="23.5811"
                width="53.178"
                height="59.2031"
                rx="4.19137"
                fill="#FFCBDD"
              />
              <rect
                x="25.0426"
                y="31.0468"
                width="46.367"
                height="51.6062"
                rx="1.9647"
                stroke="#FEBCD2"
                strokeWidth="0.261961"
              />
              <circle cx="68.9206" cy="26.9871" r="0.785882" fill="#FF6F9F" />
              <circle cx="66.3015" cy="26.9871" r="0.785882" fill="#FF6F9F" />
              <circle cx="63.4202" cy="26.9871" r="0.785882" fill="#FF6F9F" />
              <rect
                x="25.4355"
                y="26.4626"
                width="6.81097"
                height="1.3098"
                rx="0.654901"
                fill="#FF6F9F"
              />
              <rect
                x="26.7451"
                y="34.3213"
                width="15.1937"
                height="1.83372"
                rx="0.916862"
                fill="#FF6F9F"
              />
              <rect
                x="26.7451"
                y="37.4648"
                width="15.1937"
                height="1.83372"
                rx="0.916862"
                fill="#FF6F9F"
              />
              <rect
                x="26.7451"
                y="40.6086"
                width="22.2666"
                height="1.83372"
                rx="0.916862"
                fill="#FF6F9F"
              />
              <rect
                x="26.7451"
                y="47.9438"
                width="41.3898"
                height="4.19137"
                rx="2.09568"
                fill="#A9033B"
              />
              <rect
                x="26.7451"
                y="54.7544"
                width="41.3898"
                height="4.19137"
                rx="2.09568"
                fill="#A9033B"
              />
              <rect
                x="26.7451"
                y="61.5649"
                width="41.3898"
                height="4.19137"
                rx="2.09568"
                fill="#A9033B"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_6554_20530"
              x="14.5123"
              y="23.5811"
              width="67.6899"
              height="73.7148"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="7.25581" />
              <feGaussianBlur stdDeviation="3.62791" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.305713 0 0 0 0 0.0144895 0 0 0 0 0.112931 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_6554_20530"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_6554_20530"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_6554_20530"
              x1="48.0698"
              y1="0"
              x2="89.1476"
              y2="96.1395"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D60149" />
              <stop offset="1" stopColor="#F97642" />
            </linearGradient>
            <clipPath id="clip0_6554_20530">
              <rect width="96.1395" height="78" rx="4.19137" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <div>
          <div className="text-center">
            <span className="text-neutral-700 text-xl font-medium font-['Inter'] leading-[31px]">
              This Course will be available shortly,
              <br />
              Explore other course on{' '}
            </span>
            <Link href="/courses/browseCourses">
              <span className="text-rose-600 text-xl font-medium font-['Inter'] underline leading-[31px] cursor-pointer">
                Certification by Unify
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default AwaitingCourse
