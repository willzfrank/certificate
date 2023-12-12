import React from 'react'
import { formatCurrency } from 'app/utils/formatCurrency'
import Link from 'next/link'
import { Course, PreviewProps } from 'app/types'
import { Image } from '../elements'
import { useWishList } from 'app/hooks'
import comingSoon from '../../../public/images/coming_soon.png'

interface CourseProps {
  courses: Course[]
  isOpenSidebar?: boolean
}

const UnCoursePreviewGrid = ({ courses, isOpenSidebar }: CourseProps) => {
  const { wishlist, addToWishList, removeFromWishList } = useWishList()

  return (
    <div
      className={`grid ${
        isOpenSidebar ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
      } md:grid-cols-2 grid-cols-1 gap-4 m-0 gap-y-8`}
    >
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
  )
}

const UnCoursePreview = (props: PreviewProps) => {
  const instructorsList =
    props.instructors?.map((person) => person.name).join(', ') || ''

  const onClick = (courseId: string) => (e: React.SyntheticEvent) => {
    props.inWishList ? props.remove(courseId) : props.add(courseId)
  }

  type SlugName =
    | 'language-of-banking-0380'
    | 'language-of-banking-7961'
    | '03804b6c-1e6f-4f03-91e8-502ecd7e3333'
    | '7961c48d-5654-49be-9679-9b9c220ab36d'
    | 'b31c7954-faa3-4adb-9338-d19cda985861'
    | 'job-interview-masterclass-b31c'
    | 'c23638f5-6be7-4662-91aa-450a90c2959a'
    | 'test-pdf-c236'

  const slugNameToHrefMap: Record<SlugName, string> = {
    'language-of-banking-0380': '/pathways/become-a-banker/overview',
    'language-of-banking-7961': '/pathways/become-a-banker/overview',
    '03804b6c-1e6f-4f03-91e8-502ecd7e3333':
      '/pathways/become-a-banker/overview',
    '7961c48d-5654-49be-9679-9b9c220ab36d':
      '/pathways/become-a-banker/overview',
    'b31c7954-faa3-4adb-9338-d19cda985861':
      '/course/b31c7954-faa3-4adb-9338-d19cda985861/JobInterviewMasterClass',
    'job-interview-masterclass-b31c':
      '/course/job-interview-masterclass-b31c/JobInterviewMasterClass',
    'c23638f5-6be7-4662-91aa-450a90c2959a':
      '/course/c23638f5-6be7-4662-91aa-450a90c2959a/JobInterviewMasterClass',
    'test-pdf-c236': '/course/test-pdf-c236/JobInterviewMasterClass',
  }

  const comingSoonId = 'c23638f5-6be7-4662-91aa-450a90c2959a'

  const slugName = props.slugName as SlugName
  const href = slugNameToHrefMap[slugName] || `/course/${slugName}/preview`

  return (
    <div className="relative" key={props.imageUrl}>
      {props.courseId == comingSoonId && (
        <Image
          src="/images/coming_soon.png"
          alt=""
          width="0"
          height="0"
          sizes="100vw"
          className="w-[140px] h-[250px] absolute top-[-40px] z-10 left-[-19.8px]"
        />
      )}
      <Link href={href}>
        <a>
          <div
            className={`relative ${
              props.courseId == comingSoonId ? 'mt-[-250px]' : 'mt-0'
            } rounded-md overflow-hidden aspect-[8/5] md:aspect-[12/10]`}
          >
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
        <Link href={href}>
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
      <Link href={href}>
        <a>
          <div className="text-muted font-normal text-base">
            {instructorsList}
          </div>
          <div className="font-medium text-base mt-1">
            {props.setPricing === 0 ? (
              <p>Free</p>
            ) : (
              // : props.courseId === '563472fa-9f47-43b6-b640-6ce14f53656c' ||
              //   props.courseId === '12cb7e57-ad78-400b-8069-324939ec6e0b' ||
              //   props.courseId === '1cb7dc8a-3e57-48b2-bf9e-f1db481a25b4' ? (
              //   <div className="flex items-center gap-1">
              //     <>{formatCurrency(props.setPricing)}</>
              //     <p className="text-center h-full relative -top-[2px] font-[600]  text-[9px] ">
              //       .
              //     </p>
              //     <p
              //       className="font-[600] "
              //       style={{
              //         textDecoration: 'line-through',
              //       }}
              //     >
              //       N10,000
              //     </p>
              //   </div>
              // ) : props.courseId === '921e02f9-efe3-4ced-af6d-c086812bde36' ||
              //   props.courseId === '3e0ace38-a0fa-4e5b-84cc-03b440c897bd' ||
              //   props.courseId === '4a59b479-5135-4250-8adf-7fb1a8ee4e0b' ||
              //   props.courseId === 'dea1fd6b-f336-474a-82e4-f3f5ae087ec9' ? (
              //   <div className="flex items-center gap-1">
              //     <>{formatCurrency(props.setPricing)}</>
              //     <p className="text-center h-full relative -top-[2px] font-[600]  text-[9px] ">
              //       .
              //     </p>
              //     <p
              //       className="font-[600] "
              //       style={{
              //         textDecoration: 'line-through',
              //       }}
              //     >
              //       N5,000
              //     </p>
              //   </div>
              // )

              <div className="flex items-center gap-2">
                <>{formatCurrency(props.setPricing)}</>{' '}
                {/* No line-through element for prices greater than or equal to 3000 */}
              </div>
            )}
          </div>
        </a>
      </Link>
    </div>
  )
}

const CoursePreviewGrid = React.memo(UnCoursePreviewGrid)

const CoursePreview = React.memo(UnCoursePreview)

export { CoursePreviewGrid, CoursePreview }
