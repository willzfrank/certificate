import React from 'react';
import { formatCurrency } from 'app/utils/formatCurrency';
import Link from 'next/link';
import { Course, PreviewProps } from 'app/types';
import { Image } from '../elements';
import { useWishList } from 'app/hooks';

interface CourseProps {
  courses: Course[];
}

const UnCoursePreviewGrid = ({ courses }: CourseProps) => {
  const { wishlist, addToWishList, removeFromWishList } = useWishList();

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 m-0 gap-y-8">
      {courses.map((info) => (
        <CoursePreview
          add={addToWishList}
          remove={removeFromWishList}
          inWishList={wishlist[info.courseId]}
          {...info}
          key={info.courseId}
        />
      ))}
    </div>
  );
};

const UnCoursePreview = (props: PreviewProps) => {
  const instructorsList =
    props.instructors?.map((person) => person.name).join(', ') || '';

  const onClick = (courseId: string) => (e: React.SyntheticEvent) => {
    props.inWishList ? props.remove(courseId) : props.add(courseId);
  };

  return (
    <div className="" key={props.imageUrl}>
      <Link href={`/course/${props.slugName}/preview`}>
        <a>
          <div className="relative rounded-md overflow-hidden aspect-[8/5] md:aspect-[12/10]">
            <Image
              src={props.imageUrl}
              alt="Picture of the course"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="h-full"
            />
          </div>
        </a>
      </Link>

      <div className="grid grid-cols-[minmax(0,1fr),50px] items-center mt-4 ">
        <Link href={`/course/${props.slugName}/preview`}>
          <a>
            <div className="font-medium text-base ">{props.title}</div>
          </a>
        </Link>
        <button
          type="button"
          onClick={onClick(props.courseId)}
          className="flex justify-end items-center"
        >
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
          >
            <rect width="32" height="32" fill="#EAEAEA" rx="16"></rect>
            <path
              stroke={props.inWishList ? '#B61046' : '#545454'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              fill={props.inWishList ? '#B61046' : 'none'}
              d="M22.766 10.234a4.211 4.211 0 00-5.955 0l-.811.811-.812-.811a4.211 4.211 0 00-5.955 5.955l.812.811L16 22.955 21.955 17l.811-.811a4.21 4.21 0 000-5.955v0z"
            ></path>
          </svg>
        </button>
      </div>
      <Link href={`/course/${props.slugName}/preview`}>
        <a>
          <div className="text-muted font-normal text-base">
            {instructorsList}
          </div>
          <div className="font-medium text-base mt-1">
            {props.maximumPrice === 0 && props.minumumPrice === 0 ? (
              <p>Free</p>
            ) : (
              <>
                {/* {formatCurrency(props.minumumPrice)} -{' '} */}
                {formatCurrency(props.maximumPrice)}
              </>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};

const CoursePreviewGrid = React.memo(UnCoursePreviewGrid);

const CoursePreview = React.memo(UnCoursePreview);

export { CoursePreviewGrid, CoursePreview };
