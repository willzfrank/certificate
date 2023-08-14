import React from "react";
import { formatCurrency } from "app/utils";

interface PriceCardProps {
  packageTitle: string;
  price: number | string;
  features: string[];
}

const PriceCards = ({ packageTitle, price, features }: PriceCardProps) => {
  return (
    <div className="border border-[#D6064A]  md:w-[420px] w-full  mb-6 rounded-md md:ml-6 hover:bg-[#D6064A] hover:text-white group">
      <div className="divide-y divide-solid divide-[#D6064A] group-hover:divide-white">
        <div className="font-medium p-5 md:p-10 text-base text-transparent bg-clip-text bg-gradient-to-br from-[#D6064A] via-[#EF4D41] to-[#FD8C46] group-hover:from-white group-hover:via-white group-hover:to-white text-center">
          {packageTitle} package
        </div>
        <div className="md:p-10 p-5">
          <div className="font-medium text-3xl mt-[32px] text-center">
            {formatCurrency(price)}
          </div>
          <div className="font-normal text-base mt-8 pb-24 md:pb-0">
            <div>What you get:</div>
            <ul className="mt-5 space-y-3 ">
              {features.map((info, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[40px_minmax(0,1fr)] items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="13"
                    fill="none"
                    viewBox="0 0 18 13"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M1 6.5l5.335 5.333L17 1.167"
                    ></path>
                  </svg>
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PriceCards };
