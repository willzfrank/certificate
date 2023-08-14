import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
type Props = {};

const AddCourseContent = (props: Props) => {
  const [checkboxes, setCheckboxes] = useState([true, true, true, true]);

  const toggleCheckbox = (index: number) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxes(updatedCheckboxes);
  };

  return (
    <div className="mb-6 lg:w-full h-[189.08px] lg:h-full   md:w-[65%] overflow-x-auto no-scrollbar">
      <h5 className="text-black text-[15px] font-semibold mb-1 h-[50px]">
        Course Content
      </h5>
      <div>
        <div className="flex">
          <div>
            <div className="border-[#EDEDED] border-t bg-[#F4F4F4] transition duration-500 cursor-pointer w-full px-4 py-3 lg:pr-20">
              <div className="py-3">
                <h5 className="text-app-dark-400 truncate">
                  Module 1 - Introduction to Communication
                </h5>
                <p className="text-muted text-[15px]">05 mins</p>
              </div>
            </div>
            <div className="border-[#EDEDED] border-t bg-[#F4F4F4] transition duration-500 cursor-pointer w-full px-4 py-3 lg:pr-20">
              <div className="py-3">
                <h5 className="text-app-dark-400 truncate">
                  Module 1 - Introduction to Communication
                </h5>{' '}
                <p className="text-muted text-[15px]">05 mins</p>
              </div>
            </div>
            <div className="border-[#EDEDED] border-t bg-[#F4F4F4] transition duration-500 cursor-pointer w-full px-4 py-3 lg:pr-20 sm:truncate">
              <div className="py-3">
                <h5 className="text-app-dark-400 truncate">
                  Module 1 - Introduction to Communication
                </h5>{' '}
                <p className="text-muted text-[15px]">05 mins</p>
              </div>
            </div>
            <div className="border-[#EDEDED] border-t bg-[#F4F4F4] transition duration-500 cursor-pointer w-full px-4 py-3 lg:pr-20">
              <div className="py-3">
                <h5 className="text-app-dark-400 truncate">
                  Module 1 - Introduction to Communication
                </h5>{' '}
                <p className="text-muted text-[15px]">05 mins</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col items-center">
            {checkboxes.map((isChecked, index) => (
              <div
                key={index}
                className="px-4 py-3 h-[90px] flex justify-center flex-col items-center"
              >
                <div className="flex gap-2">
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
                      d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <label className="relative inline-flex items-center mb-5 cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      checked={isChecked}
                      onChange={() => toggleCheckbox(index)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none   dark:peer-focus:app-pink rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-app-pink"></div>
                  </label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-html="Unlocking this module will make it accessible <br md:block /> to learners  without having to pay for the course. <br />This can allow learners to experience a part <br md:block /> of the course before deciding to pay for it. 
"
                    data-tooltip-place="top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <ReactTooltip
                    className="w-[100px] break-words"
                    id="my-tooltip" // Unique tooltip ID
                    // content="Hello world! I'm a Tooltip"
                    // place="top"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseContent;
