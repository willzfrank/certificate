import React, { useState } from 'react';
import CourseDetailsRequirements from './CourseDetailsRequirements';
import { Image, Modal, VideoPlayer } from '../elements';
import { ExternalCourse } from 'app/types';
// import { Image } from '../../components';

const AboutCourseDetails = (props: ExternalCourse) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const MAX_DESCRIPTION_LENGTH = 300;

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

  const displayDescription = showMore
    ? props?.description
    : `${props?.description?.slice(0, MAX_DESCRIPTION_LENGTH)}${
        props?.description?.length > MAX_DESCRIPTION_LENGTH ? '...' : ''
      }`;

  return (
    <div className="py-10">
      <div>
        <div className="w-[72px] h-[21px] px-2 pb-1 border-l-2 border-neutral-700 justify-center items-center gap-px inline-flex">
          <div className="text-neutral-700 text-sm font-medium font-['Inter']">
            Courses
          </div>
        </div>
        <div className="w-full h-[0px] border border-neutral-200" />
      </div>

      {/* ABOUT US BODY HERO */}
      <div className="flex-col-reverse lg:block flex">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <div className="lg:w-1/2 w-full hidden lg:block h-[200px] lg:h-[472px] my-5 relative rounded-lg overflow-clip">
            <Image
              src={props?.imageUrl}
              alt="course image"
              className="!absolute h-full w-full"
              objectFit="cover"
              objectPosition={'top center'}
            />
            <button
              onClick={() => setVideoModalOpen(true)}
              className="w-20 h-20 rounded-full bg-[#FEFCF280] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center"
            >
              <svg
                width="32"
                height="35"
                viewBox="0 0 32 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.5317 14.992C31.6827 16.234 31.6828 19.3388 29.5317 20.5807L5.33223 34.5522C3.18117 35.7942 0.492332 34.2418 0.492332 31.7579V3.8148C0.492332 1.33097 3.18116 -0.221436 5.33223 1.02048L29.5317 14.992Z"
                  fill="#130F26"
                  fillOpacity="0.5"
                />
              </svg>
            </button>
          </div>
          <div className="">
            <div>
              <div className="w-[330px] h-[381px] my-5 p-5 relative rounded-2xl border border-red-500 flex-col">
                <div className="flex items-center justify-between">
                  <svg
                    width="55"
                    height="45"
                    viewBox="0 0 55 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_6065_19016)">
                      <rect
                        width="55"
                        height="44.6226"
                        rx="2.39782"
                        fill="url(#paint0_linear_6065_19016)"
                      />
                      <g filter="url(#filter0_d_6065_19016)">
                        <rect
                          x="12.4529"
                          y="13.4905"
                          width="30.4223"
                          height="33.8692"
                          rx="2.39782"
                          fill="#FFCBDD"
                        />
                        <rect
                          x="14.3262"
                          y="17.7615"
                          width="26.5259"
                          height="29.5232"
                          rx="1.12398"
                          stroke="#FEBCD2"
                          strokeWidth="0.149864"
                        />
                        <circle
                          cx="39.4284"
                          cy="15.4388"
                          r="0.449591"
                          fill="#FF6F9F"
                        />
                        <circle
                          cx="37.9296"
                          cy="15.4388"
                          r="0.449591"
                          fill="#FF6F9F"
                        />
                        <circle
                          cx="36.2813"
                          cy="15.4388"
                          r="0.449591"
                          fill="#FF6F9F"
                        />
                        <rect
                          x="14.551"
                          y="15.1389"
                          width="3.89646"
                          height="0.749319"
                          rx="0.374659"
                          fill="#FF6F9F"
                        />
                        <rect
                          x="15.3003"
                          y="19.6348"
                          width="8.6921"
                          height="1.04905"
                          rx="0.524523"
                          fill="#FF6F9F"
                        />
                        <rect
                          x="15.3003"
                          y="21.4331"
                          width="8.6921"
                          height="1.04905"
                          rx="0.524523"
                          fill="#FF6F9F"
                        />
                        <rect
                          x="15.3003"
                          y="23.2317"
                          width="12.7384"
                          height="1.04905"
                          rx="0.524523"
                          fill="#FF6F9F"
                        />
                        <rect
                          x="15.3003"
                          y="27.428"
                          width="23.6785"
                          height="2.39782"
                          rx="1.19891"
                          fill="#A9033B"
                        />
                        <rect
                          x="15.3003"
                          y="31.3242"
                          width="23.6785"
                          height="2.39782"
                          rx="1.19891"
                          fill="#A9033B"
                        />
                        <rect
                          x="15.3003"
                          y="35.2205"
                          width="23.6785"
                          height="2.39782"
                          rx="1.19891"
                          fill="#A9033B"
                        />
                      </g>
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_6065_19016"
                        x="8.30194"
                        y="13.4905"
                        width="38.7243"
                        height="42.171"
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
                        <feOffset dy="4.15094" />
                        <feGaussianBlur stdDeviation="2.07547" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.305713 0 0 0 0 0.0144895 0 0 0 0 0.112931 0 0 0 1 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_6065_19016"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_6065_19016"
                          result="shape"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_6065_19016"
                        x1="27.5"
                        y1="0"
                        x2="51"
                        y2="55"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#D60149" />
                        <stop offset="1" stopColor="#F97642" />
                      </linearGradient>
                      <clipPath id="clip0_6065_19016">
                        <rect
                          width="55"
                          height="44.6226"
                          rx="2.39782"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  {/* rating */}
                  <div className="w-[50px] h-5 justify-start items-center gap-2 inline-flex">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 14.3917L15.15 17.5001L13.7834 11.6417L18.3334 7.70008L12.3417 7.18341L10 1.66675L7.65835 7.18341L1.66669 7.70008L6.20835 11.6417L4.85002 17.5001L10 14.3917Z"
                        fill="#FFD500"
                      />
                    </svg>
                    <div className="text-neutral-600 text-sm font-medium font-['Inter']">
                      4.5
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-[196px] flex-col justify-start items-start gap-3 inline-flex">
                    <h3 className="text-neutral-600 my-5 text-xl font-medium font-['Inter'] leading-7">
                      Enrol for this Course
                    </h3>
                    <div className="flex-col justify-start items-start gap-3 flex">
                      <div className="justify-start items-center gap-2 inline-flex">
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
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <div className="text-neutral-600 text-sm font-medium font-['Inter'] leading-tight">
                          Certificate issued
                        </div>
                      </div>
                      <div className="justify-start items-center gap-2 inline-flex">
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
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <div className="text-neutral-600 text-sm font-medium font-['Inter'] leading-tight">
                          Free Mentorship
                        </div>
                      </div>
                      <div className="justify-start items-center gap-2 inline-flex">
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
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <div className="text-neutral-600 text-sm font-medium font-['Inter'] leading-tight">
                          Lorem Ipsum dolor
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[130px] h-[17px] justify-start items-start gap-1.5 inline-flex my-5">
                    <div className="text-neutral-600 text-sm font-medium font-['Inter']">
                      50% Disc.
                    </div>
                    <div className="text-red-500 text-sm font-medium font-['Inter'] line-through">
                      N10,000
                    </div>
                  </div>
                </div>
                <div className="w-full h-[0px] border border-neutral-200"></div>
                {/* button */}
                <div className="w-[299px] h-[41px] p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded justify-center items-center gap-px inline-flex cursor-pointer">
                  <div className="text-white text-sm font-medium font-['Inter']">
                    Pay N5,000
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[348px] h-[130px] flex-col justify-start items-start gap-[17px] inline-flex">
              <div className="w-full py-1.5 border-b border-neutral-100 justify-between items-start inline-flex">
                <div className="text-neutral-400 text-sm font-medium font-['Inter'] leading-tight">
                  Total Reviews
                </div>
                <div className="text-neutral-700 text-sm font-medium font-['Inter'] leading-tight">
                  76+
                </div>
              </div>
              <div className="w-full py-1.5 border-b border-neutral-100 justify-between items-start inline-flex">
                <div className="text-neutral-400 text-sm font-medium font-['Inter'] leading-tight">
                  Succes Rate
                </div>
                <div className="text-neutral-700 text-sm font-medium font-['Inter'] leading-tight">
                  90%
                </div>
              </div>
              <div className="w-full py-1.5 border-b border-neutral-100 justify-between items-start inline-flex">
                <div className="text-neutral-400 text-sm font-medium font-['Inter'] leading-tight">
                  Registered Students
                </div>
                <div className="text-neutral-700 text-sm font-medium font-['Inter'] leading-tight">
                  50+
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT US BODY CONTENT */}
        <div className="flex-col flex lg:block">
          <div>
            <div className="lg:w-1/2 w-full lg:hidden block h-[200px] lg:h-[472px] my-5 relative rounded-lg overflow-clip">
              <Image
                src={props?.imageUrl}
                alt="course image"
                className="!absolute h-full w-full"
                objectFit="cover"
                objectPosition={'top center'}
              />
              <button
                onClick={() => setVideoModalOpen(true)}
                className="w-20 h-20 rounded-full bg-[#FEFCF280] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center"
              >
                <svg
                  width="32"
                  height="35"
                  viewBox="0 0 32 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.5317 14.992C31.6827 16.234 31.6828 19.3388 29.5317 20.5807L5.33223 34.5522C3.18117 35.7942 0.492332 34.2418 0.492332 31.7579V3.8148C0.492332 1.33097 3.18116 -0.221436 5.33223 1.02048L29.5317 14.992Z"
                    fill="#130F26"
                    fillOpacity="0.5"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-neutral-700 my-2 text-2xl font-medium font-['Inter']">
              About this Course{' '}
            </h2>
            <div>
              <p className="w-full lg:w-[750px] h-[100px] lg:h-[189px] text-neutral-600 text-sm font-medium font-['Inter'] leading-tight">
                {props?.description}
                <br />
                <br />{' '}
              </p>
              {props?.description?.length > MAX_DESCRIPTION_LENGTH && (
                <span
                  onClick={handleReadMore}
                  className="text-neutral-700 text-sm font-medium font-['Inter'] leading-tight cursor-pointer"
                >
                  {showMore ? 'Read Less' : 'Read More...'}
                </span>
              )}
            </div>
          </div>
          {/* REQUIREMENTS */}
          <CourseDetailsRequirements />
        </div>
      </div>
      <Modal
        isOpen={videoModalOpen}
        closeModal={() => setVideoModalOpen(false)}
      >
        <VideoPlayer
          className="h-[70vh] w-[70vw]"
          title={props.name}
          src={props.previewVideoUrl}
          posterUrl={props.imageUrl}
        />
      </Modal>
    </div>
  );
};

export default AboutCourseDetails;
