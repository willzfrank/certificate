import React, { useEffect, useState } from 'react';
import CourseDetailsRequirements from './CourseDetailsRequirements';
import { Image, Modal, VideoPlayer } from '../elements';
import { ExternalCourse } from 'app/types';
import { useAppSelector } from 'app/hooks';
import { useCookies } from 'react-cookie';
import { TOKEN_KEY, USER_TYPE_KEY } from 'app/constants';
import Plyr from 'plyr-react';
import Script from 'next/script';

interface IAboutCourseDetails extends ExternalCourse {
  setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const YouTubeVideo = () => {
  return (
    <>
      {/* Load YouTube iframe API script 
      ABEG NO REMOVE AM OO ..CUZ IT WILL BREAK FOR VIDEOS 
      */}

      <Script
        src="https://www.youtube.com/iframe_api"
        strategy="beforeInteractive"
      />

      <Plyr
        source={{
          type: 'video',
          sources: [
            {
              src: 'https://www.youtube-nocookie.com/embed/UY28LXU2M3Q',
              provider: 'youtube',
            },
          ],
        }}
        options={{
          controls: [
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'fullscreen',
          ],
          ratio: '16:9',
          autoplay: true,
        }}
        style={{ width: '100%', height: '100%', borderRadius: '10px' }}
        onError={(event) => console.error('Plyr error:', event)}
      />
    </>
  );
};
const AboutCourseDetails = (props: IAboutCourseDetails) => {
  const user = useAppSelector((store) => store.user);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [cookie] = useCookies([TOKEN_KEY, USER_TYPE_KEY]);
  const MAX_DESCRIPTION_LENGTH = 300;

  const handleReadMore = () => {
    setShowMore(!showMore);
  };
  function setUpPayment() {
    if (!Boolean(user.id || cookie[TOKEN_KEY])) {
      console.log('User is not logged in');
      props.setShowAuthModal(true);
      return;
    }
    props.setAccessModal(true);
  }
  const displayDescription = showMore
    ? props?.description
    : `${props?.description?.slice(0, MAX_DESCRIPTION_LENGTH)}${
        props?.description?.length > MAX_DESCRIPTION_LENGTH ? '...' : ''
      }`;

  return (
    <div className="py-10">
      <div>
        <div className="w-[72px] h-[21px] px-2 pb-1 border-l-2 border-neutral-700 justify-center items-center gap-px inline-flex">
          <div className="text-neutral-700 text-base font-medium font-['Inter']">
            Courses
          </div>
        </div>
        <div className="w-full h-[0px] border border-neutral-200" />
      </div>

      {/* ABOUT US BODY HERO */}
      <div className="flex-col-reverse lg:block flex">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <div className="aspect-video lg:w-[60%] w-full hidden lg:block h-[200px] lg:h-[472px] my-5 relative rounded-lg overflow-clip">
            <YouTubeVideo />
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
                    <div className="text-neutral-600 text-base font-medium font-['Inter']">
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
                        <div className="text-neutral-600 text-base font-medium font-['Inter'] leading-tight">
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
                        <div className="text-neutral-600 text-base font-medium font-['Inter'] leading-tight">
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
                        <div className="text-neutral-600 text-base font-medium font-['Inter'] leading-tight">
                          Lorem Ipsum dolor
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[150px] h-[17px] justify-between items-start gap-1.5 inline-flex my-5">
                    <div className="text-neutral-600 text-base font-medium font-['Inter']">
                      50% Disc.
                    </div>
                    <div className="text-red-500 text-base font-medium font-['Inter'] line-through">
                      N10,000
                    </div>
                  </div>
                </div>
                <div className="w-full h-[0px] border border-neutral-200"></div>
                {/* button */}
                <button
                  className="w-[299px] h-[41px] p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded justify-center items-center gap-px inline-flex cursor-pointer"
                  onClick={setUpPayment}
                >
                  <div className="text-white text-base font-medium font-['Inter']">
                    Pay ₦{props.pricings[0].price}
                  </div>
                </button>
              </div>
            </div>
            <div className="w-[348px] h-[130px] flex-col justify-start items-start gap-[17px] inline-flex">
              <div className="w-full py-1.5 border-b border-neutral-100 justify-between items-start inline-flex">
                <div className="text-neutral-400 text-base font-medium font-['Inter'] leading-tight">
                  Total Reviews
                </div>
                <div className="text-neutral-700 text-base font-medium font-['Inter'] leading-tight">
                  76+
                </div>
              </div>
              <div className="w-full py-1.5 border-b border-neutral-100 justify-between items-start inline-flex">
                <div className="text-neutral-400 text-base font-medium font-['Inter'] leading-tight">
                  Succes Rate
                </div>
                <div className="text-neutral-700 text-base font-medium font-['Inter'] leading-tight">
                  90%
                </div>
              </div>
              <div className="w-full py-1.5 border-b border-neutral-100 justify-between items-start inline-flex">
                <div className="text-neutral-400 text-base font-medium font-['Inter'] leading-tight">
                  Registered Students
                </div>
                <div className="text-neutral-700 text-base font-medium font-['Inter'] leading-tight">
                  50+
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT US BODY CONTENT */}
        <div className="flex-col flex lg:block">
          <div>
            <div className="lg:w-[60%] w-full lg:hidden block h-[200px] lg:h-[472px] my-5 relative rounded-lg overflow-clip">
              <YouTubeVideo />
            </div>
            <h2 className="text-neutral-700 my-2 text-2xl font-medium font-['Inter']">
              About this Course{' '}
            </h2>
            <div>
              <p className="w-full lg:w-[750px] h-[100px] lg:h-[189px] text-neutral-600 text-base font-medium font-['Inter'] leading-tight">
                {props?.description}
                <br />
                <br />{' '}
              </p>
              {props?.description?.length > MAX_DESCRIPTION_LENGTH && (
                <span
                  onClick={handleReadMore}
                  className="text-neutral-700 text-base font-medium font-['Inter'] leading-tight cursor-pointer"
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
      {/* <Modal
        isOpen={videoModalOpen}
        closeModal={() => setVideoModalOpen(false)}
      >
        <iframe
          width="1000"
          className="aspect-video"
          src="https://www.youtube-nocookie.com/embed/UY28LXU2M3Q?autoplay=1&mute=1"
          title="YouTube video player"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web"
          allowFullScreen
        ></iframe>
      </Modal> */}
    </div>
  );
};

export default AboutCourseDetails;
