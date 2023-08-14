import * as React from 'react'
import { useMarkCourseAsCompletedMutation } from 'app/api/courseApi'
import { useAppSelector } from 'app/hooks'
import Button from './Button'
import { camelCase } from 'app/utils'
import StopPropagation from './StopPropagation'

const DownloadCertificateButton = ({
  courseId,
  title,
}: {
  courseId: string
  title: string
}) => {
  const [
    markAsCompleted,
    { isLoading: isMarkingAsCompleted },
  ] = useMarkCourseAsCompletedMutation()

  const { firstName, lastName } = useAppSelector((store) => store.user)

  const downloadCertificateAnchorRef = React.useRef<HTMLAnchorElement>(null)
  const downloadCertificateButtonRef = React.useRef<
    React.ComponentRef<typeof Button>
  >(null)

  const generateCertificate = React.useCallback(async () => {
    try {
      const res = await markAsCompleted(courseId).unwrap()

      if (downloadCertificateAnchorRef.current) {
        // set the URL
        downloadCertificateAnchorRef.current.href = res.data

        // trigger the download
        downloadCertificateAnchorRef.current.click()
      }
    } catch (error) {
      console.error(error)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])


  // DOWNLOADABLE
    // const generateCertificate = React.useCallback(async () => {
    //   try {
    //     const res = await markAsCompleted(courseId).unwrap();

    //     if (downloadCertificateAnchorRef.current) {
    //       const certificateData = res.data; // Assuming the response contains the certificate data, adjust if necessary

    //       // Assuming that the response is already a binary representation of the image
    //       // and it's in JPEG format (image/jpeg). If not, adjust the "type" accordingly.

    //       // Create a Blob from the certificate data
    //       const certificateBlob = new Blob([certificateData], {
    //         type: 'image/png', // Correct MIME type for HTML files
    //       });

    //       // Create a temporary URL for the Blob
    //       const certificateURL = URL.createObjectURL(certificateBlob);

    //       // set the URL for download
    //       downloadCertificateAnchorRef.current.href = certificateURL;

    //       // trigger the download
    //       downloadCertificateAnchorRef.current.click();

    //       // Clean up the temporary URL after the download is initiated
    //       URL.revokeObjectURL(certificateURL);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }

    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [courseId]);


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
          Click to Download Certificate
        </Button>
      </StopPropagation>
      <a
        ref={downloadCertificateAnchorRef}
        href=""
        download={`${camelCase(firstName as string, true)} ${camelCase(
          lastName as string,
          true,
        )}'s Certificate of Completion ${title}`}
      ></a>
    </>
  )
}

export default DownloadCertificateButton
