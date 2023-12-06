import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CoursePreviewGrid } from '../../app/components/cards'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import courseApi from 'app/api/courseApi'
import { usePaginatedQuery } from 'app/hooks'
import { useRouter } from 'next/router'
import {
  DropDown,
  FilterSideBar,
  Loader,
  MainLayout,
  SearchBar,
} from '../../app/components'
import Head from 'next/head'

const sortOptions = ['Newest', 'Oldest', 'Price ascending', 'Price descending']

const priceMap: Record<string, string> = {
  'Price ascending': 'MostExpensive',
  'Price descending': 'LeastExpensive',
}

const Browse: NextPageWithLayout<{}> = () => {
  const router = useRouter()

  let [isOpen, setIsOpen] = useState(false)
  let [isOpenSidebar, setIsOpenSidebar] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const toggleSideBar = () => {
    setIsOpenSidebar((prev) => !prev)
  }

  const onSelect = (param: string) => {
    if (param === 'Newest' || param === 'Oldest') {
      router.push({
        pathname: '/courses/filterCourses',
        query: {
          SortByDateCreated: param,
        },
      })
    } else {
      router.push({
        pathname: '/courses/filterCourses',
        query: {
          PriceSort: priceMap[param],
        },
      })
    }
  }

  const {
    results: courses,
    next,
    loading,
    isLast,
  } = usePaginatedQuery(courseApi.endpoints.getCourses)

  return (
    <>
      <Head>
        <title>Browse Courses</title>
      </Head>
      <div className="h-48 bg-app-dark-500 relative hidden md:block">
        <div className="font-semibold text-3xl text-white mx-auto absolute top-[50%] left-[50%] m-0 translate-x-[-50%] translate-y-[-50%]">
          Browse Courses.
        </div>
      </div>
      <div className="flex px-6 md:p-14 md:py-20 md:gap-8 w-full items-start">
        <div
          className={`min-w-[27%] max-w-[24%] w-[24%] md:p-5 space-y-4 mt-0 m-0 border border-app-stroke rounded min-h-[500px] ${
            isOpenSidebar ? 'md:block hidden' : 'md:hidden hidden'
          } sticky top-2 transition-transform duration-300 ease-in-out`}
        >
          <div className="relative">
            <div
              className="absolute top-0 right-0 animate-slide cursor-pointer"
              onClick={toggleSideBar}
            >
              {!isOpenSidebar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
                </svg>
              )}
            </div>
            <div className="flex space-x-2">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  fill="none"
                  viewBox="0 0 16 17"
                >
                  <path
                    stroke="#545454"
                    strokeWidth="1.5"
                    d="M2 5.5h12M4 8.5h8M6 11.5h4"
                  ></path>
                </svg>
              </div>
              <div className="mb-5">Filter</div>
            </div>
            <FilterSideBar />
          </div>
        </div>
        {!isOpenSidebar && (
          <div
            className="animate-slide cursor-pointer hidden md:block"
            onClick={toggleSideBar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        )}
        <div className="flex flex-col w-full">
          <SearchBar>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={openModal}
                className="md:hidden text-black w-[full] mt-1 md:mt-0 justify-around font-medium rounded-lg text-sm p-4 text-center inline-flex items-center border border-black "
              >
                <div className="flex items-center justify-between truncate">
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      fill="none"
                      viewBox="0 0 16 17"
                    >
                      <path
                        stroke="#545454"
                        strokeWidth="1.5"
                        d="M2 5.5h12M4 8.5h8M6 11.5h4"
                      ></path>
                    </svg>
                  </div>
                  <div className="truncate">Filter</div>
                  <div className="pointer-events-none flex items-center justify-center">
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
              <DropDown onSelect={onSelect} options={sortOptions} />
            </div>
          </SearchBar>
          <div className="h-full grid place-items-center">
            {loading ? (
              <Loader className="h-24 w-24 mx-auto" mainColor="red" />
            ) : (
              <div className="w-full">
                {courses.length === 0 ? (
                  <div className="h-60 grid place-items-center">
                    <h1 className="text-2xl">No courses Found</h1>
                  </div>
                ) : (
                  <React.Fragment>
                    <CoursePreviewGrid
                      courses={courses}
                      isOpenSidebar={isOpenSidebar}
                    />
                    {!isLast ? (
                      <div className="text-center mt-5">
                        <button
                          className="text-app-pink font-medium text-base"
                          onClick={next}
                        >
                          Load more courses
                        </button>
                      </div>
                    ) : null}
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <FilterSideBar />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Browse

Browse.getLayout = function (page) {
  return (
    <MainLayout allowedUserTypes={[USERTYPES.STUDENT, USERTYPES.INSTRUCTOR]}>
      {page}
    </MainLayout>
  )
}
