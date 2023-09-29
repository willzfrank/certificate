import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { ModuleContentResponse } from 'app/types';
import * as resourceGuards from 'app/types/guards';
import { openModal } from 'app/redux/slices/modalSlice';
import { useDispatch } from 'react-redux';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';

// Import styles
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

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

  const handleContextMenu = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent the default right-click menu
  };


  const fullScreenPluginInstance = fullScreenPlugin({
    // Zoom to fit the screen after entering and exiting the full screen mode
    onEnterFullScreen: (zoom) => {
      zoom(SpecialZoomLevel.PageFit);
    },
    onExitFullScreen: (zoom) => {
      zoom(SpecialZoomLevel.PageFit);
    },
    // renderExitFullScreenButton: (props) => (
    //   <div
    //     style={{
    //       bottom: '1rem',
    //       position: 'fixed',
    //       right: '1rem',
    //     }}
    //   >
    //     <button onClick={props.onClick}>Exit full screen</button>
    //   </div>
    // ),
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="mb-10 sm:w-full min-h-max">
      <div className={`${props.className}  mb-8 relative `}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
          <div
            className="md:h-[450px] h-[530px]"
            // onContextMenu={handleContextMenu}
          >
            <Viewer
              fileUrl={props.document?.documentUrl}
              plugins={[defaultLayoutPluginInstance, fullScreenPluginInstance]}
            />
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;
