import { ModuleContentResponse } from 'app/types';
import React from 'react';
import Button from './Button';
import { openModal } from 'app/redux/slices/modalSlice';
import { useDispatch } from 'react-redux';

interface PDFViewerProps {
  className?: string;
  document: ModuleContentResponse['data']['documents'][0];
  close: () => void;
  markAsCompleted: () => void;
  markAsCompletedLoading: boolean;
}

const PDFViewerHeader = (props: PDFViewerProps) => {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
      dispatch(openModal());
    };

    // const closeModal = () => {
    //   setmodalOpen((prev) => !prev);
    // };

  return (
    <div>
      <div className="md:w-[100%] mx-auto flex md:items-center justify-between flex-col md:flex-row mt-10">
        <h1 className="capitalize inter ">{props.document?.displayName}</h1>

        <div className="flex items-center justify-center md:justify-end gap-2 text-gray-300">
          <div className="w-full px-2">
            <div className="flex items-center justify-between">
              <div>
                <a className="btn-floating">
                  <Button
                    onClick={props.close}
                    className="transition duration-300 bg-app-pink py-0 px-3 text-sm rounded text-white hover:text-white cursor-not-allowed"
                  >
                    Close
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <Button
            // onClick={handleZoomIn}
            className="hover:text-app-pink transition duration-300 text-[#1c1b1b] block md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
              />
            </svg>
          </Button>
          <Button
            // onClick={handleZoomOut}
            className="hover:text-app-pink transition duration-300 text-[#1c1b1b] block md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
              />
            </svg>
          </Button>
          <Button
            className="hover:text-app-pink transition duration-300 text-[#1c1b1b] w-full flex flex-col items-center justify-center
              "
            onClick={handleOpenModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
            <p className="text-[10px]">Full screen </p>
          </Button>
          <div>
            <Button
              loading={props.markAsCompletedLoading}
              onClick={props.markAsCompleted}
              className="transition duration-300 bg-app-pink py-0 px-3 text-sm rounded text-white hover:text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewerHeader;
