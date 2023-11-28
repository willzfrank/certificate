import { ExternalCourse } from 'app/types'
import React from 'react'

const FooterCourseDetails = (props: ExternalCourse) => {
  return (
    <footer className="px-10 py-20 lg:p-20">
      <div className="w-full md:w-[441px] h-[92px] justify-start items-start gap-5 inline-flex">
        <img
          className="w-[88px] h-[88px] rounded-full"
          src={props?.instructors[0]?.profileImageUrl}
          alt={props?.instructors[0]?.name}
        />
        <div className="flex-col justify-start items-start gap-4 inline-flex">
          <div className="flex-col justify-start items-start gap-2 flex">
            <div className="text-black text-2xl font-medium font-['Inter']">
              {props?.instructors[0]?.name}
            </div>
            <div className="justify-start items-center gap-1.5 inline-flex">
              <div className="text-neutral-600 text-base font-medium font-['Inter']">
                Instructor
              </div>
              <div className="w-[3px] h-[3px] bg-zinc-500 rounded-full" />
              <div className="px-4 py-px bg-gradient-to-r from-green-200 to-green-300 rounded-2xl border border-green-400 justify-center items-center gap-px flex">
                <div className="text-green-900 text-xs font-medium font-['Inter']">
                  Pro
                </div>
              </div>
            </div>
          </div>
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="justify-start items-center gap-2 flex">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99996 14.3916L15.15 17.5L13.7833 11.6416L18.3333 7.69996L12.3416 7.18329L9.99996 1.66663L7.65829 7.18329L1.66663 7.69996L6.20829 11.6416L4.84996 17.5L9.99996 14.3916Z"
                  fill="#FFD500"
                />
              </svg>
              <div className="text-neutral-700 text-sm font-medium font-['Inter']">
                {(props.ratings / Math.max(props.ratingsCount, 1)).toPrecision(
                  2
                )}{' '}
                <span className="hidden md:inline-flex">ratings</span>
              </div>
            </div>
            <div className="justify-start items-center gap-2 flex">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6667 14.1667H5.83333V12.5H11.6667M14.1667 10.8333H5.83333V9.16667H14.1667M14.1667 7.5H5.83333V5.83333H14.1667M15.8333 2.5H4.16667C3.24167 2.5 2.5 3.24167 2.5 4.16667V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V4.16667C17.5 3.24167 16.75 2.5 15.8333 2.5Z"
                  fill="#595FD9"
                />
              </svg>
              <div className="text-neutral-700 text-sm font-medium font-['Inter']">
                10 <span className="hidden md:inline-flex"> courses </span>
              </div>
            </div>
            <div className="justify-start items-center gap-2 flex">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4.58337C10.7735 4.58337 11.5154 4.89066 12.0624 5.43765C12.6094 5.98463 12.9167 6.72649 12.9167 7.50004C12.9167 8.27359 12.6094 9.01545 12.0624 9.56244C11.5154 10.1094 10.7735 10.4167 10 10.4167C9.22645 10.4167 8.48459 10.1094 7.93761 9.56244C7.39062 9.01545 7.08333 8.27359 7.08333 7.50004C7.08333 6.72649 7.39062 5.98463 7.93761 5.43765C8.48459 4.89066 9.22645 4.58337 10 4.58337ZM4.16667 6.66671C4.63333 6.66671 5.06667 6.79171 5.44167 7.01671C5.31667 8.20837 5.66667 9.39171 6.38333 10.3167C5.96667 11.1167 5.13333 11.6667 4.16667 11.6667C3.50363 11.6667 2.86774 11.4033 2.3989 10.9345C1.93006 10.4656 1.66667 9.82975 1.66667 9.16671C1.66667 8.50367 1.93006 7.86778 2.3989 7.39894C2.86774 6.9301 3.50363 6.66671 4.16667 6.66671ZM15.8333 6.66671C16.4964 6.66671 17.1323 6.9301 17.6011 7.39894C18.0699 7.86778 18.3333 8.50367 18.3333 9.16671C18.3333 9.82975 18.0699 10.4656 17.6011 10.9345C17.1323 11.4033 16.4964 11.6667 15.8333 11.6667C14.8667 11.6667 14.0333 11.1167 13.6167 10.3167C14.3333 9.39171 14.6833 8.20837 14.5583 7.01671C14.9333 6.79171 15.3667 6.66671 15.8333 6.66671ZM4.58333 15.2084C4.58333 13.4834 7.00833 12.0834 10 12.0834C12.9917 12.0834 15.4167 13.4834 15.4167 15.2084V16.6667H4.58333V15.2084ZM0 16.6667V15.4167C0 14.2584 1.575 13.2834 3.70833 13C3.21667 13.5667 2.91667 14.35 2.91667 15.2084V16.6667H0ZM20 16.6667H17.0833V15.2084C17.0833 14.35 16.7833 13.5667 16.2917 13C18.425 13.2834 20 14.2584 20 15.4167V16.6667Z"
                  fill="#B009FF"
                />
              </svg>
              <div className="text-neutral-700 text-sm font-medium font-['Inter'] ">
                150 <span className="hidden md:inline-flex">students </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="w-full lg:w-[746px] mt-10 h-max md:h-[125px] text-neutral-600 text-sm font-medium font-['Inter'] leading-tight">
        {props?.instructors[0]?.bio}
      </p>
      <div className="w-[241px] h-5 justify-start items-start md:my-0 my-5 gap-2 inline-flex">
        <p className="text-red-500 text-sm font-medium font-['Inter'] underline leading-tight">
          Learn more about the instructor
        </p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33337 9.16669V10.8334H13.3334L8.75004 15.4167L9.93337 16.6L16.5334 10L9.93337 3.40002L8.75004 4.58336L13.3334 9.16669H3.33337Z"
            fill="#F36143"
          />
        </svg>
      </div>
    </footer>
  )
}

export default FooterCourseDetails
