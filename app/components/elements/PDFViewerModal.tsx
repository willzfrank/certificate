import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { ModuleContentResponse } from 'app/types';
// import * as resourceGuards from 'app/types/guards';
import { closePdfModal } from 'app/redux/slices/modalSlice';
import { useDispatch } from 'react-redux';

// import pdfWorkerSrc from 'pdfworker';
import Button from './Button';
import Loader from './Loader';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://firebasestorage.googleapis.com/v0/b/certs-by-unify.appspot.com/o/pdfworkerbuild.js?alt=media&token=03171bab-2901-4c5d-ab07-7954ddcf9257';

interface PDFViewerModalProps {
  className?: string;
  document: ModuleContentResponse['data']['documents'][0];
  close: () => void;
  markAsCompleted: () => void;
  markAsCompletedLoading: boolean;
}

const PDFError = (props: { errorType: 'load' | 'source' }) => {
  return (
    <p className="text-white">
      AN ERROR OCCURRED WHILE LOADING PDF {props.errorType}
    </p>
  );
};

const PDFViewerModal = (props: PDFViewerModalProps) => {
  const [errorType, setErrorType] =
    useState<React.ComponentProps<typeof PDFError>['errorType']>('load');
  const [numberofPages, setNumberofPages] = useState(0);
  const [scale, setScale] = useState(0.4);
  const [modalOpen, setmodalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closePdfModal());
  };

  const closeModal = () => {
    setmodalOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const isSmallMobile = window.innerWidth >= 320 && window.innerWidth < 376;
      const isMediumMobile =
        window.innerWidth >= 380 && window.innerWidth < 427;
      const isMobile = window.innerWidth < 768;
      const isFoldable = window.innerWidth === 1114;
      const isTablet = window.innerWidth >= 821 && window.innerWidth < 1024;
      const isTabletSmall = window.innerWidth >= 768 && window.innerWidth < 900;
      const scale = isSmallMobile
        ? 0.45
        : isMediumMobile
        ? 0.5
        : isMobile
        ? 0.53
        : isTablet
        ? 1.1
        : isTabletSmall
        ? 1
        : isFoldable
        ? 1.1
        : 1.1;
      setScale(scale);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="mb-10 md:w-full  min-h-max">
      <div
        className="p-6 bg-[#1c1b1b] w-full  text-white "
        style={{ boxShadow: '0px 5px 10px #2b2a2a' }}
      >
        <div className="md:w-[100%] mx-auto flex md:items-center justify-between flex-col md:flex-row">
          <h1 className="md:text-xl">{props.document?.displayName}</h1>

          <div className="flex items-center md:justify-end gap-4 text-gray-300">
            <Button
              title="next"
              loading={props.markAsCompletedLoading}
              onClick={props.markAsCompleted}
              className="transition duration-300 md:bg-white py-0 px-4 rounded text-white md:text-black md:hover:text-black hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                />
              </svg>
            </Button>
            <Button
              title="exit full screen"
              className="transition duration-300 md:bg-white py-0 px-4 rounded text-white md:text-black md:hover:text-black hover:text-white"
              onClick={handleCloseModal}
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
            </Button>
          </div>
        </div>
      </div>{' '}
      <div
        className={`h-[93vh] md:h-[90vh] overflow-y-scroll ${props.className}  mb-8 relative w-full pdf-viewer`}
      >
        <Document
          file={props.document?.documentUrl}
          renderMode="svg"
          error={<PDFError errorType={errorType} />}
          onLoadError={() => setErrorType('load')}
          onSourceError={() => setErrorType('source')}
          onLoadSuccess={({ numPages }) => setNumberofPages(numPages)}
          loading={
            <div className="w-full h-[80vh] flex items-center justify-center">
              <Loader mainColor="white" className="w-32 h-32" />
            </div>
          }
        >
          {Array.from({ length: numberofPages }, (_, index) => (
            <Page
              className="mx-auto w-fit my-4 overflow-scroll"
              key={`page-${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
              renderAnnotationLayer={true}
              renderTextLayer={true}
            />
          ))}
        </Document>

        {/* <div className="w-full px-2 absolute">
          <ul className="flex justify-between">
            <li>
              <a className="btn-floating">
                <Button
                  onClick={props.close}
                  className="transition duration-300 bg-app-pink py-3 px-6 rounded text-white hover:text-white"
                >
                  Close
                </Button>
              </a>
            </li>

            <li>
              <Button
                loading={props.markAsCompletedLoading}
                onClick={props.markAsCompleted}
                className="transition duration-300 bg-app-pink py-3 px-6 rounded text-white hover:text-white"
              >
                Next
              </Button>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default PDFViewerModal;
