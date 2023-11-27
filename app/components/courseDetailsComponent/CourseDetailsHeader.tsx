import { ExternalCourse } from "app/types";
import React, { useEffect, useRef, useState } from "react";
import { useAddSubscriptionMutation } from "app/api/subscriptionApi";
import { useCookies } from "react-cookie";
import { TOKEN_KEY, USER_TYPE_KEY } from "app/constants";
import { useAppSelector } from "app/hooks";

interface IAboutCourseDetails extends ExternalCourse {
  setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseDetailsHeader = (props: IAboutCourseDetails) => {
  const [
    addSubscription,
    { isLoading: isCheckingSubscription, error, isError, isSuccess },
  ] = useAddSubscriptionMutation();
  const [cookie] = useCookies([TOKEN_KEY, USER_TYPE_KEY]);
  const user = useAppSelector((store) => store.user);

  function setUpPayment() {
    if (!Boolean(user.id || cookie[TOKEN_KEY])) {
      console.log("User is not logged in");
      props.setShowAuthModal(true);
      return;
    }
    props.setAccessModal(true);
  }

  // COUNTDOWN LOGIC

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const countdownDate = new Date("December 1, 2023 00:00:00").getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      if (distance < 0) {
        // stop the timer
        clearInterval(interval.current!);
      } else {
        // update timer
        setTimerDays(String(days));
        setTimerHours(String(hours));
        setTimerMinutes(String(minutes));
        setTimerSeconds(String(seconds));
      }
    }, 1000);
  };

  // componentDidMount
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current!);
    };
  }, []);

  const countDown = {
    days: timerDays,
    // hours: timerHours,
    // minutes: timerMinutes,
  };

  return (
    <div className="flex items-center justify-between space-y-5 lg:flex-row flex-col">
      <div className="flex flex-col py-10">
        {/* main div */}
        <div className="w-full md:w-[472px] h-[57px] justify-start items-center gap-6 inline-flex">
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.3334 1.83325L23.6534 5.49992L20 7.16659L23.6534 8.84659L25.3334 12.4999L27 8.84659L30.6667 7.16659L27 5.49992M12 5.83325L8.66671 13.1666L1.33337 16.4999L8.66671 19.8333L12 27.1666L15.3334 19.8333L22.6667 16.4999L15.3334 13.1666M25.3334 20.4999L23.6534 24.1533L20 25.8333L23.6534 27.4999L25.3334 31.1666L27 27.4999L30.6667 25.8333L27 24.1533"
              fill="#DC1448"
            />
          </svg>
          <div className="flex items-start flex-col w-full justify-start">
            {/* flex div here */}
            <div className="flex-col justify-start items-start gap-[9px] inline-flex">
              <div className="text-neutral-700 text-lg w-max md:text-2xl font-medium font-['Inter']">
                {props?.name}
              </div>
              <div className="justify-start items-center gap-1.5 inline-flex">
                <div className="text-neutral-400 text-xs md:text-lg font-medium font-['Inter']">
                  Created by {props?.instructors[0]?.name}
                </div>
                <div className="w-[3px] h-[3px] bg-zinc-500 rounded-full" />
                <div className="px-4 py-px bg-gradient-to-r from-green-200 to-green-300 rounded-2xl border border-green-400 justify-center items-center gap-px flex">
                  <div className="text-green-900 text-xs font-medium font-['Inter']">
                    Pro
                  </div>
                </div>
              </div>
            </div>
            <div className="h-5 justify-start items-start gap-2 md:pt-0 pt-2  inline-flex">
              <div className="justify-start items-center gap-2 flex">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 4.58325C10.7735 4.58325 11.5154 4.89054 12.0624 5.43752C12.6094 5.98451 12.9167 6.72637 12.9167 7.49992C12.9167 8.27347 12.6094 9.01533 12.0624 9.56231C11.5154 10.1093 10.7735 10.4166 10 10.4166C9.22645 10.4166 8.48459 10.1093 7.93761 9.56231C7.39062 9.01533 7.08333 8.27347 7.08333 7.49992C7.08333 6.72637 7.39062 5.98451 7.93761 5.43752C8.48459 4.89054 9.22645 4.58325 10 4.58325ZM4.16667 6.66659C4.63333 6.66659 5.06667 6.79159 5.44167 7.01659C5.31667 8.20825 5.66667 9.39159 6.38333 10.3166C5.96667 11.1166 5.13333 11.6666 4.16667 11.6666C3.50363 11.6666 2.86774 11.4032 2.3989 10.9344C1.93006 10.4655 1.66667 9.82963 1.66667 9.16658C1.66667 8.50354 1.93006 7.86766 2.3989 7.39882C2.86774 6.92998 3.50363 6.66659 4.16667 6.66659ZM15.8333 6.66659C16.4964 6.66659 17.1323 6.92998 17.6011 7.39882C18.0699 7.86766 18.3333 8.50354 18.3333 9.16658C18.3333 9.82963 18.0699 10.4655 17.6011 10.9344C17.1323 11.4032 16.4964 11.6666 15.8333 11.6666C14.8667 11.6666 14.0333 11.1166 13.6167 10.3166C14.3333 9.39159 14.6833 8.20825 14.5583 7.01659C14.9333 6.79159 15.3667 6.66659 15.8333 6.66659ZM4.58333 15.2083C4.58333 13.4833 7.00833 12.0833 10 12.0833C12.9917 12.0833 15.4167 13.4833 15.4167 15.2083V16.6666H4.58333V15.2083ZM0 16.6666V15.4166C0 14.2583 1.575 13.2833 3.70833 12.9999C3.21667 13.5666 2.91667 14.3499 2.91667 15.2083V16.6666H0ZM20 16.6666H17.0833V15.2083C17.0833 14.3499 16.7833 13.5666 16.2917 12.9999C18.425 13.2833 20 14.2583 20 15.4166V16.6666Z"
                    fill="#404040"
                  />
                </svg>
                <div className="text-neutral-700 text-sm font-medium font-['Inter']">
                  100 students
                </div>
              </div>
              <div className="justify-start items-center gap-2 flex">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99996 14.3917L15.15 17.5001L13.7833 11.6417L18.3333 7.70008L12.3416 7.18341L9.99996 1.66675L7.65829 7.18341L1.66663 7.70008L6.20829 11.6417L4.84996 17.5001L9.99996 14.3917Z"
                    fill="#FFD500"
                  />
                </svg>
                <div className="text-neutral-700 text-sm font-medium font-['Inter']">
                  {(
                    props.ratings / Math.max(props.ratingsCount, 1)
                  ).toPrecision(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STOP WATCH FLEX END */}

      <div className="flex flex-col space-y-4 w-full md:w-max items-center justify-center">
        <div className="text-neutral-600 text-xs font-medium font-['Inter']">
          THIS COURSE WILL BE AVAILABLE IN
        </div>
        <div className="w-[204px] h-[55px] justify-center items-center gap-[9px] inline-flex">
          {Object.entries(countDown).map(([unit, value]) => (
            <div
              key={unit}
              className="w-max h-[57px] px-2 flex items-center justify-center flex-col bg-white rounded-lg shadow"
            >
              <div className=" text-neutral-700 text-[32px] font-medium font-['Inter'] leading-[44.80px]">
                {value}
              </div>
              <div className=" text-neutral-700 text-[10px] font-medium font-['Inter'] leading-[14px]">
                {unit.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0833 1.08325L10.3483 2.68742L8.74998 3.41659L10.3483 4.15159L11.0833 5.74992L11.8125 4.15159L13.4166 3.41659L11.8125 2.68742M5.24998 2.83325L3.79165 6.04159L0.583313 7.49992L3.79165 8.95825L5.24998 12.1666L6.70831 8.95825L9.91665 7.49992L6.70831 6.04159M11.0833 9.24992L10.3483 10.8483L8.74998 11.5833L10.3483 12.3124L11.0833 13.9166L11.8125 12.3124L13.4166 11.5833L11.8125 10.8483"
              fill="#DC1448"
            />
          </svg>

          <div className="text-red-500 text-sm font-medium font-['Inter']">
            Pre-Launch Disc. 50% off{" "}
          </div>
        </div>
        <button
          className="w-[325px] lg:w-[199px] h-[42px] lg:h-[33px] px-3 py-2  cursor-pointer rounded border justify-center lg:justify-start items-center gap-2 inline-flex hover:shadow hover:border-rose-600 border-rose-600"
          onClick={setUpPayment}
        >
          <div className="flex flex-row gap-1">
            <span className="text-neutral-600 w-max text-sm font-medium font-['Inter']">
              Pay now N5,000{" "}
            </span>
            <span className="text-red-500 text-sm font-medium font-['Inter'] line-through">
              (N10,000)
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsHeader;
