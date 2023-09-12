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
  courseDetails: any;
}

const PDFViewerHeader = (props: PDFViewerProps) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <div className="relative h-full flex flex-col justify-center items-center">
      <h6 className="text-black absolute text-center text-base md:text-xl inter font-semibold hidden md:block">
        {props.courseDetails?.name}
      </h6>
      <div className="w-full items-end flex justify-between flex-col md:flex-row mt-10">
        <h1 className="capitalize inter text-center md:text-left w-full">
          {props.document?.displayName}
        </h1>

        <div className="flex items-center justify-between w-full md:w-max md:justify-end gap-2 text-gray-300">
          <div className="w-full px-2">
            <div className="flex items-center justify-between">
              <div>
                <a className="btn-floating">
                  <Button
                    onClick={props.close}
                    className="transition duration-300 bg-app-pink py-0 px-3 text-sm text-white hover:text-white cursor-not-allowed rounded"
                  >
                    Close
                  </Button>
                </a>
              </div>
            </div>
          </div>
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
