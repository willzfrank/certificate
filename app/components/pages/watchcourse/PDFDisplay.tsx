import React from 'react';
import type { ModuleContentResponse } from 'app/types';
import styles from '../../../../styles/pdfDisplay.module.css';
import { pdfjs } from 'react-pdf';
import pdfWorkerSrc from 'pdfworker';

interface PDFViewerProps {
  className?: string;
  document: ModuleContentResponse['data']['documents'][0];
  close: () => void;
  markAsCompleted: () => void;
  markAsCompletedLoading: boolean;
}

const PDFError = (props: { errorType: 'load' | 'source' }) => {
  return (
    <p className="text-white text-center">
      AN ERROR OCCURRED WHILE LOADING PDF {props.errorType}
    </p>
  );
};

const PDFDisplay = (props: PDFViewerProps) => {
  return (
    <div className={`${styles.pdfDisplayMain} mb-10 w-screen`}>
      <div
        className="p-6 bg-transparent w-full text-white rounded-sm"
        style={{ boxShadow: '0px 5px 10px #2b2a2a' }}
      >
        <iframe src={props.document?.documentUrl} width="100%" height="200px" />
      </div>
    </div>
  );
};

export default PDFDisplay;
