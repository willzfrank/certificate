import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { ModuleContentResponse } from 'app/types';
import * as resourceGuards from 'app/types/guards';
import { openModal } from 'app/redux/slices/modalSlice';
import { useDispatch } from 'react-redux';

import pdfWorkerSrc from 'pdfworker';
import Button from './Button';
import Loader from './Loader';

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://firebasestorage.googleapis.com/v0/b/certs-by-unify.appspot.com/o/pdfworkerbuild.js?alt=media&token=03171bab-2901-4c5d-ab07-7954ddcf9257';

interface PDFViewerProps {
  className?: string;
  document: ModuleContentResponse['data']['documents'][0];
  close: () => void;
  markAsCompleted: () => void;
  markAsCompletedLoading: boolean;
}

const PDFError = (props: { errorType: 'load' | 'source' }) => {
  return (
    <div className="text-black flex items-center justify-center text-center h-screen">
      <p>AN ERROR OCCURRED WHILE LOADING PDF {props.errorType}</p>
    </div>
  );
};

const PDFViewer = (props: PDFViewerProps) => {
  const [errorType, setErrorType] =
    useState<React.ComponentProps<typeof PDFError>['errorType']>('load');
  const [numberofPages, setNumberofPages] = useState(0);
  const [scale, setScale] = useState(0.4);
  const [modalOpen, setmodalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const closeModal = () => {
    setmodalOpen((prev) => !prev);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => prevScale - 0.1);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const scale = isMobile ? 0.4 : isTablet ? 0.64 : 0.7;
      setScale(scale);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="mb-10 sm:w-full  min-h-max">
      <div
        className="p-2 text-[#1c1b1b] w-full md:mb-2"
        style={{ boxShadow: '0px 5px 10px #2b2a2a' }}
      >
        <div className="md:w-[100%] mx-auto flex md:items-center justify-between flex-col md:flex-row">
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
      </div>{' '}
      <div className={`${props.className}  mb-8 relative `}>
        <div className="absolute top-2 right-4">
          <div className="flex items-center gap-2 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={handleZoomOut}
              className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={handleZoomIn}
              className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
              />
            </svg>
          </div>
        </div>
        <Document
          className="md:border-4 border-app-pink h-[450px] overflow-scroll"
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
              className="mx-auto w-fit my-4"
              key={`page-${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
              renderAnnotationLayer={true}
              renderTextLayer={true}
            />
          ))}
        </Document>

        {/* MODAL FOR MOBILE VIEWS */}
        {/* {resourceGuards.isDocument(props.document?.documentUrl) ? (
          <Modal isOpen={modalOpen} closeModal={closeModal}>
            <div className="mb-10 sm:w-full  min-h-max">
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
                    className="mx-auto w-fit my-4"
                    key={`page-${index + 1}`}
                    pageNumber={index + 1}
                    scale={scale}
                    renderAnnotationLayer={true}
                    renderTextLayer={true}
                  />
                ))}
              </Document>
            </div>
          </Modal>
        ) : null} */}
      </div>
    </div>
  );
};

export default PDFViewer;
