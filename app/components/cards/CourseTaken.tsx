import * as React from 'react';
import Link from 'next/link';
import { DownloadCertificateButton, Image } from '../elements';

interface CourseTakenType {
  title: string;
  imageUrl: string;
  videoUrl: string;
  percentageCompleted?: number;
  module?: string;
  courseId: string;
  certificateRequired?: boolean;
  slugName?: string;
  // courseId: string;
}

const CourseTaken = function (props: CourseTakenType) {
  return (
    <div className="border border-[#EAEAEA] rounded-[4px] overflow-hidden gap-y-2">
      <Image
        // src={`/api/imageProxy?url=${encodeURIComponent(props.imageUrl)}`}
        src={props.imageUrl}
        alt={'image for ' + props.title}
        objectFit={'cover'}
        className="h-[250px] md:h-[280px] w-full overflow-hidden rounded-[4px]"
      />

      <div className="p-4 space-y-4">
        <Link href={`/course/${props.courseId}?slugName=${props.slugName}`}>
          <div>
            <p className="font-medium truncate">Module One: {props.title}</p>
            <p className="text-muted truncate">{props.title}</p>
          </div>
        </Link>
        <div>
          {props.percentageCompleted ||
          props.percentageCompleted?.toString() === '0' ? (
            <div className="flex items-center justify-between">
              {props.percentageCompleted?.toString() === '100' ? (
                <DownloadCertificateButton
                  title={props.title}
                  courseId={props.courseId}
                />
              ) : (
                <p>{props.percentageCompleted.toString() + '%'}</p>
              )}

              {props.percentageCompleted?.toString() !== '100' && (
                <div className="px-3 py-1 rounded bg-blue-600 text-white text-sm">
                  In Progress
                </div>
              )}
            </div>
          ) : (
            <p className="px-3 py-1 rounded bg-app-pink text-white text-sm w-fit">
              Wishlist
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseTaken;
