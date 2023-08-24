import { Image, Modal, VideoPlayer } from 'app/components/elements';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import Slider from 'react-slick';
import { Course } from 'app/types';
import Link from 'next/link';

const CategorizedCourses = ({ courses }: { courses: Array<Course> }) => {
  const sliderRef = useRef<Slider | null>();

  const [activeCarouselItemIndex, setActiveCarouselItemIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const forwardCarousel = () => {
    sliderRef.current?.slickNext();
  };

  const backwardCarousel = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
          slidesToShow: 1.2,
        },
      },
    ],
  };

  const handleOpenModal = (courseId: string) => {
    setActiveCarouselItemIndex(
      courses.findIndex((course) => course.courseId === courseId)
    );
    setModalOpen(true);
  };

  return (
    <div className="py-10 md:py-28">
      <div className="p-20 mb-4 px-8">
        <h1 className="text-[28px] leading-10 text-center font-normal hidden md:block">
          Over 500+ hours of course content taught by powerfully talented
          individuals
        </h1>

        <h1 className="text-[22px] leading-8 text-center font-normal md:hidden">
          A wide variety of courses from powerfully talented <br /> individuals
        </h1>
      </div>
      {/* <div className="categoryTitles mb-10">
        <div className="flex space-x-10 justify-center">
          <button className="font-semibold" role="button">
            All Categories
          </button>
          <button role="button" className="text-muted">
            Entertainment
          </button>
          <button role="button" className="text-muted">
            Business
          </button>
          <button role="button" className="text-muted">
            Technology
          </button>
          <button role="button" className="text-muted">
            Food
          </button>
        </div>
      </div> */}
      <div className="md:mx-14 mx-6">
        {/* {courses.length > 1 ? ( */}
        <Slider {...settings} ref={(el) => (sliderRef.current = el)}>
          {courses.map((course) => (
            <Course
              {...course}
              key={course.courseId}
              openModal={handleOpenModal}
            />
          ))}
        </Slider>
        {/* ) : null */}
        {/* <div className="max-w-[1000px] mx-auto"> */}
        {/* <Course {...courses[0]} openModal={handleOpenModal} /> */}
        {/* </div> */}
        {/* } */}
      </div>
      {courses.length > 1 ? (
        <div className="flex gap-2 items-center justify-end mt-8 md:px-14 px-6">
          <button
            disabled={activeCarouselItemIndex === 1}
            onClick={backwardCarousel}
            className="group w-[35px] h-[40px] border-2 disabled:border-app-gray-100 border-app-dark grid place-items-center rounded-[3.5px]"
          >
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.25 18.0407L7.9202 11.755L14.25 5.46924"
                stroke={activeCarouselItemIndex === 1 ? '#717172' : '#130F26'}
                strokeWidth="1.49123"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            disabled={activeCarouselItemIndex === courses.length}
            onClick={forwardCarousel}
            className="group w-[35px] h-[40px] border-2 disabled:border-app-gray-100 border-app-dark grid place-items-center rounded-[3.5px]"
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.65381 18.0407L14.9836 11.755L8.65381 5.46924"
                stroke={
                  activeCarouselItemIndex === courses.length
                    ? '#717172'
                    : '#130F26'
                }
                strokeWidth="1.49123"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ) : null}
      <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
          <VideoPlayer
            title={courses[activeCarouselItemIndex]?.title}
            src={courses[activeCarouselItemIndex]?.videoUrl}
            posterUrl={courses[activeCarouselItemIndex]?.imageUrl}
            className="h-[70vh] w-[90vw] lg:w-[60vw]"
          />
      </Modal>
    </div>
  );
};

const Course = ({
  imageUrl,
  title,
  instructors,
  openModal,
  courseId,
}: Course & { openModal: (courseId: string) => void }) => {
  console.log({ imageUrl, title, instructors, openModal, courseId });

  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      className={`space-y-4 min-w-[20vw]`}
    >
      <div className="h-[340px] rounded-md border-2 border-app-gray-400 overflow-clip relative">
        <Image
          src={
            imageUrl.toLowerCase() === 'testimageurl'
              ? '/images/mqdefault_6s.png'
              : imageUrl
          }
          alt={title}
          className="h-full w-full !absolute pointer-events-none"
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 w-[300px] flex items-center space-x-3 bg-gray-700 bg-opacity-50 p-4">
          <div className="w-8 h-8 rounded-full bg-[#FEFCF2] grid place-items-center">
            <svg
              width="13"
              height="15"
              viewBox="0 0 19 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 9.26795C19.3333 10.0377 19.3333 11.9623 18 12.7321L3 21.3923C1.66667 22.1621 0 21.1999 0 19.6603V2.33975C0 0.800145 1.66667 -0.162105 3 0.607696L18 9.26795Z"
                fill="#130F26"
                fillOpacity="0.5"
              />
            </svg>
          </div>
          <button className="text-white" onClick={() => openModal(courseId)}>
            Play Preview
          </button>
        </div>
      </div>
      <Link href={`/course/${courseId}/preview`}>
        <div className="cursor-pointer">
          <h4 className="capitalize font-bold text-xl">{title}</h4>
          <p className="capitalize text-muted font-normal mt-1">
            {instructors.map(({ name }) => name).join(', ')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategorizedCourses;
