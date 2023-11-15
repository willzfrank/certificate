import * as React from 'react';
import { useMarkCourseAsCompletedMutation } from 'app/api/courseApi';
import { useAppSelector } from 'app/hooks';
import Button from './Button';
import { camelCase } from 'app/utils';
import StopPropagation from './StopPropagation';

const DownloadCertificateButton = ({
  courseId,
  title,
}: {
  courseId: string;
  title: string;
}) => {
  const [markAsCompleted, { isLoading: isMarkingAsCompleted }] =
    useMarkCourseAsCompletedMutation();
  const [certificateData, setCertificateData] = React.useState('');

  const { firstName, lastName } = useAppSelector((store) => store.user);

  const downloadCertificateAnchorRef = React.useRef<HTMLAnchorElement>(null);
  const downloadCertificateButtonRef =
    React.useRef<React.ComponentRef<typeof Button>>(null);

  const generateCertificate = React.useCallback(async () => {
    try {
      const res = await markAsCompleted(courseId).unwrap();
      const certificateData = res?.data;
      setCertificateData(certificateData);
      const certificateBlob = new Blob([certificateData], {
        type: 'application/pdf',
      });

      const certificateURL = URL.createObjectURL(certificateBlob);

      // if (downloadCertificateAnchorRef.current) {
      //   downloadCertificateAnchorRef.current.href = certificateURL;
      //   downloadCertificateAnchorRef.current.download = `${camelCase(
      //     firstName,
      //     true
      //   )} ${camelCase(
      //     lastName,
      //     true
      //   )}'s Certificate of Completion ${title}.pdf`;
      //   downloadCertificateAnchorRef.current.click();
      // }

      URL.revokeObjectURL(certificateURL);
    } catch (error) {
      console.error(error);
    }
  }, [courseId, firstName, lastName, title]);

  React.useEffect(() => {
    generateCertificate(); // Automatically call generateCertificate on load SO THAT THE URL IS GENERATED
  }, []);

  return (
    <>
      <StopPropagation<HTMLButtonElement>
        elementRef={downloadCertificateButtonRef}
        callback={generateCertificate}
      >
        <Button
          ref={downloadCertificateButtonRef}
          className="px-3 py-1 border rounded mt-4 hover:border-green-600 hover:text-green-600 h-auto"
          loading={isMarkingAsCompleted}
        >
          <a
            ref={downloadCertificateAnchorRef}
            href={certificateData}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click to Download Certificate
          </a>
        </Button>
      </StopPropagation>
    </>
  );
};

export default DownloadCertificateButton;
