import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { USERTYPES } from 'app/types';

import { useCycle, AnimatePresence, motion } from 'framer-motion';
import { Fixed } from 'app/components/layouts';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import DropDownMenu from './DropDownMenu';

enum TabValues {
  inProgress = 'inProgress',
  wishlist = 'wishlist',
  completed = 'completed',
}

const Header = () => {
  const user = useAppSelector((store) => store.user);

  const dropdownOpenerRef = React.useRef<HTMLButtonElement>(null);

  const [menuOpen, toggleMenuOpen] = useCycle(false, true);
  const { pathname } = useRouter();

  // automatically close the menu when the user changes route
  useEffect(() => {
    if (pathname) {
      toggleMenuOpen(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const parent = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const children = (index: number) => ({
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { delay: index * 0.15 } },
    exit: { opacity: 0, y: -30 },
  });

  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <header className="relative p-4 md:px-14 flex items-center justify-between text-app-dark-500 md:border-b">
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

        {/* THE NAV */}
        <div className="lg:flex space-x-12 hidden">
          <Link href="/courses/browseCourses">
            <a className="flex items-center space-x-2">
              <span>Courses</span>
            </a>
          </Link>

          {/* <Link href="/dashboard">
            <a className="flex items-center space-x-2">
              <span>Dashboard</span>
              {/* <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.33333 13.1667C10.2789 13.1667 12.6667 10.7789 12.6667 7.83333C12.6667 4.88781 10.2789 2.5 7.33333 2.5C4.38781 2.5 2 4.88781 2 7.83333C2 10.7789 4.38781 13.1667 7.33333 13.1667Z"
                  stroke="#130F26"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.0001 14.5001L11.1001 11.6001"
                  stroke="#130F26"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> }
            </a>
          </Link> */}

          <Link href="/about">
            <a>About Us</a>
          </Link>
          {!user.token && (
            <Link href={`/instructors/overview`}>
              <a>Instructor Login</a>
            </Link>
          )}
          <Link href="/faqs">
            <a>FAQs</a>
          </Link>
          <Link href="/pathways/become-a-banker/overview">
            <div className="flex gap-1 items-center cursor-pointer">
              <a>Speak the Language of Banking</a>
              <div className="p-1 px-2 bg-app-pink text-[10px] text-white rounded-md">
                NEW
              </div>
            </div>
          </Link>
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex space-x-6 items-center">
          {user.id ? (
            <div className="flex items-center gap-4">
              <Link href="/profile/notifications">
                <button className="rounded-full flex items-center justify-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26 20C26 18.4087 25.3679 16.8826 24.2426 15.7574C23.1174 14.6321 21.5913 14 20 14C18.4087 14 16.8826 14.6321 15.7574 15.7574C14.6321 16.8826 14 18.4087 14 20C14 27 11 29 11 29H29C29 29 26 27 26 20Z"
                      stroke="#545454"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.7295 33C21.5537 33.3031 21.3014 33.5547 20.9978 33.7295C20.6941 33.9044 20.3499 33.9965 19.9995 33.9965C19.6492 33.9965 19.3049 33.9044 19.0013 33.7295C18.6977 33.5547 18.4453 33.3031 18.2695 33"
                      stroke="#545454"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="22"
                      y="9"
                      width="10"
                      height="10"
                      rx="5"
                      fill="#B61046"
                    />
                  </svg>
                </button>
              </Link>
              <div className="">
                <button
                  ref={dropdownOpenerRef}
                  onClick={() => setShowOptions(!showOptions)}
                  type="button"
                  className="h-8 w-8 rounded-full bg-app-dark-500 flex items-center justify-center text-white font-medium relative overflow-clip"
                >
                  {user.profilePictureUrl ? (
                    <Image
                      src={user.profilePictureUrl}
                      alt={`${user.firstName}'s picture`}
                      layout="fill"
                    />
                  ) : (
                    (user.firstName as string).charAt(0).toUpperCase() +
                    (user.lastName as string).charAt(0).toUpperCase()
                  )}
                </button>

                <DropDownMenu
                  ref={dropdownOpenerRef}
                  isOpen={showOptions}
                  close={() => setShowOptions(false)}
                />

                {/* {showOptions && (
                  <div className="absolute min-w-[500px] px-6 py-4 top-full right-0 z-20 bg-white rounded divide-y divide-gray-100 shadow">
                    <div className="py-3 flex space-x-3 px-4 text-sm text-black">
                      <div className="h-8 w-8 rounded-full bg-app-dark-500 flex items-center justify-center text-white font-medium relative overflow-clip">
                        {user.profilePictureUrl ? (
                          <Image
                            src={user.profilePictureUrl}
                            alt={`${user.firstName}'s picture`}
                            layout="fill"
                          />
                        ) : (
                          (user.firstName as string).charAt(0).toUpperCase() +
                          (user.lastName as string).charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div>{`${user.firstName} ${user.lastName}`}</div>
                        <div className="font-medium truncate">{user.email}</div>
                      </div>
                    </div>

                    <div className="flex space-x-6">
                      <ul className="py-1 text-sm text-black">
                        <li>
                          <Link href="/profile">
                            <a className="block py-2 px-4 hover:text-app-pink">
                              Profile
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/dashboard">
                            <a className="block py-2 px-4 hover:text-app-pink">
                              My courses
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href={`/dashboard?page=${TabValues.wishlist}`}>
                            <a className="block py-2 px-4 hover:text-app-pink">
                              Wishlist
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/profile/notifications">
                            <a className="block py-2 px-4 hover:text-app-pink">
                              Notifications
                            </a>
                          </Link>
                        </li> 
                        <li>
                          <Link href="/profile/certificates">
                            <a className="block py-2 px-4 hover:text-app-pink">
                              Certificates
                            </a>
                          </Link>
                        </li>
                      </ul>
                      <ul className="py-1 text-sm text-black">
                        <li>
                          <Link href="/profile/accountsettings">
                            <a className="block py-2 px-4 hover:text-app-pink">
                              Account settings
                            </a>
                          </Link>
                        </li> */}
                {/* <li>
                          <Link href="/profile/paymentmethods">
                            <a className="block py-2 px-4 hover:text-app-pink">
                              Payment information
                            </a>
                          </Link>
                        </li> */}
                {/* <li>
                          <Link href="/faqs">
                            <a className="block py-2 px-4 hover:text-app-pink">
                              FAQs
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/">
                            <a className="block py-2 px-4 hover:text-app-pink">
                              Support
                            </a>
                          </Link>
                        </li>
                      </ul>
                      <div className="py-1">
                        <Link href="/auth/logout">
                          <a className="block py-2 px-4 text-sm text-black hover:text-app-pink">
                            Log out
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          ) : (
            <React.Fragment>
              <Link href="/auth/login">
                <a>Login</a>
              </Link>
              <div className="actiongradient p-[2px] rounded-3xl">
                <div
                  className={`p-2 px-10 ${
                    pathname === '/' ? 'bg-[aliceblue]' : 'bg-white'
                  } text-app-pink-2 rounded-3xl flex items-center justify-center`}
                >
                  <Link href="/auth/register">
                    <a>Sign up</a>
                  </Link>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>

        {/* breadcrumb */}
        <button
          role="button"
          aria-label="open and close menubar"
          onClick={() => toggleMenuOpen()}
          className="lg:hidden"
        >
          {user.id ? (
            <div className="h-8 w-8 rounded-full bg-app-dark-500 flex items-center justify-center text-white font-medium relative overflow-clip">
              {user.profilePictureUrl ? (
                <Image
                  src={user.profilePictureUrl}
                  alt={`${user.firstName}'s picture`}
                  layout="fill"
                />
              ) : (
                (user.firstName as string).charAt(0).toUpperCase() +
                (user.lastName as string).charAt(0).toUpperCase()
              )}
            </div>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 7H3"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 17H3"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <Fixed className="px-6 bg-white transition duration-300 shadow-lg rounded-b-xl pb-4 w-screen">
              <motion.div
                className="header py-6 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { ease: 'easeIn' } }}
                exit={{ opacity: 0 }}
              >
                <Link
                  href={
                    user.token
                      ? user.roleName?.toLowerCase() === USERTYPES.STUDENT
                        ? '/dashboard'
                        : '/instructors/overview'
                      : '/'
                  }
                >
                  <a>
                    <Image
                      loading="eager"
                      src="/images/unifyLogo.png"
                      alt="Certification by Unify Logo"
                      width={100}
                      height={40}
                    />
                  </a>
                </Link>

                <button
                  role="button"
                  aria-label="open and close menubar"
                  onClick={() => toggleMenuOpen()}
                  className="lg:hidden"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.7279 18.7279L6 6"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.7279 6.27208L6 19"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </motion.div>

              <motion.div
                variants={parent}
                initial={'hidden'}
                animate={'show'}
                exit={'exit'}
                className="-mt-6 divide-y text-md flex flex-col"
              >
                <Link href="/courses/browseCourses">
                  <motion.a
                    variants={children(1)}
                    initial={'hidden'}
                    animate={'show'}
                    exit={'exit'}
                    className="flex items-center space-x-2 py-6"
                  >
                    <span>Courses</span>
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.6668 1.1665L6.00016 5.83317L1.3335 1.1665"
                        stroke="#130F26"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.a>
                </Link>
                {/* <Link href="/dashboard">
                  <motion.a
                    variants={children(2)}
                    initial={"hidden"}
                    animate={"show"}
                    exit={"exit"}
                    className="flex items-center space-x-2 py-6"
                  >
                    <span>Dashboard</span>
                    {/* <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.33333 13.1667C10.2789 13.1667 12.6667 10.7789 12.6667 7.83333C12.6667 4.88781 10.2789 2.5 7.33333 2.5C4.38781 2.5 2 4.88781 2 7.83333C2 10.7789 4.38781 13.1667 7.33333 13.1667Z"
                        stroke="#130F26"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.0001 14.5001L11.1001 11.6001"
                        stroke="#130F26"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>}
                  </motion.a>
                </Link> */}
                {/* <Link href="/pricing">
                  <motion.a
                    variants={children(3)}
                    initial={'hidden'}
                    animate={'show'}
                    exit={'exit'}
                    className="py-6"
                  >
                    Pricing
                  </motion.a>
                </Link> */}
                {user.roleName?.toLowerCase() === USERTYPES.STUDENT ? (
                  <Link href={`/dashboard`}>
                    <motion.a
                      variants={children(3)}
                      initial={'hidden'}
                      animate={'show'}
                      exit={'exit'}
                      className="py-6"
                    >
                      My Courses
                    </motion.a>
                  </Link>
                ) : (
                  <Link href={`/instructors/overview`}>
                    <motion.a
                      variants={children(3)}
                      initial={'hidden'}
                      animate={'show'}
                      exit={'exit'}
                      className="py-6"
                    >
                      Instructor login
                    </motion.a>
                  </Link>
                )}
                <Link href={`/pathways/become-a-banker/overview`}>
                  <motion.a
                    variants={children(4)}
                    initial={'hidden'}
                    animate={'show'}
                    exit={'exit'}
                    className="py-6"
                  >
                    Language Of Banking{' '}
                  </motion.a>
                </Link>{' '}
                <Link href={`/about`}>
                  <motion.a
                    variants={children(5)}
                    initial={'hidden'}
                    animate={'show'}
                    exit={'exit'}
                    className="py-6"
                  >
                    About Us{' '}
                  </motion.a>
                </Link>
                <Link href="/faqs">
                  <motion.a
                    variants={children(6)}
                    initial={'hidden'}
                    animate={'show'}
                    exit={'exit'}
                    className="py-6"
                  >
                    FAQs
                  </motion.a>
                </Link>
              </motion.div>

              {user.id ? (
                <div className="actiongradient p-[2px] rounded-3xl w-fit">
                  <div className="p-2 px-10 bg-white text-lg text-app-pink rounded-3xl flex items-center justify-center">
                    <Link href="/auth/logout">
                      <a>Logout</a>
                    </Link>
                  </div>
                </div>
              ) : (
                <motion.div className="flex flex-col gap-4 items-stretch text-center">
                  <div className="actiongradient p-[2px] rounded-3xl">
                    <div className="p-2 px-10 bg-white text-lg text-app-pink rounded-3xl flex items-center justify-center">
                      <Link href="/auth/register">
                        <a>Sign Up</a>
                      </Link>
                    </div>
                  </div>

                  <Link href="/auth/login">
                    <a className="p-3 text-lg">Login</a>
                  </Link>
                </motion.div>
              )}
            </Fixed>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
