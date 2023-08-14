import Slider from 'react-slick'
import { CoursePreview } from 'app/components/cards'
import type { PreviewProps } from 'app/types'
import { Loader } from 'app/components'

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  initialSlide: 0,
  arrows: true,
  drag: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1.6,
      },
    },
  ],
}

const CarouselContainer = ({
  title,
  courses,
  className,
  isLoading = false,
}: {
  title: string
  courses: PreviewProps[]
  className?: string
  isLoading?: boolean
}) => {
  return (
    <div className={'px-6 my-20  md:px-14 '.concat(className || '')}>
      <p className="text-xl mb-6 font-medium">{title}</p>
      {isLoading ? (
        <div className="w-full h-[300px] items-center justify-center flex">
          <Loader mainColor="red" className="w-24 h-24" />
        </div>
      ) : (
        <Slider {...sliderSettings}>
          {courses?.slice(0, 10).map((course, i) => (
            <CoursePreview {...course} key={course.title} />
          ))}
        </Slider>
      )}
    </div>
  )
}

export default CarouselContainer
