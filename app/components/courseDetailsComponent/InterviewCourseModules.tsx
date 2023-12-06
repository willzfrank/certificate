import React from 'react'
import CourseDetailsCard from './CourseDetailsCard'
import CourseDetailsModulesTiles from './CourseDetailsModulesTiles'
import InterviewModule from './InterviewModule'
import ModuleOne from '../JobInterviewCourse/Modules/ModuleOne'
import ModuleTwo from '../JobInterviewCourse/Modules/ModuleTwo'
import ModuleThree from '../JobInterviewCourse/Modules/ModuleThree'
import ModuleFour from '../JobInterviewCourse/Modules/ModuleFour'
import ModuleFive from '../JobInterviewCourse/Modules/ModuleFive'

type Props = {}

const InterviewCourseModules = (props: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          {/* Modules title */}
          <div className="w-[143px] h-8 justify-start items-center gap-3 inline-flex">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.3334 1.33325L23.6534 4.99992L20 6.66659L23.6534 8.34659L25.3334 11.9999L27 8.34659L30.6667 6.66659L27 4.99992M12 5.33325L8.66671 12.6666L1.33337 15.9999L8.66671 19.3333L12 26.6666L15.3334 19.3333L22.6667 15.9999L15.3334 12.6666M25.3334 19.9999L23.6534 23.6533L20 25.3333L23.6534 26.9999L25.3334 30.6666L27 26.9999L30.6667 25.3333L27 23.6533"
                fill="#DC1448"
              />
            </svg>
            <h6 className="text-neutral-700 text-base md:text-2xl font-medium font-['Inter']">
              Modules
            </h6>
          </div>

          {/* modules and titles */}
          <div className="hidden md:block ">
            <CourseDetailsModulesTiles mobile={false} />
          </div>
        </div>
        <div>
          <span className="text-neutral-400 text-base font-medium font-['Inter'] leading-tight">
            Duration:
          </span>
          <span className="text-neutral-700 text-base font-medium font-['Inter'] leading-tight">
            {' '}
            Self-paced
          </span>
        </div>
      </div>
      <div className="md:hidden my-5 block">
        <CourseDetailsModulesTiles mobile={true} />
      </div>
      <div className="flex flex-col my-5 ">
        <div className="w-full h-[0px] md:border border-neutral-200" />
        <div className="w-full p-3 space-x-5 md:border-l-2 md:border-neutral-700 justify-start items-start md:items-center gap-px inline-flex flex-col md:flex-row">
          {/* <div className="text-neutral-700 md:mb-0 mb-2 text-base font-medium font-['Inter']">
            Objectives:
          </div> */}
          <div className="flex items-start md:items-center space-y-2 md:space-y-0  md:space-x-2 flex-col md:flex-row">
            <div className="flex md:items-center space-x-1">
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.1667 10.0001L17.1334 7.68345L17.4167 4.61678L14.4084 3.93345L12.8334 1.28345L10 2.50011L7.16671 1.28345L5.59171 3.93345L2.58337 4.60845L2.86671 7.67511L0.833374 10.0001L2.86671 12.3168L2.58337 15.3918L5.59171 16.0751L7.16671 18.7251L10 17.5001L12.8334 18.7168L14.4084 16.0668L17.4167 15.3834L17.1334 12.3168L19.1667 10.0001ZM8.33337 14.1668L5.00004 10.8334L6.17504 9.65845L8.33337 11.8084L13.825 6.31678L15 7.50011L8.33337 14.1668Z"
                  fill="#CFCFCF"
                />
              </svg>
              <div className="text-neutral-600 w-max text-base font-medium font-['Inter'] leading-tight">
                Certificate issued
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.1667 10.0001L17.1334 7.68345L17.4167 4.61678L14.4084 3.93345L12.8334 1.28345L10 2.50011L7.16671 1.28345L5.59171 3.93345L2.58337 4.60845L2.86671 7.67511L0.833374 10.0001L2.86671 12.3168L2.58337 15.3918L5.59171 16.0751L7.16671 18.7251L10 17.5001L12.8334 18.7168L14.4084 16.0668L17.4167 15.3834L17.1334 12.3168L19.1667 10.0001ZM8.33337 14.1668L5.00004 10.8334L6.17504 9.65845L8.33337 11.8084L13.825 6.31678L15 7.50011L8.33337 14.1668Z"
                  fill="#CFCFCF"
                />
              </svg>
              <div className="text-neutral-600 w-max text-base font-medium font-['Inter'] leading-tight">
                Community Access
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.1667 10.0001L17.1334 7.68345L17.4167 4.61678L14.4084 3.93345L12.8334 1.28345L10 2.50011L7.16671 1.28345L5.59171 3.93345L2.58337 4.60845L2.86671 7.67511L0.833374 10.0001L2.86671 12.3168L2.58337 15.3918L5.59171 16.0751L7.16671 18.7251L10 17.5001L12.8334 18.7168L14.4084 16.0668L17.4167 15.3834L17.1334 12.3168L19.1667 10.0001ZM8.33337 14.1668L5.00004 10.8334L6.17504 9.65845L8.33337 11.8084L13.825 6.31678L15 7.50011L8.33337 14.1668Z"
                  fill="#CFCFCF"
                />
              </svg>
              <div className="text-neutral-600 w-max text-base font-medium font-['Inter'] leading-tight">
                Exclusive Events Invitations{' '}
              </div>
            </div>{' '}
          </div>
        </div>
        <div className="w-full h-[0px] md:border border-neutral-200" />
      </div>

      {/* CARD MODULES */}
      <div className="items-center justify-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 space-y-10 mb-10  md:mb-[100px] ">
        <ModuleOne />
        <ModuleTwo />
        <ModuleThree />
        <ModuleFour />
        <ModuleFive />
      </div>
    </div>
  )
}

export default InterviewCourseModules
