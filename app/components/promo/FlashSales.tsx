import Image from "next/image";
import React from "react";
import logo from "public/promo/caption.png";
import logo2 from "public/promo/Star 2.png";

const FlashSales: React.FC = () => {
  return (
    <div className="w-full flex  flex-col  items-center justify-center mt-3">
      <div
        className="uppercase flex items-center md:gap-2 gap-1 bg-[#352E2E] px-10 text-white text-[24px] md:text-[38px] flex-wrap justify-center font-[400]"
        style={{
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          letterSpacing: "0.63px",
        }}
      >
        {/* <span className="  px-[10px]  relative flex flex-col items-center justify-center md:w-[600px] w-full">
          <Image
            src={logo}
            alt="logo"
            width={500}
            height={25}
            priority
            quality={100}
            objectFit="cover"
            className="my-2"
          />
        </span> */}
        <p className="">urgent</p>

        <p className="text-white md:text-[42px] text-[24px] font-[700]">
          &#8358;2k
        </p>
        <p className="text-[#D80049] font-[600] ">black friday</p>
        <p>sales!</p>
      </div>
      <div className="md:text-xl text-base mt-[2px] flex items-center gap-1.5 flex-wrap font-[500] w-full  justify-center ">
        <p> Enjoy up to </p>
        <span className="relative  top-1">
          <Image
            src={logo2}
            alt="logo"
            priority
            width={50}
            height={50}
            quality={100}
            objectFit="cover"
          />
          <p className="absolute top-3  text-white font-[700] text-lg right-1.5">
            80%
          </p>
        </span>
        <p> discount</p>
        <p>on courses till November 30,2023</p>
      </div>
    </div>
  );
};

export default FlashSales;
