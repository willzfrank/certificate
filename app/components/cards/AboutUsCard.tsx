import React, { ReactNode } from "react";
import Image from "next/image";
interface CardProps {
  icon: ReactNode;
  img: string;
}

const AboutUsCard = ({ icon, img }: CardProps) => {
  return (
    <div className="relative lg:w-[340px] w-[301px] lg:h-[348px] h-[329px] border-2 border-[#EF4D41]">
      <Image
        src={img}
        alt="Picture of the author"
        objectFit="contain"
        objectPosition="center"
        layout="fill"
      />
      <div className="absolute -bottom-6 -right-7 z-40">{icon}</div>
    </div>
  );
};

export { AboutUsCard };
