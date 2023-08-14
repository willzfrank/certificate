import * as React from "react";
import {
  Image,
  CarouselContainer,
  Modal,
  VideoPlayer,
  Loader,
} from "app/components";
import { Course, PreviewProps, SingleCourseDetailsResponse } from "app/types";
import courseApi, { useGetInstructorCourseQuery } from "app/api/courseApi";
import { useWishList } from "app/hooks";

type CourseInstructorsProps = {
  instructors: SingleCourseDetailsResponse["instructors"];
  currentCourseId: string;
};

const CourseInstructorDetails = ({
  instructors,
  currentCourseId,
}: CourseInstructorsProps) => {
  const { isLoading, data, isSuccess, isError } = useGetInstructorCourseQuery({
    instructorId: instructors[0].id,
    exemptedCourseId: currentCourseId,
    page: 1,
    perPage: 100,
  });

  const { wishlist, addToWishList, removeFromWishList } = useWishList();

  return (
    <>
      <div className="md:p-14 pb-0 px-6">
        <p className="font-medium text-xl md:mb-8 mb-6">
          Instructor{instructors.length > 1 ? "(s)" : ""} Details
        </p>

        <div className="space-y-6">
          {instructors.map((instructor, i) => (
            <div
              className="md:grid items-center gap-4 md:grid-cols-[minmax(50px,100px)_minmax(0,1fr)] max-w-3xl"
              key={instructor.id}
            >
              <div className="aspect-square overflow-hidden rounded-full bg-app-dark-500 flex items-center justify-center w-24 md:w-auto">
                {!instructor.profilePictureUrl ? (
                  <p className="text-white text-5xl">
                    {instructor.name.split(" ")[0].charAt(0).toUpperCase() +
                      instructor.name.split(" ")[1].charAt(0).toUpperCase()}
                  </p>
                ) : (
                  <Image
                    src="/images/donjazzy.png"
                    alt="Don Jazzy"
                    className="rounded-full aspect-square w-full bg-[#D3D4DB]"
                    objectFit="cover"
                    objectPosition={"top"}
                  />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <p>{instructor.name}</p>

                <p className="leading-7 text-muted">{instructor?.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CarouselContainer
        isLoading={isLoading}
        className="my-14"
        title={"Other Courses from the Instructor"}
        courses={
          data?.data.pagedList.map((course) => ({
            ...course,
            add: addToWishList,
            remove: removeFromWishList,
            inWishList: wishlist[course.courseId],
          })) as PreviewProps[]
        }
      />
    </>
  );
};

export default CourseInstructorDetails;
