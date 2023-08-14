import * as React from 'react';
import {
  useGetSingleCoursePreviewQuery,
  useGetCourseReviewsQuery,
} from 'app/api/courseApi';
import { StarRating } from 'app/components/elements';
import { useWatchSearchParams, useAppSelector } from 'app/hooks';
import { CourseReview } from 'app/types';
import { getTimeDifference } from 'app/utils';

const CourseReview = () => {
  const courseId = useWatchSearchParams('courseId') as string;
  const { token } = useAppSelector((store) => store.user);

  const { data } = useGetSingleCoursePreviewQuery({ courseId, token });

  // const intersectionObserverElement = React.useRef<HTMLDivElement>(null)

  // React.useEffect(() => {

  //   const intersectionObserverOptions: IntersectionObserverInit = {
  //     root: document.body,
  //     rootMargin: '0px',
  //     threshold: 0.2,
  //   }

  //   const intersectionObserver = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         console.log('going in')
  //         console.log(entry.target)
  //         console.log(entry.intersectionRatio)
  //       } else {
  //         console.log('going out')
  //       }
  //     })
  //   }, intersectionObserverOptions)

  //   intersectionObserver.observe(intersectionObserverElement.current!)
  //   console.log(intersectionObserver)
  //   return () => intersectionObserver.disconnect()
  // }, [])

  const { data: reviews } = useGetCourseReviewsQuery({
    courseId,
    perPage: 20,
    page: 1,
  });

  return (
    <div className="md:px-14 px-6" /* ref={intersectionObserverElement} */>
      <p className="font-medium text-xl md:mb-8">Reviews</p>

      {data?.ratingsCount === 0 ? (
        <h1 className="text-lg">No reviews</h1>
      ) : (
        <React.Fragment>
          <div className="my-4 space-y-4 mb-8">
            <StarRating
              over={5}
              rating={
                data
                  ? Number((data.ratings / data.ratingsCount).toPrecision(2))
                  : 0
              }
              starClassName="scale-130"
              containerClassName="!gap-2"
            />
            <div className="flex gap-2 items-end">
              <p className="md:text-4xl text-3xl">
                {data ? Number(data.ratings / data.ratingsCount).toFixed(1) : 0}
                /5.0
              </p>
              <p className="text-muted text-lg">
                stars ({data?.ratingsCount} review
                {data?.ratingsCount === 1 ? '' : 's'})
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:w-[65%] my-10 relative">
            {reviews?.data.pagedList.map((review) => (
              <Review key={review.id} {...review} />
            ))}

            {reviews && reviews.data.pagedList.length > 4 && (
              <div className="h-[200px] w-full absolute bottom-0 bg-gradient-to-b from-[#ffffff87] to-white flex items-end justify-center">
                <button className="px-14 py-3 border-2 border-[#55565C] rounded-lg bg-white">
                  Show more
                </button>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const Review = (props: CourseReview) => {
  const splitName = props.studentName.split(' ');
  const userInitials = splitName[0][0] + splitName[1][0];

  return (
    <div className="md:border border-[#EAEAEA] md:p-6 rounded-lg mb-4">
      <div className="flex md:gap-6 gap-4">
        <div className="w-12 h-12 rounded-full bg-app-dark text-white grid place-items-center">
          <p className="text-xl font-medium leading-[30px] tracking-[0.02em]">
            {userInitials}
          </p>
        </div>

        <div className="space-y-[13px] flex-1">
          <div className="space-y-2">
            <p>{props.studentName}</p>
            <div className="flex gap-2">
              <StarRating rating={props.score} over={5} />
              <p className="text-muted">
                {getTimeDifference(props.dateCreated)}
              </p>
            </div>
          </div>
          <p className="text-muted leading-[160%] tracking-[0.01em]">
            {props.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
