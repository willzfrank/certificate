import * as React from 'react'
import { SingleCourseDetailsResponse } from 'app/types'

const CourseDescription = (course: SingleCourseDetailsResponse) => {
  return (
    <div className="md:px-14 md:py-0 pb-0 px-6 py-12">
      <div className="md:w-[57%]">
        <div className="space-y-5 text-[#2F2D37]">
          <p className="font-medium text-xl">About The Course</p>
          <p className="leading-7 text-muted">{course.description}</p>
        </div>

        <div className="mt-10 space-y-5 text-[#2F2D37]">
          <p className="font-medium text-xl">Who is this course for?</p>
          <p className="leading-7 text-muted">{course.intendedUsers}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseDescription
