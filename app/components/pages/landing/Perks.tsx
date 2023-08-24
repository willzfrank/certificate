import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Perks = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-zinc-100">
      <Slider {...settings}>
        <div className=" p-3  h-[150px] w-full border ml-1 border-black border-opacity-25 bg-white shadow ">
          <p className=" text-rose-600 text-xl font-bold jost">
            Immersive Learning
          </p>
          <p className=" leading-5 text-xl pt-1">
            The course is designed to offer a practical and immersive learning
            experience that caters to your learning needs.
          </p>
        </div>
        <div className=" p-3 h-[150px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-3 col-end-5 ">
          <p className=" text-rose-600 text-xl font-bold">Flexibility</p>
          <p className=" leading-5 text-xl pt-1">
            100% virtual. Study at your own pace.
          </p>
        </div>
        <div className=" p-3 h-[150px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-5 col-end-7 ">
          <p className=" text-rose-600 text-xl font-bold">Expert-led Lessons</p>
          <p className=" leading-5 text-xl pt-1">
            Lessons are curated by leading banking experts.
          </p>
        </div>
        <div className=" p-3 h-[150px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-1 col-end-3 ">
          <p className=" text-rose-600 text-xl font-bold">Mentorship</p>
          <p className=" leading-5 text-xl pt-1">
            Get the opportunity to connect with banking professionals and gain
            exclusive access to in-depth career training.
          </p>
        </div>
        <div className=" p-3 h-[150px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-3 col-end-5 ">
          <p className=" text-rose-600 text-xl font-bold">Community</p>
          <p className=" leading-5 text-xl pt-1">
            Become part of a supportive community where you learn, share ideas,
            network and collaborate with like-minds.
          </p>
        </div>
        <div className=" p-3 h-[150px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-5 col-end-7 ">
          <p className=" text-rose-600 text-xl font-bold">Get Certified</p>
          <p className=" leading-5 text-xl pt-1">
            Kickoff your banking career with a certificate that proves your
            eligibility to potential employers.
          </p>
        </div>
        <div className=" p-3 h-[150px] w-full border ml-1 border-black border-opacity-25 bg-white shadow col-start-3 col-end-5">
          <p className=" text-rose-600 text-xl font-bold">Get Employed</p>
          <p className=" leading-5 text-xl pt-1">
            Score at least 70% and stand a chance to be selected from our job
            pool, to gain employment from top financial institutions
          </p>
        </div>
      </Slider>
    </div>
  );
};

export default Perks;
