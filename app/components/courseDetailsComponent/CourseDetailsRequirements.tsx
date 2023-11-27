import React from 'react';

type Props = {};

const CourseDetailsRequirements = (props: Props) => {
  return (
    <div className="w-full md:w-[758px] my-5 h-[173px] p-4 bg-neutral-100 rounded-lg flex-col justify-start items-start gap-px inline-flex">
      <div className="flex-col justify-start items-start gap-4 flex">
        <div className="text-neutral-700 text-base font-medium font-['Inter']">
          Requirements
        </div>
        <div className="flex-col justify-start items-start gap-6 flex">
          <div className="justify-start items-center gap-2 inline-flex">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.1667 10.0001L17.1334 7.68345L17.4167 4.61678L14.4084 3.93345L12.8334 1.28345L10 2.50011L7.16671 1.28345L5.59171 3.93345L2.58337 4.60845L2.86671 7.67511L0.833374 10.0001L2.86671 12.3168L2.58337 15.3918L5.59171 16.0751L7.16671 18.7251L10 17.5001L12.8334 18.7168L14.4084 16.0668L17.4167 15.3834L17.1334 12.3168L19.1667 10.0001ZM8.33337 14.1668L5.00004 10.8334L6.17504 9.65845L8.33337 11.8084L13.825 6.31678L15 7.50011L8.33337 14.1668Z"
                fill="#404040"
              />
            </svg>
            <div className="text-neutral-600 text-base font-medium font-['Inter'] leading-tight">
              Basic Knowledge of Python
            </div>
          </div>
          <div className="justify-start items-center gap-2 inline-flex">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.1667 10.0001L17.1334 7.68345L17.4167 4.61678L14.4084 3.93345L12.8334 1.28345L10 2.50011L7.16671 1.28345L5.59171 3.93345L2.58337 4.60845L2.86671 7.67511L0.833374 10.0001L2.86671 12.3168L2.58337 15.3918L5.59171 16.0751L7.16671 18.7251L10 17.5001L12.8334 18.7168L14.4084 16.0668L17.4167 15.3834L17.1334 12.3168L19.1667 10.0001ZM8.33337 14.1668L5.00004 10.8334L6.17504 9.65845L8.33337 11.8084L13.825 6.31678L15 7.50011L8.33337 14.1668Z"
                fill="#404040"
              />
            </svg>
            <div className="text-neutral-600 text-base font-medium font-['Inter'] leading-tight">
              Ownership of a pc, desktop or laptop
            </div>
          </div>
          <div className="justify-start items-center gap-2 inline-flex">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.1667 10.0001L17.1334 7.68345L17.4167 4.61678L14.4084 3.93345L12.8334 1.28345L10 2.50011L7.16671 1.28345L5.59171 3.93345L2.58337 4.60845L2.86671 7.67511L0.833374 10.0001L2.86671 12.3168L2.58337 15.3918L5.59171 16.0751L7.16671 18.7251L10 17.5001L12.8334 18.7168L14.4084 16.0668L17.4167 15.3834L17.1334 12.3168L19.1667 10.0001ZM8.33337 14.1668L5.00004 10.8334L6.17504 9.65845L8.33337 11.8084L13.825 6.31678L15 7.50011L8.33337 14.1668Z"
                fill="#404040"
              />
            </svg>
            <div className="text-neutral-600 text-base font-medium font-['Inter'] leading-tight">
              Ownership of a pc, desktop or laptop
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsRequirements;
