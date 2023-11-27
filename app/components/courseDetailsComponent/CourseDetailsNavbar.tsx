import Link from 'next/link';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalCourse, USERTYPES } from 'app/types';
import { useAppSelector } from 'app/hooks';
import { DropDownMenu } from '../elements';

const CourseDetailsNavbar = (props: ExternalCourse) => {
  const user = useAppSelector((store) => store.user);
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const dropdownOpenerRef = useRef<HTMLButtonElement>(null);

  const toggleMobileNav = () => {
    setMobileNavVisible(!mobileNavVisible);
  };

  // Render user section
  const renderUserSection = () => {
    return (
      <div className="flex-row-reverse lg:flex-row items-center gap-2  flex">
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
        {user.id && (
          <>
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
                      // onClick={() => setShowOptions(!showOptions)}
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full  flex items-center justify-center text-white font-medium relative overflow-clip bg-red-500">
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

              <div className="hidden  justify-start items-start gap-1.5 md:inline-flex">
                <div className="text-neutral-700 text-sm font-medium font-['Inter']">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            </>
          </>
        )}
      </div>
    );
  };

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
  );

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
    </>
  );
};

export default CourseDetailsNavbar;
