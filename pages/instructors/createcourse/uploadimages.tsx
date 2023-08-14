import * as React from 'react';
import { NextPageWithLayout } from 'app/types';
import {
  CreateCourseLayout,
  Button,
  Image,
  VideoPlayer,
  Modal,
} from 'app/components';
import { CourseCreationContext } from 'app/contexts';
import { useCreateNewCourse__UploadPreviewMediaMutation } from 'app/api/courseCreationApi';
import { useNotify, useWatchSearchParams } from 'app/hooks';
import { useRouter } from 'next/router';

const CreateCourse_UploadImages: NextPageWithLayout<{}> = () => {
  const {
    courseMedia: { videoPreview, imagePreview },
    updateCourseMedia,
    courseInfo: {
      id: courseId,
      courseName,
      courseDescription,
      subtitle,
      categories,
      targetAudience,
      isExternal,
    },
    updateCourseInfo,
  } = React.useContext(CourseCreationContext);

  const [courseMediaState, setCourseMediaState] = React.useState({
    videoPreview,
    imagePreview,
  });

  const router = useRouter();

  React.useEffect(() => {
    setCourseMediaState({
      videoPreview,
      imagePreview,
    });
  }, [videoPreview, imagePreview]);

  const [uploadMedia, { isLoading, isError, isSuccess, data, error }] =
    useCreateNewCourse__UploadPreviewMediaMutation();

  const [playVideo, setPlayVideo] = React.useState(false);

  const notify = useNotify();

  const handleMediaUpload: React.FormEventHandler = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    const formData = new FormData();

    if (typeof courseMediaState.videoPreview === 'object')
      formData.append(
        'PreviewVideo',
        courseMediaState.videoPreview,
        courseMediaState.videoPreview.toString()
      );

    if (typeof courseMediaState.imagePreview === 'object')
      formData.append(
        'CoverImage',
        courseMediaState.imagePreview,
        courseMediaState.imagePreview.toString()
      );

    try {
      const data = await uploadMedia({ courseId, formData }).unwrap();

      if (data) {
        // update the value in the context
        updateCourseMedia({
          videoPreview: data.data.previewVideoUrl,
          imagePreview: data.data.imageUrl,
        });

        updateCourseInfo({
          lastSavePoint: data.data.lastSavePoint,
          id: courseId,
          courseName,
          subtitle,
          categories,
          courseDescription,
          targetAudience,
          isExternal,
        });

        notify({
          title: 'Media uploaded successfully',
          type: 'success',
          description: 'Your media has been uploaded successfully',
        });

        if (isExternal) {
          router.push(`./review?isExternal=true`);
        } else {
          router.push(`./review?mode=edit&courseId=${courseId}`);
        }
      } else {
        notify({
          title: 'Error',
          description: 'Error occured while uploading course media',
          type: 'error',
        });
      }
    } catch (err) {
      notify({
        title: 'Error',
        description: JSON.stringify(err),
        type: 'error',
      });
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleMediaUpload}>
        <div className="mb-6 md:w-[65%]">
          <p className="text-lg font-medium my-1">Add Course Image</p>
          <p className="text-muted text-base leading-7">
            You’ll be able to create, track and manage your courses on this
            dashboard. You can also track your payments and reviews.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row md:items-center md:w-[70%] gap-8 mb-10">
          <div className="bg-[#F6EFF4] md:w-[280px] md:h-[200px] w-full h-[200px] rounded flex items-center justify-center border overflow-clip">
            {courseMediaState.imagePreview ? (
              <Image
                src={
                  typeof courseMediaState.imagePreview === 'string'
                    ? courseMediaState.imagePreview
                    : URL.createObjectURL(courseMediaState.imagePreview)
                }
                alt="Image Preview"
                objectFit="cover"
                objectPosition={'top'}
                className="w-full h-full"
              />
            ) : (
              <svg
                width="70"
                height="70"
                viewBox="0 0 94 94"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M70.5 11.75H23.5C20.3837 11.75 17.395 12.9879 15.1915 15.1915C12.9879 17.395 11.75 20.3837 11.75 23.5V70.5C11.75 73.6163 12.9879 76.605 15.1915 78.8085C17.395 81.0121 20.3837 82.25 23.5 82.25H70.5C73.6163 82.25 76.605 81.0121 78.8085 78.8085C81.0121 76.605 82.25 73.6163 82.25 70.5V23.5C82.25 20.3837 81.0121 17.395 78.8085 15.1915C76.605 12.9879 73.6163 11.75 70.5 11.75ZM31.3333 27.4167C32.4953 27.4167 33.6312 27.7612 34.5973 28.4068C35.5634 29.0523 36.3165 29.9699 36.7611 31.0434C37.2058 32.1169 37.3221 33.2982 37.0954 34.4378C36.8688 35.5775 36.3092 36.6243 35.4876 37.4459C34.666 38.2676 33.6191 38.8271 32.4795 39.0538C31.3399 39.2805 30.1586 39.1641 29.0851 38.7195C28.0116 38.2748 27.094 37.5218 26.4485 36.5556C25.8029 35.5895 25.4583 34.4536 25.4583 33.2917C25.4583 31.7335 26.0773 30.2392 27.1791 29.1374C28.2809 28.0356 29.7752 27.4167 31.3333 27.4167ZM74.4167 69.8342C74.5032 70.9608 74.1395 72.0758 73.4053 72.9348C72.6712 73.7938 71.6264 74.3267 70.5 74.4167H23.5L53.1492 47.705C53.647 47.2509 54.2966 46.9991 54.9704 46.9991C55.6443 46.9991 56.2938 47.2509 56.7917 47.705L74.4167 65.2517V69.8342Z"
                  fill="#C5B8C9"
                />
              </svg>
            )}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.currentTarget.files && e.currentTarget.files.length > 0) {
                  setCourseMediaState({
                    ...courseMediaState,
                    imagePreview: e.currentTarget.files[0],
                  });
                } else {
                  setCourseMediaState({
                    ...courseMediaState,
                    imagePreview: imagePreview,
                  });
                }
              }}
              className="px-4 text-sm py-2 rounded border text-muted focus:border-app-dark-500"
            />
            <p className="text-sm text-muted my-2">
              Note about size restrictions for image goes here
            </p>
          </div>
        </div>

        <div className="mb-8 md:w-[65%]">
          <p className="text-lg font-medium my-1">Add Course Video Preview</p>
          <p className="text-muted text-base leading-7">
            You’ll be able to create, track and manage your courses on this
            dashboard. You can also track your payments and reviews.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row md:items-center md:w-[70%] gap-8 mb-8">
          <div className="bg-[#F6EFF4] md:w-[280px] md:h-[200px] w-full h-[200px] rounded flex items-center justify-center border overflow-clip flex-col">
            <svg
              width="70"
              height="70"
              viewBox="0 0 94 94"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M49.9375 23.5C54.8045 23.5 58.75 27.4455 58.75 32.3125V61.6875C58.75 66.5544 54.8045 70.5 49.9375 70.5H20.5625C15.6955 70.5 11.75 66.5544 11.75 61.6875V32.3125C11.75 27.4455 15.6955 23.5 20.5625 23.5H49.9375ZM77.8344 24.5445C79.6419 23.5107 81.8574 24.6351 82.1884 26.5883L82.2306 27.093L82.2477 66.9045C82.2487 68.987 80.1719 70.3526 78.3118 69.6701L77.8526 69.456L64.6268 61.8984V32.0994L77.8344 24.5445Z"
                fill="#C5B8C9"
              />
            </svg>
            {courseMediaState.videoPreview && (
              <button type="button" onClick={() => setPlayVideo(true)}>
                Play
              </button>
            )}
          </div>

          <div>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (e.currentTarget.files && e.currentTarget.files.length > 0) {
                  setCourseMediaState({
                    ...courseMediaState,
                    videoPreview: e.currentTarget.files[0],
                  });
                } else {
                  setCourseMediaState({
                    ...courseMediaState,
                    videoPreview,
                  });
                }
              }}
              className="px-4 text-sm py-2 rounded border text-muted focus:border-app-dark-500"
            />
            <p className="text-sm text-muted my-2">
              Note about size restrictions for image goes here
            </p>
          </div>
        </div>

        <Button
          loading={isLoading}
          className="text-app-pink border-2 border-app-pink px-8 py-2 rounded"
        >
          Next
        </Button>
      </form>

      {courseMediaState.videoPreview && (
        <Modal isOpen={playVideo} closeModal={() => setPlayVideo(false)}>
          <VideoPlayer
            className="rounded-lg md:w-[65vw] h-[70vh]"
            title={courseName}
            description={courseDescription}
            src={
              typeof courseMediaState.videoPreview === 'string'
                ? courseMediaState.videoPreview
                : URL.createObjectURL(courseMediaState.videoPreview)
            }
            posterUrl={
              typeof courseMediaState.imagePreview === 'string'
                ? courseMediaState.imagePreview
                : URL.createObjectURL(courseMediaState.imagePreview)
            }
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default CreateCourse_UploadImages;

CreateCourse_UploadImages.getLayout = function (page) {
  return <CreateCourseLayout title="Upload Media">{page}</CreateCourseLayout>;
};
