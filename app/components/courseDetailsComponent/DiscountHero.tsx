import React from 'react';

type Props = {};

const DiscountHero = (props: Props) => {
  return (
    <div>
      <div className="w-screen h-14 pt-5 pb-[19px] bg-neutral-900 justify-center items-center inline-flex">
        <div className="self-stretch justify-start items-center gap-2 inline-flex">
          <svg
            width="11"
            height="17"
            viewBox="0 0 11 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0975 5.51205C10.0975 8.46741 7.80264 8.92639 7.80264 11.6807C7.80264 13.1026 6.36925 13.2224 5.27826 13.2224C4.33597 13.2224 2.25542 12.8649 2.25542 11.6798C2.25542 8.92685 0 8.46787 0 5.51205C0 2.74395 2.4257 0.5 5.08686 0.5C7.74894 0.5 10.0975 2.74395 10.0975 5.51205Z"
              fill="#FFD983"
            />
            <path
              d="M6.96124 15.3527C6.96124 15.7327 5.93588 16.5001 5.04867 16.5001C4.16147 16.5001 3.13611 15.7327 3.13611 15.3527C3.13611 14.9726 4.16101 15.1232 5.04867 15.1232C5.93588 15.1232 6.96124 14.9726 6.96124 15.3527Z"
              fill="#CCD6DD"
            />
            <path
              d="M7.20921 5.16023C7.02975 4.98077 6.73967 4.98077 6.56021 5.16023L5.04879 6.67165L3.53738 5.16023C3.35791 4.98077 3.06784 4.98077 2.88838 5.16023C2.70892 5.33969 2.70892 5.62977 2.88838 5.80923L4.58981 7.51066V12.3694C4.58981 12.6232 4.79544 12.8284 5.04879 12.8284C5.30215 12.8284 5.50777 12.6232 5.50777 12.3694V7.51066L7.20921 5.80923C7.38867 5.62977 7.38867 5.33969 7.20921 5.16023Z"
              fill="#FFCC4D"
            />
            <path
              d="M7.80267 14.664C7.80267 15.1707 7.39142 15.582 6.88471 15.582H3.21288C2.70617 15.582 2.29492 15.1707 2.29492 14.664V11.9102H7.80267V14.664Z"
              fill="#99AAB5"
            />
            <path
              d="M2.29437 15.1231C2.07406 15.1231 1.87946 14.9639 1.84228 14.7394C1.80051 14.4897 1.96942 14.2529 2.21956 14.2116L7.72731 13.2936C7.97699 13.2487 8.21382 13.4208 8.25513 13.6709C8.2969 13.9206 8.12799 14.1574 7.87785 14.1987L2.37011 15.1167C2.34486 15.1213 2.31916 15.1231 2.29437 15.1231ZM2.29437 13.2872C2.07406 13.2872 1.87946 13.1279 1.84228 12.9035C1.80051 12.6538 1.96942 12.417 2.21956 12.3757L7.72731 11.4577C7.97699 11.4132 8.21382 11.5849 8.25513 11.835C8.2969 12.0847 8.12799 12.3215 7.87785 12.3628L2.37011 13.2808C2.34486 13.2854 2.31916 13.2872 2.29437 13.2872Z"
              fill="#CCD6DD"
            />
          </svg>
          <div className="justify-start items-start gap-2 flex">
            <div className="text-neutral-200 text-sm font-medium font-['Inter']">
              Get 50% off all courses now.
            </div>
            <div className="text-neutral-100 text-sm font-medium font-['Inter'] underline cursor-pointer">
              Go to Course
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center my-5">
        <div className="w-[180px] h-[25px] px-3 py-1 bg-red-50 rounded-[32px] border border-red-500 justify-center items-center gap-2 inline-flex">
          <div className="w-2.5 h-2.5 relative">
            <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-rose-200 rounded-full" />
            <div className="w-[7px] h-[7px] left-[1.50px] top-[1.50px] absolute bg-gradient-to-b from-red-500 to-rose-600 rounded-full" />
          </div>
          <div className="text-red-900 text-sm font-medium font-['Inter']">
            Coming soon{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountHero;
