import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const KeyOutcomes = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768, // Small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-zinc-100 p-5">
      <Slider {...settings}>
        <div className=" p-3  h-[200px] w-full border ml-1 border-black border-opacity-25 bg-white shadow ">
          <p className=" leading-5 text-xl pt-1">
            Key components and functions of the banking industry, including its
            structure and regulations.
          </p>
        </div>
        <div className=" p-3 h-[200px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-3 col-end-5 ">
          <p className=" leading-5 text-xl pt-1">
            Benefits of digital banking and its impact on the industry, as well
            as data management.{' '}
          </p>
        </div>
        <div className=" p-3 h-[200px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-5 col-end-7 ">
          <p className=" leading-5 text-xl pt-1">
            The use of office productivity tools such as Microsoft Excel, Word,
            and PowerPoint, for effective business writing and oral
            communication skills.{' '}
          </p>
        </div>
        <div className=" p-3 h-[200px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-1 col-end-3 ">
          <p className=" leading-5 text-xl pt-1">
            The application of essential leadership skills and traits required
            to succeed in the banking industry, including emotional
            intelligence, problem-solving and decision-making.
          </p>
        </div>
        <div className=" p-3 h-[200px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-3 col-end-5 ">
          <p className=" leading-5 text-xl pt-1">
            How to prepare effective communications both orally and in writing
            for professional contexts such as job interviews and presentations
            to key stakeholders.
          </p>
        </div>
        <div className=" p-3 h-[200px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-5 col-end-7 ">
          <p className=" leading-5 text-xl pt-1">
            How digital and technology trends are impacting the future of work
            and business, and how to develop a digital marketing strategy that
            aligns with business goals and objectives.{' '}
          </p>
        </div>
        <div className=" p-3 h-[200px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-3 col-end-5">
          <p className=" leading-5 text-xl pt-1">
            The fundamentals of data analytics, and how to collect, clean and
            analyze data to ensure data accuracy and completeness.
          </p>
        </div>
      </Slider>
    </div>
  );
};

export default KeyOutcomes;
