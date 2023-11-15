import React from 'react';

type Props = {
  mobile: boolean;
};

const CourseDetailsModulesTiles = (props: Props) => {
    const containerClass = props.mobile ? 'w-full md:w-[237px]' : 'w-[237px]';
  return (
    <div
      className={`${containerClass} h-7 px-4 py-1 rounded-2xl border border-neutral-100 justify-between md:justify-start items-start gap-4 inline-flex`}
    >
      <div className="justify-start items-center gap-2 flex">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8333 16.6666H3.33329C2.40829 16.6666 1.66663 15.9166 1.66663 14.9999V4.99992C1.66663 4.07492 2.40829 3.33325 3.33329 3.33325H8.33329L9.99996 4.99992H15.8333C16.2753 4.99992 16.6992 5.17551 17.0118 5.48807C17.3244 5.80063 17.5 6.22456 17.5 6.66659H3.33329V14.9999L5.11663 8.33325H19.3416L17.4416 15.4166C17.25 16.1416 16.6 16.6666 15.8333 16.6666Z"
            fill="#404040"
          />
        </svg>
        <span className="text-neutral-700 w-max text-sm font-medium font-['Inter']">
          4 modules
        </span>
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
            d="M7.5 2.5V15H10V2.5H7.5ZM10 4.16667L13.3333 15L15.8333 14.1667L12.5 3.33333L10 4.16667ZM4.16667 4.16667V15H6.66667V4.16667H4.16667ZM2.5 15.8333V17.5H17.5V15.8333H2.5Z"
            fill="#404040"
          />
        </svg>
        <span className="text-neutral-700 w-max text-sm font-medium font-['Inter']">
          20 topics{' '}
        </span>
      </div>
    </div>
  );
};

export default CourseDetailsModulesTiles;
