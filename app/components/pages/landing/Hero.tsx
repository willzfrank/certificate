import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useRef, FormEvent } from "react";
import { Image } from "../../elements";
import { useRouter } from "next/router";
import FlashSales from "app/components/promo/FlashSales";

const Hero = () => {
  const dragConstraintsRef = useRef(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const firstDonJazzy = useRef<HTMLDivElement>(null);
  const firstDonJazzyInitialXPosition = useRef(0);
  const translateX = useMotionValue(0);
  const router = useRouter();

  const secondDonJazzy = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const animationConfig = {
    x: -1240,
    transition: { duration: 20, ease: "linear" },
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(
      `/auth/register?email=${encodeURIComponent(
        emailRef?.current?.value as string
      )}`
    );
  };

  return (
    <>
      {/* <div className=" w-full flex items-center px-2">
        <FlashSales />
      </div> */}
      <div className="grid lg:grid-cols-[43%_1fr] space-x-12 mt-[5vh] lg:mt-[14vh] ">
        <div className="w-screen px-8 text-center lg:w-auto lg:text-left lg:pl-24">
          <h1 className="px-4 lg:px-0 text-3xl lg:text-5xl leading-[1.35] lg:leading-[1.25] font-medium md:font-normal">
            Upskill and <span className="gradienttext">Learn</span> from leading
            professionals.
          </h1>

          <p className="lg:text-lg lg:w-4/5 text-app-gray-400 mt-4 leading-[1.75] md:text-center">
            Register to get access to hours of learning content from powerfully
            talented individuals using brilliant storytelling and in-depth
            learning methods.
          </p>

          <form onSubmit={onSubmit} className="relative mt-6 lg:w-4/5">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="h-full text-lg bg-transparent outline-none p-2 border-2 border-app-gray-400  rounded-[4px] block w-full pr-[38%]  placeholder:text-app-gray-100"
            />
            <button
              type="submit"
              className="actiongradient p-1 text-center px-6 text-white text-md lg:text-lg rounded-[4px] absolute right-0 top-1/2 -translate-y-1/2 h-full flex items-center justify-center border-transparent border-[6px] bg-clip-padding "
            >
              Sign Up
            </button>
          </form>
        </div>

        <div
          className="relative mt-16 lg:mt-0 overflow-clip"
          ref={dragConstraintsRef}
        >
          <motion.div
            // onHoverStart={() => controls.stop()}
            // onHoverEnd={() => controls.start(animationConfig)}
            // drag={'x'}
            // onDragEnd={() => controls.start(animationConfig)}
            className="flex gap-3 lg:gap-4 lg:h-full h-60"
            animate={controls}
          >
            <Image
              src={"/images/abubakar.png"}
              alt="Abubakar"
              priority
              className="h-full min-w-[50vw] md:min-w-[330px] rounded-md bg-[#AEBDC2] overflow-hidden"
              objectFit={"cover"}
              objectPosition={"top center"}
              ref={firstDonJazzy}
            />
            <Image
              src={"/images/third.png"}
              alt="Don Jazzy"
              className="h-full min-w-[120px] md:min-w-[200px] rounded-md bg-[#C0A5C0] overflow-hidden"
              objectPosition={"top center"}
              objectFit={"cover"}
            />
            <Image
              src={
                "https://firebasestorage.googleapis.com/v0/b/certs-by-unify.appspot.com/o/OBINNA.JPG?alt=media&token=beb66612-2034-4ed6-a393-4888a3f0ba2a"
              }
              alt="OBINNA FROM STERLING"
              className="h-full min-w-[120px] md:min-w-[200px] rounded-md bg-[#C0A5C0] overflow-hidden"
              objectPosition={"top center"}
              objectFit={"cover"}
            />

            <Image
              src={"/images/abubakar.png"}
              alt="Don Jazzy"
              className="h-full min-w-[50vw] md:min-w-[350px] rounded-md bg-[#AEBDC2] overflow-hidden"
              objectPosition={"top center"}
              objectFit={"cover"}
              ref={secondDonJazzy}
            />
            <Image
              src={"/images/third.png"}
              alt="Don Jazzy"
              className="h-full w-[120px] md:min-w-[200px] rounded-md bg-[#C0A5C0] overflow-hidden"
              objectPosition={"top center"}
              objectFit={"cover"}
            />
            <Image
              src={
                "https://firebasestorage.googleapis.com/v0/b/certs-by-unify.appspot.com/o/OBINNA.JPG?alt=media&token=beb66612-2034-4ed6-a393-4888a3f0ba2a"
              }
              alt="OBINNA FROM STERLING"
              className="h-full min-w-[120px] md:min-w-[200px] rounded-md bg-[#C0A5C0] overflow-hidden"
              objectPosition={"top center"}
              objectFit={"cover"}
            />

            <Image
              src={"/images/abubakar.png"}
              alt="Don Jazzy"
              className="h-full min-w-[50vw] md:min-w-[350px] rounded-md bg-[#AEBDC2] overflow-hidden"
              objectPosition={"top center"}
              objectFit={"cover"}
              ref={secondDonJazzy}
            />
            <Image
              src={"/images/third.png"}
              alt="Don Jazzy"
              className="h-full min-w-[120px] md:min-w-[200px] rounded-md bg-[#C0A5C0] overflow-hidden"
              objectPosition={"top center"}
              objectFit={"cover"}
            />
            <Image
              src={
                "https://firebasestorage.googleapis.com/v0/b/certs-by-unify.appspot.com/o/OBINNA.JPG?alt=media&token=beb66612-2034-4ed6-a393-4888a3f0ba2a"
              }
              alt="OBINNA FROM STERLING"
              className="h-full min-w-[120px] md:min-w-[200px] rounded-md bg-[#C0A5C0] overflow-hidden"
              objectPosition={"top center"}
              objectFit={"cover"}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
