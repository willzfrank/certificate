import { AccordionFaqs, Modal, Footer, Header } from 'app/components';
import Image from 'next/image';
import { SmoothScroll } from 'app/components/layouts';
import { NextPageWithLayout } from 'app/types';
import Link from 'next/link';
import * as React from 'react';
import concentratedGuy from '../../../public/images/concentrated-young-man-with-virtual-reality-glasses 1 (1).png';
import concentratedGuy2 from '../../../public/images/concentrated-young-man1.png';
import concentratedWoman from '../../../public/images/concentrated-young-woman-with-virtual-reality-glasses 1.png';
import sterlinglogo from '../../../public/images/sterlinglogo_2.png';
import nextfordLogo from '../../../public/images/nexforduniversity.png';
import fusionLogo from '../../../public/images/fusionlogo.png';
import cafeOneLogo from '../../../public/images/cafeonelogo.png';
import eduBancLogo from '../../../public/images/edubanc-removebg-preview.png';
import altBankLogo from '../../../public/images/altbanklogo-removebg-preview.png';
import Bulb from '../../../public/images/Bulb.png';
import jobpool from '../../../public/images/jobpool.png';
import joinOurComm from '../../../public/images/joinourcommunity.png';
import WhiteLogo from '../../../public/images/CBU.png';
import manShaking from '../../../public/images/ManShaking.png';
import { USERTYPES } from 'app/types';
import LangOfBankTab from 'app/components/pages/landing/LangOfBankTab';
import mobileMan from '../../../public/images/mobileConcentratedMan.png';
import Perks from '../../../app/components/pages/landing/Perks';
import TargetAudienceAccordion from 'app/components/pages/landing/TargetAudienceAccordion';
import bankersImage from '../../../public/images/Banker Picture.png';
import FAQAccordion from 'app/components/pages/landing/FAQAccordion';
import KeyOutcomes from '../../../app/components/pages/landing/KeyOutcomes';

const BecomeABanker: NextPageWithLayout<{}> = function () {
  const [activeTab, setActiveTab] = React.useState(1);
  const [ReadMoreAboutOpen, setReadMoreAboutOpen] = React.useState(false);
  const [criteriaReadMore, setIsCriteriaReadMore] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <SmoothScroll>
      <div className="bg-white overflow-hidden">
        <Header />
        <main className="">
          <div className="md:hidden w-full flex h-full relative right-[-50px]">
            <Image
              src={bankersImage}
              alt="bankersImage"
              className="border border-black"
              // layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="bg-banking-gradient md:px-[45px] md:pt-[150px] md:pb-[10px] px-[30px] flex gap-3 items-center">
            <div className="md:w-1/2 text-center md:text-start">
              <h1 className=" md:text-white md:text-6xl text-xl font-black jost leading-tight md:leading-[75px] md:mb-0 mb-2">
                BECOME A BANKER IN LESS THAN 2 MONTHS!
              </h1>
              <span className="jost md:text-white text-neutral-900 md:text-3xl text-[15px] font-normal md:leading-10">
                Learn everything you need to know about starting a career in
                banking
              </span>
            </div>
            <div className="hidden md:block relative w-1/2">
              <div className=" z-[5] rounded-[30px]">
                <Image
                  src={concentratedGuy}
                  alt=""
                  className="rounded-[30px] transform transition-transform hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 right-0 z-[15] rounded-[30px]">
                <Image
                  src={concentratedWoman}
                  alt=""
                  className="rounded-[30px] transform transition-transform hover:scale-105"
                />
              </div>
              <div className="absolute bottom-[-300px] right-40 z-[10] rounded-[30px]">
                <Image
                  src={concentratedGuy2}
                  alt=""
                  className="transform transition-transform hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className=" md:px-[50px] md:py-[40px] md:my-0 my-10 p-3 flex md:block items-center gap-1">
            <div
              className="md:w-[555px] w-3/4 h-full md:h-[307px] border-4 p-2 md:p-7 relative border-b-0"
              style={{
                borderImage: 'linear-gradient(to right, #D60049, #FF8F40) 1',
                borderImageSlice: 1,
              }}
            >
              <h2 className="text-neutral-800 text-xl md:text-[40px] font-bold jost">
                Classes are on-going
              </h2>
              <p className="md:w-[523px] h-full md:h-[98px] text-black  text-[18px] md:text-[25px] font-normal jost md:mt-5">
                Register now to join the next co-hort. A new cohort begins on
                the 1st of every month.
              </p>

              <div
                className="hidden md:flex items-start justify-start w-[555px] absolute bottom-0 left-0 "
                onClick={() => setModalOpen(true)}
              >
                <div className="mx-4 px-5 py-[11px] bg-gradient-to-r from-rose-600 to-orange-400 rounded-[30px] justify-center items-center gap-2.5 flex">
                  <div>
                    <span className="text-white text-[20px] font-medium cursor-pointer jost">
                      Learn More
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden text-center w-1/4 px-3 py-[13px] bg-gradient-to-r from-rose-600 to-orange-400 rounded-[30px] justify-center items-center gap-2.5 block">
              <div
                className="text-white text-[9px] font-medium"
                onClick={() => setModalOpen(true)}
              >
                Learn More
              </div>
            </div>
          </div>

          <div className="md:block hidden bg-gray-100 bg-opacity-50 py-7">
            <div className=" flex items-center justify-center gap-4">
              <div className=" flex items-center">
                <div className=" bg-black h-[2px] w-[100px]"></div>
                <div className=" bg-black h-3 w-3 rounded-full"></div>
              </div>

              <h1 className="text-center jost text-neutral-800 text-xl font-bold">
                Partners
              </h1>
              <div className=" flex items-center ">
                <div className=" bg-black h-3 w-3 rounded-full"></div>
                <div className=" bg-black h-[2px] w-[100px]"></div>
              </div>
            </div>
            <div className=" flex justify-around  items-center py-5 my-5">
              <div>
                <Image src={sterlinglogo} alt="logo" width="180%" />
              </div>
              <div>
                <Image
                  src={nextfordLogo}
                  alt="logo"
                  width="180%"
                  height="100%"
                />
              </div>
              <div>
                <Image src={fusionLogo} alt="logo" width="180%" height="50%" />
              </div>
              <div>
                <Image
                  src={cafeOneLogo}
                  alt="logo"
                  width="100%"
                  height="100%"
                />
              </div>
              <div>
                <Image
                  src={eduBancLogo}
                  alt="logo"
                  width="100%"
                  height="100%"
                />
              </div>
              <div>
                <Image
                  src={altBankLogo}
                  alt="logo"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>

          {/* MOBILE PARTNERS */}
          <div className="block md:hidden bg-gray-100 bg-opacity-50 pt-5 ">
            <div className=" flex items-center justify-center gap-4">
              <div className=" flex items-center">
                <div className=" bg-black h-[2px] w-[50px]"></div>
                <div className=" bg-black h-3 w-3 rounded-full"></div>
                <h1 className="text-center px-4 text-neutral-800 text-xl font-bold">
                  Partners
                </h1>
                <div className=" flex items-center ">
                  <div className=" bg-black h-3 w-3 rounded-full"></div>
                  <div className=" bg-black h-[2px] w-[50px]"></div>
                </div>
              </div>
            </div>
            <div className=" grid grid-cols-3  items-center p-2 gap-1 my-5">
              <div>
                <Image src={sterlinglogo} alt="logo" width="180%" />
              </div>
              <div>
                <Image
                  src={nextfordLogo}
                  alt="logo"
                  width="150%"
                  height="150%"
                />
              </div>
              <div>
                <Image src={fusionLogo} alt="logo" width="180%" height="50%" />
              </div>
              <div>
                <Image
                  src={cafeOneLogo}
                  alt="logo"
                  width="100%"
                  height="100%"
                />
              </div>
              <div>
                <Image
                  src={eduBancLogo}
                  alt="logo"
                  width="150%"
                  height="150%"
                />
              </div>
              <div>
                <Image
                  src={altBankLogo}
                  alt="logo"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center md:items-start md:px-[50px] md:py-[90px]">
            <div>
              <h2 className="md:w-[640px] text-neutral-800 text-xl leading-tight md:text-[50px] font-black jost md:pl-0 pl-5">
                LEARN THE INS AND OUTS OF THE FINANCE INDUSTRY
              </h2>
              <ul className=" md:text-xl list-disc pl-10 flex flex-col gap-2 md:gap-6 md:w-11/12 pt-12 pb-8">
                <li className="jost text-black text-[15px] md:text-2xl font-normal ">
                  Accelerate your career path
                </li>
                <li className=" jost text-black text-[15px] md:text-2xl font-normal">
                  Acquire transferable skills
                </li>
                <li className=" jost text-black text-[15px] md:text-2xl font-normal">
                  Build your network
                </li>
                <li className="jost text-black text-[15px] md:text-2xl font-normal ">
                  Land the job of your dreams
                </li>
              </ul>
              <div className="md:w-[304px] md:ml-0 ml-5 py-3 md:py-0 md:h-16 bg-gradient-to-r from-rose-600 to-orange-400 rounded-[50px] flex items-center justify-center md:mb-0 mb-10">
                <Link href="/course/caf6b233-dedc-4625-949a-bae5048c7aa7/preview">
                  <p className="text-white text-[10px] md:text-[20px] font-medium cursor-pointer jost">
                    Start your Journey here
                  </p>
                </Link>
              </div>
            </div>
            <div className="relative w-full">
              <div className="relative w-full">
                <div className="z-20 hidden md:block absolute left-0 top-[120px]">
                  <Image
                    src={manShaking}
                    alt="Man shaking hands"
                    width="395px"
                    height="511px"
                    className="transform transition-transform hover:scale-105"
                  />
                </div>
                <div className="hidden md:block z-10 absolute right-0 top-[30px]">
                  <Image
                    src={manShaking}
                    alt="Man shaking hands"
                    width="395px"
                    height="511px"
                    className="transform transition-transform hover:scale-105 "
                  />
                </div>
                <div className="md:hidden w-full h-full">
                  <Image
                    src={manShaking}
                    alt="Man shaking hands"
                    className="z-[100]"
                  />
                </div>
              </div>

              <div className="absolute top-[-20px] md:top-[-100px] right-[-50px] md:right-[-200px] md:w-[528px] md:h-[528px] rounded-full border-2 border-rose-600 w-[218.68px] h-[218.68px] " />
              <div className="absolute top-[-50px] md:top-0 md:right-[0px] right-[-100px] md:w-[528px] md:h-[528px] rounded-full border-2 border-rose-600 w-[208.68px] h-[208.68px] " />
            </div>
          </div>

          <div className="md:px-[50px] px-5 py-10  bg-gray-100 bg-opacity-50 md;py-7">
            <h1 className=" font-bold text-xl md:text-6xl text-[#d60049] md:w-[1075px] jost">
              What is the Language of Banking course all about?
            </h1>
            <div
              className={`md:hidden w-[350px] h-[18px] bg-gradient-to-r from-rose-600 to-orange-400 text-center flex items-center justify-center my-5 py-5 rounded-[50px] transition-opacity duration-300 `}
              onClick={() => {
                setReadMoreAboutOpen(!ReadMoreAboutOpen);
              }}
            >
              <p className="text-white text-[10px] font-medium leading-[8px]">
                READ MORE
              </p>
            </div>
            {ReadMoreAboutOpen && (
              <div
                className={`md:hidden transition-opacity duration-300 ${
                  ReadMoreAboutOpen ? 'opacity-100 py-3' : ' opacity-0 py-0'
                }`}
              >
                <p className=" text-base md:text-[25px] pt-3 jost text-justify text-neutral-800 font-normal">
                  The Language of Banking course establishes a strong foundation
                  in the core concepts and principles of finance and banking.
                  Learners will acquire in-depth understanding of diverse
                  banking practices and processes.
                </p>

                <p className=" text-base md:text-[25px] pt-3 jost text-justify text-neutral-800 font-normal">
                  The curriculum covers diverse key subjects relevant to the
                  banking sector, such as accounting, credit analysis, risk
                  management, digital banking, agile methodologies, and
                  essential soft skills such as effective communication,
                  emotional intelligence and critical thinking.
                </p>

                <p className=" text-base md:text-[25px] pt-3 jost text-justify text-neutral-800 font-normal">
                  Designed in partnership with and delivered on the Nexford
                  University learning portal, our engaging course content will
                  help you gain the knowledge and skills necessary to succeed in
                  the banking industry.
                </p>
              </div>
            )}
            <p className="hidden md:block text-base md:text-[25px] pt-3 jost text-justify text-neutral-800 font-normal">
              The Language of Banking course establishes a strong foundation in
              the core concepts and principles of finance and banking. Learners
              will acquire in-depth understanding of diverse banking practices
              and processes.
            </p>

            <p className="hidden md:block  text-base md:text-[25px] pt-3 jost text-justify text-neutral-800 font-normal">
              The curriculum covers diverse key subjects relevant to the banking
              sector, such as accounting, credit analysis, risk management,
              digital banking, agile methodologies, and essential soft skills
              such as effective communication, emotional intelligence and
              critical thinking.
            </p>

            <p className="hidden md:block text-base md:text-[25px] pt-3 jost text-justify text-neutral-800 font-normal">
              Designed in partnership with and delivered on the Nexford
              University learning portal, our engaging course content will help
              you gain the knowledge and skills necessary to succeed in the
              banking industry.
            </p>
          </div>

          <div className="hidden md:block">
            <LangOfBankTab />
          </div>

          <div className="block md:hidden p-5">
            <h2 className="text-black text-xl font-bold">
              Who is the Course for?
            </h2>
            <p className="text-black text-[15px] font-normal">
              The course is for 5 categories of people;
            </p>

            <TargetAudienceAccordion />
          </div>

          <div className=" overflow-hidden relative px-5 md:px-0 md:py-20 py-5 flex items-center gap-6 ">
            <div className="hidden md:block absolute z-[3] top-[45px] -left-8 border-[3px] border-[#d60049] h-[750px] w-[500px] rounded-tr-[80px]"></div>

            <div className=" hidden md:block z-[5]">
              <Image src={Bulb} alt="" />
            </div>
            <div className=" md:hidden block z-[5]">
              <Image src={Bulb} alt="" width="150%" height="150%" />
            </div>
            <div className="md:w-2/4 w-full">
              <h1 className=" font-bold text-xl md:text-5xl leading-[25px] md:leading-[70px] text-[#d60049] pb-8 jost">
                What are the enrollment criteria for the Language of Banking
                Course
                <span
                  className="inline-block md:hidden text-sm text-black ml-2"
                  onClick={() => {
                    setIsCriteriaReadMore(!criteriaReadMore);
                  }}
                >
                  Read more
                </span>
              </h1>

              <ul className=" hidden md:flex text-xl list-disc pl-10 flex-col gap-6 w-11/12">
                <li className=" jost">
                  You must be a graduate of a recognized tertiary institution.
                </li>
                <li className=" jost">
                  You will need a reliable internet connection and a computer or
                  mobile device to access the course.
                </li>
                <li className=" jost">
                  You must be able to commit 5-10 hours per week to take your
                  classes.
                </li>
                <li className="jost ">
                  You do not require prior accounting or banking skills and
                  knowledge.
                </li>

                <li className="jost ">
                  You must not be a banking, accounting or finance graduate.
                </li>
              </ul>

              <button className="hidden md:block py-2 px-6 mt-5 text-white text-[20px] font-medium  rounded-[30px] bg-gradient-to-r from-[#d60049] to-[#ff8c40] w-[186px] h-16 jost">
                <Link href="/course/caf6b233-dedc-4625-949a-bae5048c7aa7/preview">
                  Enroll Now
                </Link>
              </button>
            </div>
          </div>

          {criteriaReadMore && (
            <ul className=" flex md:hidden text-xl list-disc pl-10 flex-col gap-6 w-11/12">
              <li className=" jost">
                You must be a graduate of a recognized tertiary institution.
              </li>
              <li className=" jost">
                You will need a reliable internet connection and a computer or
                mobile device to access the course.
              </li>
              <li className=" jost">
                You must be able to commit 5-10 hours per week to take your
                classes.
              </li>
              <li className="jost ">
                You do not require prior accounting or banking skills and
                knowledge.
              </li>

              <li className="jost ">
                You must not be a banking, accounting or finance graduate.
              </li>
            </ul>
          )}

          <div className=" relative hidden md:block my-20">
            <div className=" absolute border-2 z-10 -top-[300px]  -right-[320px] rounded-full h-[500px] w-[500px] border-[#d60049]"></div>
            <div className=" absolute border-2 z-10 -top-[500px] -right-[400px] rounded-full h-[500px] w-[500px] border-[#d60049]"></div>
            <h1 className=" font-bold text-4xl jost pl-24 ">
              Key Learning Outcomes:
            </h1>
            <div className=" flex items-center gap-4 py-6 pl-24">
              <p className=" text-3xl jost">In this course, you will learn:</p>
              {/* <div className=" flex items-center gap-3">
                <p className=" italic text-xl">Read More</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div> */}
            </div>
            <div className="z-20">
              <KeyOutcomes />
            </div>
          </div>

          <div className="block md:hidden p-5 my-5 z-[1000]">
            <h1 className="text-black text-xl font-bold">
              Key Learning Outcomes:
            </h1>
            <p className="w-[246px] h-[29px] text-black text-[15px] font-normal">
              In this course, you will learn:
            </p>
            <KeyOutcomes />

            {/* <div className="flex items-center justify-center">
              <div className="w-[350px] h-[18px] bg-gradient-to-r from-rose-600 to-orange-400 rounded-[20px] flex items-center justify-center">
                <p className="text-white text-[10px] font-medium leading-[8px]">
                  READ MORE
                </p>
              </div>
            </div> */}
          </div>

          <div className=" bg-image pb-[50px]">
            <h1 className="uppercase text-xl md:text-4xl font-bold text-[#8F8F8F] tracking-widest py-5 md:py-12 text-center jost">
              Perks
            </h1>
            <div className="grid-cols-6 gap-12 px-24 jost hidden md:grid">
              <div className=" p-3  h-[150px] w-full border border-black border-opacity-25 bg-white card-shadow col-start-1 col-end-3 ">
                <p className=" text-rose-600 text-xl font-bold jost">
                  Immersive Learning
                </p>
                <p className=" leading-5 text-xl pt-1">
                  The course is designed to offer a practical and immersive
                  learning experience that caters to your learning needs.
                </p>
              </div>
              <div className=" p-3 h-[150px] w-full border border-black border-opacity-25 bg-white card-shadow col-start-3 col-end-5 ">
                <p className=" text-rose-600 text-xl font-bold">Flexibility</p>
                <p className=" leading-5 text-xl pt-1">
                  100% virtual. Study at your own pace.
                </p>
              </div>
              <div className=" p-3 h-[150px] w-full border border-black border-opacity-25 bg-white card-shadow col-start-5 col-end-7 ">
                <p className=" text-rose-600 text-xl font-bold">
                  Expert-led Lessons
                </p>
                <p className=" leading-5 text-xl pt-1">
                  Lessons are curated by leading banking experts.
                </p>
              </div>
              <div className=" p-3 h-[150px] w-full border border-black border-opacity-25 bg-white card-shadow col-start-1 col-end-3 ">
                <p className=" text-rose-600 text-xl font-bold">Mentorship</p>
                <p className=" leading-5 text-xl pt-1">
                  Get the opportunity to connect with banking professionals and
                  gain exclusive access to in-depth career training.
                </p>
              </div>
              <div className=" p-3 h-[150px] w-full border border-black border-opacity-25 bg-white card-shadow col-start-3 col-end-5 ">
                <p className=" text-rose-600 text-xl font-bold">Community</p>
                <p className=" leading-5 text-xl pt-1">
                  Become part of a supportive community where you learn, share
                  ideas, network and collaborate with like-minds.
                </p>
              </div>
              <div className=" p-3 h-[150px] w-full border border-black border-opacity-25 bg-white card-shadow col-start-5 col-end-7 ">
                <p className=" text-rose-600 text-xl font-bold">
                  Get Certified
                </p>
                <p className=" leading-5 text-xl pt-1">
                  Kickoff your banking career with a certificate that proves
                  your eligibility to potential employers.
                </p>
              </div>
              <div className=" p-3 h-[150px] w-full border border-black border-opacity-25 bg-white card-shadow col-start-3 col-end-5">
                <p className=" text-rose-600 text-xl font-bold">Get Employed</p>
                <p className=" leading-5 text-xl pt-1">
                  Score at least 70% and stand a chance to be selected from our
                  job pool, to gain employment from top financial institutions
                </p>
              </div>
            </div>
            <div className="block md:hidden">
              <Perks />
            </div>
          </div>

          <div className="md:mx-24 mx-5 my-20 flex flex-col md:flex-row justify-between items-center gap-6 md:bg-gray-100 bg-opacity-50">
            <div className=" w-full md:w-1/2">
              <Image src={jobpool} alt="" />
            </div>

            <div className=" w-full p-5 md:p-0 md:w-1/2 ">
              <div className="jost">
                <h1 className="text-black text-xl text-start md:text-[50px] font-bold jost md:leading-tight">
                  WHAT IS THE JOB POOL ABOUT?
                </h1>
                <p className="text-black text-[15px] md:text-[25px] font-normal pr-5">
                  Learners who complete the course and score at least 70% in the
                  final grading will gain exclusive access to our job pool. We
                  have partnered with leading banking and fintech organizations
                  that are committed to employing top-performing learners from
                  our job pool.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center gap-[50px] bg-zinc-100 bg-opacity-50 py-[70px] w-full jost">
            <div>
              <h2 className="text-black text-[40px] font-bold jost">
                COURSE FEE
              </h2>
              <p className="text-black text-2xl font-normal">
                The cost is priced at
              </p>
              <p className="text-rose-600 text-[30px] font-bold">
                N69,955 only
              </p>
            </div>
            <div>
              <p className="w-[626px] text-black text-[30px] font-normal  mb-5">
                You can sign up for the course with a single payment or pay in
                2, 3 or 4 installments
              </p>
              <div className="w-[175px] h-[51px] bg-gradient-to-r from-rose-600 to-orange-400 rounded-[30px] flex items-center justify-center">
                <a
                  href="https://forms.gle/kaRXYvDoAD6azPnc7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  <p className="w-full h-[26px] flex items-center justify-center text-center text-white text-[15px] font-medium">
                    Get Discount{' '}
                  </p>
                </a>
              </div>
            </div>
          </div>

          <div className=" block md:hidden mb-5 bg-gradient-to-r from-rose-600 to-orange-400 p-5">
            <div className="flex items-start flex-col">
              <div className="flex items-center">
                <div>
                  <h2 className="text-white text-xl font-bold">COURSE FEE</h2>
                  <p className="w-[189px] h-8 text-white text-[15px] font-normal">
                    The cost is priced at
                  </p>
                </div>
                <div className="w-[145px] h-[38px] flex items-center justify-center bg-white rounded-[30px]">
                  <h2 className="text-rose-600 text-base font-bold">
                    N69,955 only
                  </h2>
                </div>
              </div>
              <p className="w-[290px] text-white text-[15px] font-normal">
                You can sign up for the course with a single payment or pay in
                2, 3 or 4 installments
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <a
              href="https://forms.gle/kaRXYvDoAD6azPnc7"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              <div className="md:hidden flex items-center w-[318px] justify-center h-8 rounded-[30px] border border-rose-600">
                <p className="w-full h-[26px] flex items-center justify-center text-center text-rose-600 text-[15px] font-medium">
                  Get Discount{' '}
                </p>
              </div>
            </a>
          </div>

          <div className="py-12 ">
            <div className=" md:w-[40%] w-1/2 mx-auto mb-32 heading">
              <h1 className=" text-black text-xl md:text-[45px] font-bold md:leading-tight">
                JOIN OUR <br /> LEARNERS <br /> COMMUNITY
              </h1>
              <p className="text-black text-[15px] md:text-[25px] font-normal">
                Get the answers to your questions from industry experts. Connect
                and learn with other community members.
              </p>
              <a
                href="https://t.me/thegradhq/1"
                target="_blank"
                rel="noreferrer"
              >
                <button className="md:w-[296px] h-[51px] text-white text-[10px] w-full md:text-[20px] font-medium mt-5 py-2 px-3  rounded-[30px] bg-gradient-to-r from-[#d60049] to-[#ff8c40] ">
                  Join our community
                </button>
              </a>
            </div>
            <div
              className={`heading bg-gray-100 bg-opacity-50 mx-auto w-full md:w-2/3 md:px-32 p-5 md:pt-5`}
            >
              <div className=" relative">
                <span className=" absolute text-[100px] top-0 left-0">“</span>
                <p className=" text-xs md:text-xl pt-24 jus">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My learning experience has been
                  great! I was able to learn new things I had no idea about
                  before. I thoroughly enjoyed the aspect of digital marketing.
                  It really is interesting! The course has truly been worthwhile
                  and I’m glad I signed up for it.
                </p>
                <h3 className=" text-center text-[10px] md:text-xl font-bold py-11 ">
                  Helen O., Nigeria
                </h3>
              </div>
            </div>
            {/* FAQ */}
            <h2 className="text-bold text-xl text-center my-10">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <FAQAccordion />
            <Link href="/course/caf6b233-dedc-4625-949a-bae5048c7aa7/preview">
              <div className="flex items-center gap-2 justify-center my-[30px] cursor-pointer heading">
                <h2 className="text-rose-600 text-[10px] md:text-[25px] font-semibold">
                  Start your learning journey here
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </Link>
            {/* <div className="justify-between gap-x-12 items-center w-full px-6 md:px-24 pt-16 md:pt-32 pb-10 heading hidden md:flex">
              <div className="w-1/2">
                <p className="text-sm font-semibold pb-4">Join Our Community</p>
                <div className="border border-[#d60049] flex justify-between p-2 rounded-l-[34px] rounded-r-[34px]">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="appearance-none border-none bg-transparent outline-none placeholder-italic placeholder-slate-400 placeholder-sm"
                  />
                  <button className="text-white py-2 px-3 font-medium rounded-[30px] bg-gradient-to-r from-[#d60049] to-[#ff8c40]">
                    <Link href="http://eepurl.com/inPIs6">
                      Sign up for our newsletter
                    </Link>
                  </button>
                </div>
              </div>
              <div>
                <Image src={joinOurComm} alt="" />
              </div>
            </div> */}
          </div>
        </main>

        {/* <Footer withSignUpPromotion /> */}
        <footer className=" md:bg-[#d60049] bg-black flex md:px-24 md:py-14 p-5 md:flex-row flex-col gap-5 md:gap-0">
          <div className="text-white w-2/5">
            <div>
              <Image src={WhiteLogo} alt="logo" width="200%" height="100%" />
            </div>
            <p className="w-[332px] h-[100px] my-3 text-white text-[13px] md:text-[15px] font-semibold">
              Enabling the future.
              <br />
              <br />
              Improve efficiency and quality of learning with tech-driven
              tailored solutions for your institutions.
            </p>
          </div>

          <div className="text-white text-sm flex justify-between w-full md:w-1/2 items-start">
            <ul className="flex flex-col gap-5 md:gap-3">
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                <Link href="/about">About Unify</Link>
              </li>
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                <Link href={'/faqs'}>FAQs</Link>
              </li>
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                Features
              </li>
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                <Link href="/privacy/terms">Terms & Condtions</Link>
              </li>
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                <Link href="/privacy/policy">Privacy Policy</Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-3">
              {/* <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                Download the app
              </li> */}
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                <a href="/" target="_blank" rel="noreferrer">
                  Certifications by Unify
                </a>
              </li>
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                <Link href="https://forms.unifyedu.ng">Unify Forms</Link>
              </li>
              {/* <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                Learning Labs
              </li> */}
              {/* <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                Unify Portal
              </li> */}
            </ul>

            <ul className="flex flex-col gap-3">
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                <a
                  href="https://www.linkedin.com/company/unifyng/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                <a
                  href="https://instagram.com/unify_ng?igshid=YmMyMTA2M2Y="
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                <a
                  href="https://twitter.com/unify_ng?s=11&t=_TXe-Quwv4XWiQaqQ50HMg"
                  target="_blank"
                  rel="noreferrer"
                >
                  X (formerly Twitter)
                </a>
              </li>
              <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                <a
                  href="https://www.youtube.com/@unify1003"
                  target="_blank"
                  rel="noreferrer"
                >
                  Youtube
                </a>
              </li>
              {/* <li className="text-white text-[13px] md:text-[15px] font-medium leading-8 cursor-pointer">
                Tiktok
              </li> */}
            </ul>
          </div>
          <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
            <iframe
              width="1000"
              className="aspect-video"
              src="https://www.youtube-nocookie.com/embed/UY28LXU2M3Q?autoplay=1&mute=1"
              title="YouTube video player"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web"
              allowFullScreen
            ></iframe>
          </Modal>
        </footer>
      </div>
    </SmoothScroll>
  );
};

export default BecomeABanker;

const OnlineLearningIllustration = () => (
  <svg
    width="616"
    height="616"
    viewBox="0 0 616 616"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M302.062 522.011C433.987 522.011 540.934 515.767 540.934 508.065C540.934 500.362 433.987 494.118 302.062 494.118C170.136 494.118 63.1893 500.362 63.1893 508.065C63.1893 515.767 170.136 522.011 302.062 522.011Z"
      fill="#F5F5F5"
    />
    <path
      d="M462.222 506.315H456.32L455.027 416.281H463.515L462.222 506.315Z"
      fill="#263238"
    />
    <path
      opacity="0.5"
      d="M462.222 506.315H456.32L455.027 416.281H463.515L462.222 506.315Z"
      fill="white"
    />
    <path
      d="M410.108 506.315H404.195L402.913 416.281H411.402L410.108 506.315Z"
      fill="#263238"
    />
    <path
      opacity="0.5"
      d="M410.108 506.315H404.195L402.913 416.281H411.402L410.108 506.315Z"
      fill="white"
    />
    <path
      d="M398.01 506.315H392.109L390.815 416.281H399.303L398.01 506.315Z"
      fill="#263238"
    />
    <path
      opacity="0.5"
      d="M398.01 506.315H392.109L390.815 416.281H399.303L398.01 506.315Z"
      fill="white"
    />
    <path
      d="M345.896 506.315H339.983L338.701 416.281H347.19L345.896 506.315Z"
      fill="#263238"
    />
    <path
      opacity="0.5"
      d="M345.896 506.315H339.983L338.701 416.281H347.19L345.896 506.315Z"
      fill="white"
    />
    <path
      d="M433.91 418.35H338.122C337.085 418.35 336.058 418.146 335.1 417.749C334.142 417.352 333.272 416.771 332.538 416.037C331.805 415.304 331.223 414.433 330.826 413.475C330.43 412.517 330.225 411.49 330.225 410.453V399.932C330.229 397.84 331.062 395.834 332.543 394.356C334.023 392.877 336.03 392.047 338.122 392.047H422.933L430.239 322.538C430.736 318.467 432.683 314.711 435.725 311.96C438.766 309.208 442.697 307.645 446.797 307.556H482.39L473.889 333.502L466.127 391.616L460.669 407.854L433.91 418.35Z"
      fill="#FF9141"
    />
    <path
      opacity="0.2"
      d="M433.91 418.35H338.122C337.085 418.35 336.058 418.146 335.1 417.749C334.142 417.352 333.272 416.771 332.538 416.037C331.805 415.304 331.223 414.433 330.826 413.475C330.43 412.517 330.225 411.49 330.225 410.453V399.932C330.229 397.84 331.062 395.834 332.543 394.356C334.023 392.877 336.03 392.047 338.122 392.047H422.933L430.239 322.538C430.736 318.467 432.683 314.711 435.725 311.96C438.766 309.208 442.697 307.645 446.797 307.556H482.39L473.889 333.502L466.127 391.616L460.669 407.854L433.91 418.35Z"
      fill="black"
    />
    <path
      d="M485.334 307.556H478.225C474.127 307.645 470.197 309.209 467.158 311.961C464.119 314.712 462.174 318.468 461.68 322.538L454.374 392.047H402.112C400.022 392.05 398.019 392.882 396.541 394.36C395.063 395.838 394.231 397.842 394.228 399.932V410.453C394.228 412.545 395.058 414.552 396.536 416.033C398.015 417.514 400.02 418.347 402.112 418.35H465.339C467.739 418.351 470.055 417.463 471.839 415.856C473.622 414.25 474.748 412.04 474.998 409.652L483.277 330.878C486.592 330.811 489.762 329.501 492.157 327.208C494.553 324.915 496 321.806 496.213 318.497C496.239 317.058 495.976 315.628 495.44 314.293C494.903 312.958 494.104 311.744 493.089 310.724C492.075 309.703 490.865 308.897 489.533 308.353C488.201 307.809 486.773 307.538 485.334 307.556Z"
      fill="#FF9141"
    />
    <path
      d="M347.941 469.121L352.044 495.929L360.508 495.202L359.325 468.148L347.941 469.121Z"
      fill="#EBB376"
    />
    <path
      d="M360.803 484.718C360.803 484.718 361.21 491.642 362.873 495.091C364.536 498.541 366.84 503.124 361.21 503.629C357.884 503.925 352.069 505.305 345.699 505.921C341.301 506.34 335.276 505.921 335.067 503.592C334.821 500.894 350.418 495.239 350.356 492.64C350.295 490.04 349.592 485.556 349.592 485.556L360.803 484.718Z"
      fill="#263238"
    />
    <path
      opacity="0.1"
      d="M360.803 484.718C360.803 484.718 361.21 491.642 362.873 495.091C364.536 498.541 366.84 503.124 361.21 503.629C357.884 503.925 352.069 505.305 345.699 505.921C341.301 506.34 335.276 505.921 335.067 503.592C334.821 500.894 350.418 495.239 350.356 492.64C350.295 490.04 349.592 485.556 349.592 485.556L360.803 484.718Z"
      fill="white"
    />
    <path
      d="M403.098 341.597L400.807 360.668C400.807 360.668 335.72 366.384 332.012 382.659C328.5 398.133 347.707 476.698 347.707 476.698L360.705 475.404C360.705 475.404 362.516 414.654 356.824 392.983C356.824 392.983 406.301 392.614 422.798 392.983C430.19 393.156 449.15 392.909 444.456 371.349C439.109 346.709 433.455 341.597 433.455 341.597L433.257 330.804H403.689L403.098 341.597Z"
      fill="#FF9141"
    />
    <path
      opacity="0.2"
      d="M403.098 341.597L400.807 360.668C400.807 360.668 335.72 366.384 332.012 382.659C328.5 398.133 347.707 476.698 347.707 476.698L360.705 475.404C360.705 475.404 362.516 414.654 356.824 392.983C356.824 392.983 406.301 392.614 422.798 392.983C430.19 393.156 449.15 392.909 444.456 371.349C439.109 346.709 433.455 341.597 433.455 341.597L433.257 330.804H403.689L403.098 341.597Z"
      fill="white"
    />
    <path
      d="M346.451 477.03L347.535 480.221C347.637 480.508 347.832 480.754 348.088 480.918C348.344 481.083 348.648 481.159 348.952 481.133L360.298 480.086C360.616 480.058 360.913 479.919 361.139 479.694C361.364 479.469 361.503 479.171 361.53 478.854L361.74 475.552C361.749 475.356 361.717 475.161 361.645 474.979C361.572 474.797 361.462 474.633 361.32 474.498C361.179 474.362 361.01 474.258 360.825 474.194C360.641 474.129 360.444 474.105 360.249 474.123L347.609 475.281C347.409 475.301 347.216 475.366 347.044 475.469C346.873 475.573 346.726 475.714 346.615 475.881C346.504 476.049 346.432 476.239 346.404 476.437C346.375 476.636 346.391 476.839 346.451 477.03Z"
      fill="#FF9141"
    />
    <path
      opacity="0.6"
      d="M346.451 477.03L347.535 480.221C347.637 480.508 347.832 480.754 348.088 480.918C348.344 481.083 348.648 481.159 348.952 481.133L360.298 480.086C360.616 480.058 360.913 479.919 361.139 479.694C361.364 479.469 361.503 479.171 361.53 478.854L361.74 475.552C361.749 475.356 361.717 475.161 361.645 474.979C361.572 474.797 361.462 474.633 361.32 474.498C361.179 474.362 361.01 474.258 360.825 474.194C360.641 474.129 360.444 474.105 360.249 474.123L347.609 475.281C347.409 475.301 347.216 475.366 347.044 475.469C346.873 475.573 346.726 475.714 346.615 475.881C346.504 476.049 346.432 476.239 346.404 476.437C346.375 476.636 346.391 476.839 346.451 477.03Z"
      fill="white"
    />
    <path
      d="M372.877 468.579L374.688 495.646H383.177L384.31 468.579H372.877Z"
      fill="#EBB376"
    />
    <path
      d="M384.15 487.441C384.15 487.441 383.928 494.377 385.283 497.962C386.639 501.547 388.524 506.315 382.819 506.315C379.493 506.315 373.592 506.389 367.296 505.921C362.886 505.6 356.787 506.315 356.787 503.937C356.787 501.227 373.284 496.829 373.444 494.241C373.604 491.654 373.444 487.293 373.444 487.293L384.15 487.441Z"
      fill="#263238"
    />
    <path
      d="M413.287 341.597L411.205 360.668C411.205 360.668 370.721 366.175 364.228 375.871C357.736 385.567 372.988 480.973 372.988 480.973H384.31C392.392 427.997 388.191 392.909 388.191 392.909H438.962C471.302 392.909 442.522 341.597 442.522 341.597L442.645 330.262L412.72 331.987L413.287 341.597Z"
      fill="#FF9141"
    />
    <path
      opacity="0.3"
      d="M413.287 341.597L411.205 360.668C411.205 360.668 370.721 366.175 364.228 375.871C357.736 385.567 372.988 480.973 372.988 480.973H384.31C392.392 427.997 388.191 392.909 388.191 392.909H438.962C471.302 392.909 442.522 341.597 442.522 341.597L442.645 330.262L412.72 331.987L413.287 341.597Z"
      fill="white"
    />
    <path
      d="M370.918 479.125L371.768 482.611C371.833 482.887 371.991 483.132 372.216 483.305C372.44 483.477 372.717 483.568 373 483.56H384.273C384.56 483.566 384.839 483.473 385.064 483.295C385.289 483.117 385.445 482.867 385.505 482.587L386.257 479.088C386.298 478.905 386.297 478.715 386.254 478.533C386.211 478.35 386.127 478.18 386.008 478.035C385.889 477.89 385.739 477.775 385.568 477.696C385.398 477.618 385.212 477.58 385.025 477.585H372.138C371.948 477.581 371.759 477.621 371.587 477.702C371.415 477.783 371.263 477.902 371.145 478.052C371.027 478.201 370.945 478.375 370.906 478.562C370.866 478.748 370.871 478.941 370.918 479.125Z"
      fill="#FF9141"
    />
    <path
      opacity="0.6"
      d="M370.918 479.125L371.768 482.611C371.833 482.887 371.991 483.132 372.216 483.305C372.44 483.477 372.717 483.568 373 483.56H384.273C384.56 483.566 384.839 483.473 385.064 483.295C385.289 483.117 385.445 482.867 385.505 482.587L386.257 479.088C386.298 478.905 386.297 478.715 386.254 478.533C386.211 478.35 386.127 478.18 386.008 478.035C385.889 477.89 385.739 477.775 385.568 477.696C385.398 477.618 385.212 477.58 385.025 477.585H372.138C371.948 477.581 371.759 477.621 371.587 477.702C371.415 477.783 371.263 477.902 371.145 478.052C371.027 478.201 370.945 478.375 370.906 478.562C370.866 478.748 370.871 478.941 370.918 479.125Z"
      fill="white"
    />
    <path
      d="M355.149 330.718L345.983 332.504L337.359 329.979C336.164 329.817 334.948 329.964 333.826 330.406C332.704 330.848 331.715 331.571 330.952 332.504C329.704 333.996 329.023 335.881 329.03 337.827V338.159H346.759L356.381 336.866L355.149 330.718Z"
      fill="#EBB376"
    />
    <path
      d="M404.675 277.705C404.661 277.283 404.522 276.874 404.276 276.531C404.031 276.187 403.689 275.924 403.294 275.774C402.899 275.624 402.469 275.594 402.057 275.688C401.645 275.781 401.27 275.995 400.979 276.301C398.022 279.208 393.772 282.621 391.788 300.941C389.238 324.533 349.9 330.385 349.9 330.385L351.773 339.009C351.773 339.009 380.75 339.995 392.749 327.478C408.272 311.4 406.006 287.265 404.675 277.705Z"
      fill="#FF9141"
    />
    <path
      opacity="0.2"
      d="M404.675 277.705C404.661 277.283 404.522 276.874 404.276 276.531C404.031 276.187 403.689 275.924 403.294 275.774C402.899 275.624 402.469 275.594 402.057 275.688C401.645 275.781 401.27 275.995 400.979 276.301C398.022 279.208 393.772 282.621 391.788 300.941C389.238 324.533 349.9 330.385 349.9 330.385L351.773 339.009C351.773 339.009 380.75 339.995 392.749 327.478C408.272 311.4 406.006 287.265 404.675 277.705Z"
      fill="white"
    />
    <path
      d="M439.935 239.624C436.374 215.76 416.28 224.36 416.28 224.36C403.295 229.041 407.656 245.168 407.656 253.928C407.656 262.687 406.548 265.718 406.548 265.718C408.051 265.385 409.443 265.102 410.786 264.831L411.254 262.083L412.067 264.547C422.983 262.465 428.872 262.49 432.05 263.155C432.944 261.528 433.588 259.775 433.96 257.956C433.96 257.956 435.512 258.966 433.96 263.747C435.845 264.597 435.758 265.693 435.758 265.693C435.758 265.693 443.52 263.488 439.935 239.624Z"
      fill="#263238"
    />
    <path
      d="M452.28 274.933L405.328 274.379C404.231 274.362 403.164 274.735 402.318 275.433C401.472 276.13 400.901 277.106 400.708 278.186C395.164 308.838 398.946 307.754 398.946 307.754L401.312 345.268H406.56C408.096 345.27 409.584 344.739 410.773 343.766C411.961 342.793 412.775 341.439 413.077 339.933L413.607 337.297L414.999 340.993C415.472 342.248 416.313 343.33 417.413 344.098C418.512 344.865 419.818 345.282 421.159 345.293H445.122C442.337 316.488 451.466 288.695 454.645 278.309C454.77 277.929 454.804 277.525 454.745 277.129C454.687 276.733 454.536 276.357 454.307 276.029C454.077 275.701 453.775 275.432 453.423 275.242C453.071 275.051 452.679 274.946 452.28 274.933Z"
      fill="#FF9141"
    />
    <path
      opacity="0.4"
      d="M452.28 274.933L405.328 274.379C404.231 274.362 403.164 274.735 402.318 275.433C401.472 276.13 400.901 277.106 400.708 278.186C395.164 308.838 398.946 307.754 398.946 307.754L401.312 345.268H406.56C408.096 345.27 409.584 344.739 410.773 343.766C411.961 342.793 412.775 341.439 413.077 339.933L413.607 337.297L414.999 340.993C415.472 342.248 416.313 343.33 417.413 344.098C418.512 344.865 419.818 345.282 421.159 345.293H445.122C442.337 316.488 451.466 288.695 454.645 278.309C454.77 277.929 454.804 277.525 454.745 277.129C454.687 276.733 454.536 276.357 454.307 276.029C454.077 275.701 453.775 275.432 453.423 275.242C453.071 275.051 452.679 274.946 452.28 274.933Z"
      fill="white"
    />
    <path
      d="M348.656 330.25L350.393 339.342C350.454 339.653 350.625 339.931 350.873 340.128C351.121 340.324 351.432 340.426 351.748 340.414L353.498 340.34C353.681 340.332 353.86 340.285 354.024 340.203C354.188 340.121 354.333 340.005 354.449 339.863C354.565 339.721 354.65 339.557 354.699 339.38C354.747 339.203 354.758 339.018 354.73 338.837L353.288 329.153C353.262 328.963 353.194 328.78 353.089 328.619C352.984 328.457 352.845 328.32 352.682 328.218C352.519 328.116 352.335 328.051 352.144 328.027C351.953 328.004 351.759 328.022 351.576 328.082L349.518 328.747C349.219 328.853 348.967 329.063 348.809 329.339C348.651 329.614 348.597 329.938 348.656 330.25Z"
      fill="#FF9141"
    />
    <path
      opacity="0.6"
      d="M348.656 330.25L350.393 339.342C350.454 339.653 350.625 339.931 350.873 340.128C351.121 340.324 351.432 340.426 351.748 340.414L353.498 340.34C353.681 340.332 353.86 340.285 354.024 340.203C354.188 340.121 354.333 340.005 354.449 339.863C354.565 339.721 354.65 339.557 354.699 339.38C354.747 339.203 354.758 339.018 354.73 338.837L353.288 329.153C353.262 328.963 353.194 328.78 353.089 328.619C352.984 328.457 352.845 328.32 352.682 328.218C352.519 328.116 352.335 328.051 352.144 328.027C351.953 328.004 351.759 328.022 351.576 328.082L349.518 328.747C349.219 328.853 348.967 329.063 348.809 329.339C348.651 329.614 348.597 329.938 348.656 330.25Z"
      fill="white"
    />
    <path
      d="M429.968 252.141C429.278 258.424 429.056 269.833 433.738 273.578C433.738 273.578 431.951 279.923 419.915 281.105C411.365 277.336 414.543 275.241 414.543 275.241C421.282 272.962 421.935 267.911 420.408 263.217L429.968 252.141Z"
      fill="#EBB376"
    />
    <path
      opacity="0.1"
      d="M428.909 259.127L426.445 258.486L423.389 259.718L420.383 263.192C420.787 264.385 421.015 265.63 421.061 266.888C427.689 265.878 428.909 259.127 428.909 259.127Z"
      fill="black"
    />
    <path
      d="M434.379 238.256C434.674 248.618 435.032 253.04 430.313 258.757C423.204 267.381 410.416 265.533 407.016 255.468C403.96 246.412 403.973 231 413.681 225.973C415.821 224.858 418.211 224.308 420.624 224.376C423.036 224.444 425.391 225.127 427.465 226.362C429.539 227.596 431.263 229.341 432.473 231.429C433.683 233.517 434.339 235.88 434.379 238.293V238.256Z"
      fill="#EBB376"
    />
    <path
      d="M437.557 246.178C437.161 248.144 436 249.873 434.329 250.983C432.099 252.437 430.19 250.638 430.141 248.112C430.141 245.858 431.212 242.371 433.763 241.952C434.321 241.874 434.889 241.934 435.419 242.127C435.948 242.321 436.421 242.642 436.797 243.063C437.172 243.483 437.438 243.99 437.57 244.538C437.703 245.085 437.698 245.657 437.557 246.203V246.178Z"
      fill="#EBB376"
    />
    <path
      d="M412.19 244.626C411.624 246.604 410.795 248.498 409.726 250.256C410.179 250.525 410.685 250.691 411.209 250.742C411.732 250.793 412.261 250.728 412.757 250.552L412.19 244.626Z"
      fill="#D58745"
    />
    <path
      d="M419.151 238.7C419.223 238.678 419.288 238.635 419.336 238.577C419.41 238.499 419.452 238.395 419.452 238.287C419.452 238.179 419.41 238.076 419.336 237.998C418.781 237.466 418.106 237.076 417.368 236.862C416.63 236.647 415.851 236.614 415.098 236.766C414.992 236.795 414.902 236.864 414.847 236.958C414.792 237.052 414.776 237.165 414.802 237.271C414.828 237.375 414.895 237.465 414.987 237.521C415.08 237.576 415.19 237.593 415.295 237.567C415.921 237.456 416.565 237.496 417.173 237.682C417.781 237.869 418.337 238.196 418.794 238.638C418.845 238.674 418.904 238.698 418.966 238.709C419.027 238.719 419.091 238.716 419.151 238.7Z"
      fill="#2E353A"
    />
    <path
      d="M404.687 239.624C404.616 239.611 404.549 239.581 404.49 239.538C404.448 239.504 404.412 239.462 404.386 239.415C404.36 239.367 404.343 239.315 404.337 239.261C404.332 239.207 404.337 239.153 404.352 239.101C404.368 239.049 404.394 239 404.429 238.959C404.903 238.351 405.517 237.865 406.218 237.544C406.919 237.222 407.687 237.074 408.457 237.111C408.564 237.126 408.661 237.182 408.727 237.267C408.794 237.352 408.825 237.459 408.815 237.567C408.802 237.672 408.749 237.769 408.666 237.836C408.583 237.903 408.477 237.934 408.371 237.924C407.734 237.904 407.102 238.035 406.526 238.307C405.95 238.579 405.446 238.984 405.057 239.488C405.013 239.541 404.955 239.582 404.89 239.606C404.825 239.629 404.755 239.636 404.687 239.624Z"
      fill="#2E353A"
    />
    <path
      d="M417.981 242.704C418.067 243.542 417.673 244.256 417.118 244.318C416.564 244.379 416.071 243.739 415.997 242.889C415.923 242.039 416.305 241.336 416.847 241.275C417.389 241.213 417.907 241.854 417.981 242.704Z"
      fill="#2E353A"
    />
    <path
      d="M408.494 243.566C408.581 244.392 408.186 245.119 407.644 245.168C407.102 245.217 406.597 244.577 406.511 243.739C406.424 242.901 406.819 242.187 407.361 242.137C407.903 242.088 408.433 242.704 408.494 243.566Z"
      fill="#2E353A"
    />
    <path
      d="M407.607 242.15L405.55 241.755C405.55 241.755 406.72 243.234 407.607 242.15Z"
      fill="#2E353A"
    />
    <path
      d="M417.094 241.287L415.036 240.893C415.036 240.893 416.207 242.371 417.094 241.287Z"
      fill="#2E353A"
    />
    <path
      d="M412.24 253.878C413.502 254.036 414.784 253.903 415.988 253.491C417.192 253.079 418.286 252.399 419.188 251.5C419.188 251.5 422.268 257.106 413.964 258.018C413.832 256.493 413.229 255.046 412.24 253.878Z"
      fill="#263238"
    />
    <path
      d="M412.979 253.94L413.582 255.172C413.582 255.172 417.5 255.172 419.582 252.474C419.483 252.121 419.351 251.779 419.188 251.451C418.381 252.272 417.412 252.917 416.344 253.345C415.275 253.774 414.129 253.976 412.979 253.94Z"
      fill="white"
    />
    <path
      d="M414.531 257.932C418.597 257.34 419.656 255.468 419.742 253.964C415.726 255.024 414.753 257.032 414.531 257.932Z"
      fill="#DE5753"
    />
    <path
      d="M416.281 230.014C415.532 231.404 414.465 232.597 413.168 233.497C411.87 234.396 410.379 234.976 408.815 235.189C403.221 236.162 405.217 250.761 405.217 250.761C405.217 250.761 393.131 221.292 419.447 223.386L416.281 230.014Z"
      fill="#263238"
    />
    <path
      d="M420.112 223.953C419.674 223.853 419.22 223.846 418.78 223.931C418.339 224.017 417.921 224.193 417.552 224.449C417.183 224.706 416.872 225.036 416.638 225.419C416.404 225.803 416.253 226.231 416.194 226.676C415.886 229.14 416.404 232.22 420.383 233.501C427.418 235.756 426.765 243.197 426.765 243.197L427.997 237.677C427.997 237.677 428.391 245.562 432.358 244.626C436.325 243.69 436.719 236.248 436.719 236.248L430.165 226.22L420.112 223.953Z"
      fill="#263238"
    />
    <path
      d="M415.652 273.221C415.743 273.184 415.841 273.173 415.938 273.188C416.034 273.204 416.124 273.246 416.198 273.31C416.272 273.374 416.327 273.457 416.356 273.55C416.386 273.642 416.39 273.742 416.367 273.837C415.899 275.869 415.492 280.28 420.851 280.28C426.21 280.28 431.028 275.906 433.085 273.8C433.398 273.479 433.799 273.257 434.237 273.163C434.675 273.069 435.132 273.106 435.549 273.27L436.953 273.824C437.102 273.883 437.235 273.974 437.345 274.09C437.454 274.206 437.537 274.345 437.587 274.496C437.638 274.647 437.655 274.808 437.637 274.966C437.619 275.125 437.566 275.277 437.483 275.414C435.105 279.356 426.58 291.922 419.693 281.734C419.693 281.734 415.689 287.894 413.225 282.387C412.319 280.306 412.124 277.985 412.671 275.783C412.787 275.296 413.021 274.845 413.351 274.469C413.682 274.094 414.1 273.804 414.568 273.627L415.652 273.221Z"
      fill="#FF9141"
    />
    <path
      opacity="0.6"
      d="M415.652 273.221C415.743 273.184 415.841 273.173 415.938 273.188C416.034 273.204 416.124 273.246 416.198 273.31C416.272 273.374 416.327 273.457 416.356 273.55C416.386 273.642 416.39 273.742 416.367 273.837C415.899 275.869 415.492 280.28 420.851 280.28C426.21 280.28 431.028 275.906 433.085 273.8C433.398 273.479 433.799 273.257 434.237 273.163C434.675 273.069 435.132 273.106 435.549 273.27L436.953 273.824C437.102 273.883 437.235 273.974 437.345 274.09C437.454 274.206 437.537 274.345 437.587 274.496C437.638 274.647 437.655 274.808 437.637 274.966C437.619 275.125 437.566 275.277 437.483 275.414C435.105 279.356 426.58 291.922 419.693 281.734C419.693 281.734 415.689 287.894 413.225 282.387C412.319 280.306 412.124 277.985 412.671 275.783C412.787 275.296 413.021 274.845 413.351 274.469C413.682 274.094 414.1 273.804 414.568 273.627L415.652 273.221Z"
      fill="white"
    />
    <path
      d="M391.542 280.674C391.708 280.546 391.899 280.454 392.102 280.403C392.305 280.352 392.517 280.343 392.723 280.377C392.93 280.411 393.128 280.487 393.304 280.601C393.48 280.715 393.631 280.864 393.747 281.038C393.863 281.213 393.942 281.409 393.978 281.616C394.015 281.822 394.009 282.034 393.961 282.238C393.912 282.441 393.822 282.633 393.697 282.801C393.571 282.969 393.412 283.109 393.23 283.212L370.943 297.996C370.776 298.106 370.59 298.182 370.394 298.22C370.197 298.258 369.996 298.257 369.8 298.217C369.405 298.136 369.058 297.901 368.836 297.565C368.614 297.228 368.535 296.817 368.615 296.422C368.696 296.027 368.931 295.68 369.267 295.458L391.542 280.674Z"
      fill="#263238"
    />
    <path
      opacity="0.6"
      d="M391.542 280.674C391.708 280.546 391.899 280.454 392.102 280.403C392.305 280.352 392.517 280.343 392.723 280.377C392.93 280.411 393.128 280.487 393.304 280.601C393.48 280.715 393.631 280.864 393.747 281.038C393.863 281.213 393.942 281.409 393.978 281.616C394.015 281.822 394.009 282.034 393.961 282.238C393.912 282.441 393.822 282.633 393.697 282.801C393.571 282.969 393.412 283.109 393.23 283.212L370.943 297.996C370.776 298.106 370.59 298.182 370.394 298.22C370.197 298.258 369.996 298.257 369.8 298.217C369.405 298.136 369.058 297.901 368.836 297.565C368.614 297.228 368.535 296.817 368.615 296.422C368.696 296.027 368.931 295.68 369.267 295.458L391.542 280.674Z"
      fill="white"
    />
    <path
      d="M369.267 295.421C368.561 296.154 367.964 296.983 367.493 297.885C367.449 297.963 367.427 298.052 367.43 298.141C367.434 298.231 367.462 298.317 367.512 298.392C367.562 298.466 367.631 298.525 367.713 298.562C367.795 298.598 367.885 298.612 367.974 298.6C368.989 298.525 369.989 298.305 370.943 297.947C371.11 297.837 371.253 297.695 371.365 297.53C371.477 297.364 371.555 297.178 371.595 296.983C371.635 296.787 371.636 296.586 371.598 296.39C371.56 296.193 371.484 296.007 371.374 295.84C371.264 295.674 371.122 295.53 370.957 295.418C370.791 295.306 370.606 295.228 370.41 295.188C370.214 295.148 370.013 295.147 369.817 295.185C369.621 295.223 369.434 295.299 369.267 295.409V295.421Z"
      fill="#263238"
    />
    <path
      opacity="0.8"
      d="M369.267 295.421C368.561 296.154 367.964 296.983 367.493 297.885C367.449 297.963 367.427 298.052 367.43 298.141C367.434 298.231 367.462 298.317 367.512 298.392C367.562 298.466 367.631 298.525 367.713 298.562C367.795 298.598 367.885 298.612 367.974 298.6C368.989 298.525 369.989 298.305 370.943 297.947C371.11 297.837 371.253 297.695 371.365 297.53C371.477 297.364 371.555 297.178 371.595 296.983C371.635 296.787 371.636 296.586 371.598 296.39C371.56 296.193 371.484 296.007 371.374 295.84C371.264 295.674 371.122 295.53 370.957 295.418C370.791 295.306 370.606 295.228 370.41 295.188C370.214 295.148 370.013 295.147 369.817 295.185C369.621 295.223 369.434 295.299 369.267 295.409V295.421Z"
      fill="white"
    />
    <path
      d="M400.043 305.265L390.322 298.452L388.08 289.126C387.873 288.225 387.416 287.401 386.762 286.747C386.109 286.094 385.285 285.637 384.384 285.43C383.217 285.165 381.993 285.334 380.941 285.905C379.889 286.476 379.081 287.411 378.668 288.534L377.916 290.555C377.714 291.103 377.61 291.683 377.608 292.267V293.98C377.608 295.211 378.07 296.398 378.902 297.306L380.232 298.76C380.589 299.147 381.005 299.476 381.464 299.733L387.23 302.949L396.334 312.041L400.043 305.265Z"
      fill="#EBB376"
    />
    <path
      d="M449.754 277.644C449.973 277.027 450.348 276.478 450.844 276.052C451.34 275.625 451.938 275.335 452.58 275.211C453.223 275.086 453.886 275.132 454.505 275.342C455.124 275.553 455.678 275.921 456.111 276.412C458.169 278.949 459.351 283.804 455.84 293.376C448.83 312.411 437.668 327.355 423.685 327.355C407.102 327.355 390.322 308.16 390.322 308.16L396.137 301.31C396.137 301.31 412.979 312.731 424.215 312.731C430.633 312.78 441.056 300.312 449.754 277.644Z"
      fill="#FF9141"
    />
    <path
      opacity="0.2"
      d="M449.754 277.644C449.973 277.027 450.348 276.478 450.844 276.052C451.34 275.625 451.938 275.335 452.58 275.211C453.223 275.086 453.886 275.132 454.505 275.342C455.124 275.553 455.678 275.921 456.111 276.412C458.169 278.949 459.351 283.804 455.84 293.376C448.83 312.411 437.668 327.355 423.685 327.355C407.102 327.355 390.322 308.16 390.322 308.16L396.137 301.31C396.137 301.31 412.979 312.731 424.215 312.731C430.633 312.78 441.056 300.312 449.754 277.644Z"
      fill="white"
    />
    <path
      d="M388.868 307.458L395.423 299.548C395.533 299.416 395.691 299.33 395.863 299.309C396.034 299.289 396.208 299.335 396.347 299.438L399.156 301.483C399.231 301.537 399.295 301.607 399.343 301.687C399.39 301.767 399.421 301.856 399.432 301.949C399.444 302.041 399.436 302.135 399.41 302.224C399.383 302.314 399.339 302.397 399.279 302.468L391.887 311.351C391.819 311.434 391.733 311.5 391.635 311.544C391.537 311.587 391.43 311.606 391.323 311.6C391.216 311.594 391.112 311.563 391.019 311.509C390.927 311.455 390.848 311.38 390.79 311.289L388.795 308.271C388.719 308.145 388.685 307.999 388.698 307.852C388.712 307.706 388.771 307.568 388.868 307.458Z"
      fill="#FF9141"
    />
    <path
      opacity="0.6"
      d="M388.868 307.458L395.423 299.548C395.533 299.416 395.691 299.33 395.863 299.309C396.034 299.289 396.208 299.335 396.347 299.438L399.156 301.483C399.231 301.537 399.295 301.607 399.343 301.687C399.39 301.767 399.421 301.856 399.432 301.949C399.444 302.041 399.436 302.135 399.41 302.224C399.383 302.314 399.339 302.397 399.279 302.468L391.887 311.351C391.819 311.434 391.733 311.5 391.635 311.544C391.537 311.587 391.43 311.606 391.323 311.6C391.216 311.594 391.112 311.563 391.019 311.509C390.927 311.455 390.848 311.38 390.79 311.289L388.795 308.271C388.719 308.145 388.685 307.999 388.698 307.852C388.712 307.706 388.771 307.568 388.868 307.458Z"
      fill="white"
    />
    <path
      d="M419.126 223.288H416.823V223.374C421.062 223.818 424.986 225.817 427.839 228.983C430.691 232.15 432.271 236.261 432.272 240.523H436.362C436.359 235.953 434.542 231.571 431.31 228.339C428.079 225.108 423.697 223.291 419.126 223.288Z"
      fill="#263238"
    />
    <path
      opacity="0.6"
      d="M419.126 223.288H416.823V223.374C421.062 223.818 424.986 225.817 427.839 228.983C430.691 232.15 432.271 236.261 432.272 240.523H436.362C436.359 235.953 434.542 231.571 431.31 228.339C428.079 225.108 423.697 223.291 419.126 223.288Z"
      fill="white"
    />
    <path
      d="M434.379 253.977C437.468 253.977 439.972 250.629 439.972 246.499C439.972 242.368 437.468 239.02 434.379 239.02C431.289 239.02 428.785 242.368 428.785 246.499C428.785 250.629 431.289 253.977 434.379 253.977Z"
      fill="#FF9141"
    />
    <path
      d="M440.613 246.499C440.613 249.837 439.602 251.427 436.917 251.427C434.231 251.427 433.221 249.862 433.221 246.499C433.221 243.135 434.243 241.571 436.917 241.571C439.59 241.571 440.613 243.148 440.613 246.499Z"
      fill="#263238"
    />
    <path
      opacity="0.5"
      d="M440.613 246.499C440.613 249.837 439.602 251.427 436.917 251.427C434.231 251.427 433.221 249.862 433.221 246.499C433.221 243.135 434.243 241.571 436.917 241.571C439.59 241.571 440.613 243.148 440.613 246.499Z"
      fill="white"
    />
    <path
      d="M437.73 250.946C439.567 250.946 441.056 248.955 441.056 246.499C441.056 244.042 439.567 242.051 437.73 242.051C435.892 242.051 434.403 244.042 434.403 246.499C434.403 248.955 435.892 250.946 437.73 250.946Z"
      fill="#263238"
    />
    <path
      opacity="0.7"
      d="M437.73 250.946C439.567 250.946 441.056 248.955 441.056 246.499C441.056 244.042 439.567 242.051 437.73 242.051C435.892 242.051 434.403 244.042 434.403 246.499C434.403 248.955 435.892 250.946 437.73 250.946Z"
      fill="white"
    />
    <path
      d="M209.539 506.315H203.637L201.05 351.945H212.126L209.539 506.315Z"
      fill="#263238"
    />
    <path
      opacity="0.7"
      d="M209.539 506.315H203.637L201.05 351.945H212.126L209.539 506.315Z"
      fill="white"
    />
    <path
      d="M274.724 506.315H268.81L266.223 351.945H277.311L274.724 506.315Z"
      fill="#263238"
    />
    <path
      opacity="0.7"
      d="M274.724 506.315H268.81L266.223 351.945H277.311L274.724 506.315Z"
      fill="white"
    />
    <path
      d="M318.004 349.358H206.582V361.432H318.004V349.358Z"
      fill="#263238"
    />
    <path
      opacity="0.5"
      d="M318.004 349.358H206.582V361.432H318.004V349.358Z"
      fill="white"
    />
    <path
      d="M383.361 349.358H318.016V361.432H383.361V349.358Z"
      fill="#263238"
    />
    <path
      opacity="0.5"
      d="M383.361 349.358H318.016V361.432H383.361V349.358Z"
      fill="white"
    />
    <path
      d="M386.146 506.315H380.232L377.645 351.945H388.721L386.146 506.315Z"
      fill="#263238"
    />
    <path
      opacity="0.7"
      d="M386.146 506.315H380.232L377.645 351.945H388.721L386.146 506.315Z"
      fill="white"
    />
    <path
      d="M392.22 341.597H305.216C303.413 341.597 301.951 343.058 301.951 344.861V348.681C301.951 350.484 303.413 351.945 305.216 351.945H392.22C394.023 351.945 395.484 350.484 395.484 348.681V344.861C395.484 343.058 394.023 341.597 392.22 341.597Z"
      fill="#263238"
    />
    <path
      d="M313.248 341.597H195.136C193.333 341.597 191.872 343.058 191.872 344.861V348.681C191.872 350.484 193.333 351.945 195.136 351.945H313.248C315.051 351.945 316.513 350.484 316.513 348.681V344.861C316.513 343.058 315.051 341.597 313.248 341.597Z"
      fill="#263238"
    />
    <path
      opacity="0.2"
      d="M313.248 341.597H195.136C193.333 341.597 191.872 343.058 191.872 344.861V348.681C191.872 350.484 193.333 351.945 195.136 351.945H313.248C315.051 351.945 316.513 350.484 316.513 348.681V344.861C316.513 343.058 315.051 341.597 313.248 341.597Z"
      fill="white"
    />
    <path
      d="M320.961 506.315H315.059L312.472 351.945H323.548L320.961 506.315Z"
      fill="#263238"
    />
    <path
      opacity="0.7"
      d="M320.961 506.315H315.059L312.472 351.945H323.548L320.961 506.315Z"
      fill="white"
    />
    <path
      d="M317.856 341.609C317.399 341.609 316.96 341.427 316.636 341.104C316.313 340.78 316.131 340.342 316.131 339.884C316.131 339.427 316.313 338.988 316.636 338.665C316.96 338.341 317.399 338.159 317.856 338.159H364.857C365.314 338.159 365.753 338.341 366.076 338.665C366.4 338.988 366.582 339.427 366.582 339.884C366.582 340.342 366.4 340.78 366.076 341.104C365.753 341.427 365.314 341.609 364.857 341.609H317.856Z"
      fill="#FF9141"
    />
    <path
      d="M321.897 338.627L315.638 294.103C315.507 293.293 315.096 292.554 314.477 292.014C313.859 291.474 313.071 291.167 312.25 291.146H306.263V341.597H319.347C319.725 341.618 320.102 341.552 320.451 341.404C320.799 341.256 321.109 341.029 321.355 340.742C321.602 340.455 321.779 340.115 321.873 339.748C321.967 339.381 321.975 338.998 321.897 338.627Z"
      fill="#FF9141"
    />
    <path
      d="M316.76 341.597H263.648C262.827 341.575 262.039 341.266 261.423 340.723C260.806 340.181 260.399 339.439 260.272 338.628L254.014 294.103C253.938 293.734 253.948 293.351 254.043 292.986C254.137 292.621 254.315 292.283 254.561 291.997C254.808 291.711 255.116 291.486 255.464 291.339C255.811 291.191 256.187 291.125 256.564 291.146H309.7C310.52 291.17 311.307 291.477 311.925 292.017C312.543 292.556 312.954 293.294 313.088 294.103L319.347 338.628C319.426 339.001 319.417 339.388 319.321 339.758C319.226 340.127 319.045 340.47 318.794 340.758C318.543 341.046 318.229 341.271 317.876 341.417C317.523 341.563 317.14 341.624 316.76 341.597Z"
      fill="#FF9141"
    />
    <path
      opacity="0.7"
      d="M316.76 341.597H263.648C262.827 341.575 262.039 341.266 261.423 340.723C260.806 340.181 260.399 339.439 260.272 338.628L254.014 294.103C253.938 293.734 253.948 293.351 254.043 292.986C254.137 292.621 254.315 292.283 254.561 291.997C254.808 291.711 255.116 291.486 255.464 291.339C255.811 291.191 256.187 291.125 256.564 291.146H309.7C310.52 291.17 311.307 291.477 311.925 292.017C312.543 292.556 312.954 293.294 313.088 294.103L319.347 338.628C319.426 339.001 319.417 339.388 319.321 339.758C319.226 340.127 319.045 340.47 318.794 340.758C318.543 341.046 318.229 341.271 317.876 341.417C317.523 341.563 317.14 341.624 316.76 341.597Z"
      fill="white"
    />
    <path
      opacity="0.7"
      d="M289.237 315.158C289.297 315.495 289.282 315.841 289.192 316.171C289.102 316.501 288.94 316.807 288.717 317.067C288.494 317.326 288.216 317.533 287.903 317.671C287.59 317.81 287.25 317.877 286.908 317.868C286.159 317.844 285.441 317.561 284.877 317.067C284.313 316.572 283.938 315.898 283.816 315.158C283.755 314.821 283.771 314.475 283.861 314.145C283.951 313.815 284.113 313.509 284.336 313.249C284.559 312.99 284.837 312.783 285.15 312.644C285.462 312.506 285.802 312.438 286.144 312.448C286.895 312.467 287.616 312.749 288.18 313.244C288.745 313.739 289.119 314.416 289.237 315.158Z"
      fill="white"
    />
    <path
      d="M243.628 315.959H223.103C222.777 315.959 222.455 316.031 222.159 316.169C221.864 316.307 221.603 316.509 221.394 316.759C221.185 317.009 221.033 317.302 220.949 317.617C220.866 317.932 220.852 318.262 220.91 318.583V318.768C219.886 318.513 218.811 318.547 217.805 318.866C214.109 319.975 213.998 323.277 215.107 326.985C216.216 330.693 218.113 333.392 221.822 332.283C222.418 332.1 222.987 331.835 223.509 331.494C224.245 333.229 225.437 334.733 226.959 335.843V338.554H239.698V335.843C241.843 334.289 243.308 331.968 243.788 329.363L245.784 318.583C245.841 318.265 245.829 317.939 245.747 317.626C245.666 317.313 245.517 317.022 245.312 316.773C245.107 316.523 244.85 316.321 244.56 316.181C244.269 316.04 243.951 315.964 243.628 315.959ZM221.341 329.93C218.877 330.656 217.645 328.882 216.931 326.443C216.216 324.004 216.278 321.848 218.705 321.121C219.599 320.826 220.573 320.896 221.415 321.318L222.856 329.104C222.418 329.487 221.901 329.769 221.341 329.93Z"
      fill="#FF9141"
    />
    <path
      opacity="0.5"
      d="M243.628 315.959H223.103C222.777 315.959 222.455 316.031 222.159 316.169C221.864 316.307 221.603 316.509 221.394 316.759C221.185 317.009 221.033 317.302 220.949 317.617C220.866 317.932 220.852 318.262 220.91 318.583V318.768C219.886 318.513 218.811 318.547 217.805 318.866C214.109 319.975 213.998 323.277 215.107 326.985C216.216 330.693 218.113 333.392 221.822 332.283C222.418 332.1 222.987 331.835 223.509 331.494C224.245 333.229 225.437 334.733 226.959 335.843V338.554H239.698V335.843C241.843 334.289 243.308 331.968 243.788 329.363L245.784 318.583C245.841 318.265 245.829 317.939 245.747 317.626C245.666 317.313 245.517 317.022 245.312 316.773C245.107 316.523 244.85 316.321 244.56 316.181C244.269 316.04 243.951 315.964 243.628 315.959ZM221.341 329.93C218.877 330.656 217.645 328.882 216.931 326.443C216.216 324.004 216.278 321.848 218.705 321.121C219.599 320.826 220.573 320.896 221.415 321.318L222.856 329.104C222.418 329.487 221.901 329.769 221.341 329.93Z"
      fill="white"
    />
    <path
      d="M240.24 341.744H226.454C225.594 341.747 224.747 341.535 223.99 341.128L219.308 338.566C219.127 338.463 218.984 338.303 218.903 338.112C218.821 337.92 218.805 337.706 218.857 337.504C218.909 337.302 219.026 337.123 219.19 336.994C219.354 336.866 219.556 336.794 219.764 336.792H246.868C247.077 336.794 247.279 336.866 247.443 336.994C247.607 337.123 247.724 337.302 247.775 337.504C247.827 337.706 247.811 337.92 247.73 338.112C247.648 338.303 247.505 338.463 247.324 338.566L242.642 341.128C241.903 341.526 241.079 341.737 240.24 341.744Z"
      fill="#FF9141"
    />
    <path
      opacity="0.4"
      d="M240.24 341.744H226.454C225.594 341.747 224.747 341.535 223.99 341.128L219.308 338.566C219.127 338.463 218.984 338.303 218.903 338.112C218.821 337.92 218.805 337.706 218.857 337.504C218.909 337.302 219.026 337.123 219.19 336.994C219.354 336.866 219.556 336.794 219.764 336.792H246.868C247.077 336.794 247.279 336.866 247.443 336.994C247.607 337.123 247.724 337.302 247.775 337.504C247.827 337.706 247.811 337.92 247.73 338.112C247.648 338.303 247.505 338.463 247.324 338.566L242.642 341.128C241.903 341.526 241.079 341.737 240.24 341.744Z"
      fill="white"
    />
    <path
      d="M332.11 169.141H250.613C247.048 169.141 244.158 172.032 244.158 175.597V240.388C244.158 243.953 247.048 246.843 250.613 246.843H332.11C335.676 246.843 338.566 243.953 338.566 240.388V175.597C338.566 172.032 335.676 169.141 332.11 169.141Z"
      fill="#FF9141"
    />
    <path
      opacity="0.6"
      d="M332.11 169.141H250.613C247.048 169.141 244.158 172.032 244.158 175.597V240.388C244.158 243.953 247.048 246.843 250.613 246.843H332.11C335.676 246.843 338.566 243.953 338.566 240.388V175.597C338.566 172.032 335.676 169.141 332.11 169.141Z"
      fill="white"
    />
    <path
      d="M288.079 183.728C288.079 183.728 281.056 180.131 277.483 188.04C273.911 195.95 264.88 191.194 268.675 207.222C272.469 223.251 256.256 217.805 264.055 229.509C271.853 241.213 283.767 233.205 290.296 233.415C296.826 233.624 309.441 237.727 312.472 230.433C315.503 223.14 310.316 220.688 310.205 216.733C310.094 212.779 316.661 203.305 311.339 199.017C301.606 191.132 305.437 179.305 288.079 183.728Z"
      fill="#2E353A"
    />
    <path
      d="M290.296 224.495C298.747 224.495 305.598 215.73 305.598 204.919C305.598 194.107 298.747 185.342 290.296 185.342C281.845 185.342 274.995 194.107 274.995 204.919C274.995 215.73 281.845 224.495 290.296 224.495Z"
      fill="#B97964"
    />
    <path
      d="M291.331 205.806C291.697 207.608 292.315 209.35 293.167 210.98C292.747 211.188 292.287 211.301 291.818 211.312C291.35 211.322 290.885 211.23 290.456 211.042L291.331 205.806Z"
      fill="#A24E3F"
    />
    <path
      d="M284.592 205.867C284.592 206.582 284.875 207.185 285.344 207.222C285.812 207.259 286.218 206.693 286.268 205.99C286.317 205.288 285.972 204.684 285.516 204.66C285.06 204.635 284.592 205.165 284.592 205.867Z"
      fill="#2E353A"
    />
    <path
      d="M282.042 203.366C281.977 203.379 281.91 203.379 281.845 203.366C281.772 203.285 281.732 203.18 281.732 203.071C281.732 202.961 281.772 202.856 281.845 202.775C282.273 202.265 282.815 201.864 283.427 201.603C284.039 201.341 284.704 201.228 285.368 201.272C285.478 201.29 285.577 201.35 285.644 201.44C285.71 201.53 285.74 201.642 285.725 201.752C285.719 201.807 285.702 201.86 285.675 201.908C285.648 201.956 285.612 201.998 285.568 202.031C285.524 202.065 285.474 202.089 285.421 202.102C285.367 202.116 285.312 202.118 285.257 202.11C284.731 202.081 284.205 202.177 283.723 202.391C283.241 202.605 282.817 202.931 282.485 203.342C282.421 203.386 282.345 203.411 282.267 203.415C282.189 203.42 282.111 203.403 282.042 203.366Z"
      fill="#2E353A"
    />
    <path
      d="M297.368 205.867C297.368 206.582 297.072 207.185 296.604 207.222C296.136 207.259 295.729 206.693 295.68 205.99C295.631 205.288 295.976 204.684 296.444 204.66C296.912 204.635 297.319 205.165 297.368 205.867Z"
      fill="#2E353A"
    />
    <path
      d="M299.906 203.366C299.975 203.379 300.046 203.379 300.115 203.366C300.188 203.285 300.228 203.18 300.228 203.071C300.228 202.961 300.188 202.856 300.115 202.775C299.688 202.264 299.146 201.862 298.534 201.601C297.921 201.34 297.256 201.227 296.592 201.272C296.483 201.293 296.386 201.354 296.32 201.443C296.254 201.532 296.223 201.642 296.234 201.752C296.242 201.808 296.26 201.861 296.289 201.909C296.317 201.957 296.355 201.999 296.4 202.032C296.444 202.065 296.495 202.089 296.549 202.103C296.604 202.116 296.66 202.118 296.715 202.11C297.241 202.082 297.767 202.18 298.248 202.394C298.73 202.608 299.154 202.933 299.487 203.342C299.547 203.385 299.619 203.41 299.693 203.414C299.767 203.419 299.841 203.402 299.906 203.366Z"
      fill="#2E353A"
    />
    <path
      d="M291.343 216.733C291.756 216.731 292.169 216.694 292.575 216.623C292.633 216.611 292.684 216.577 292.718 216.529C292.753 216.481 292.768 216.422 292.76 216.364C292.756 216.335 292.745 216.306 292.73 216.281C292.714 216.256 292.694 216.234 292.67 216.217C292.646 216.2 292.618 216.187 292.589 216.181C292.561 216.174 292.531 216.174 292.501 216.179C291.568 216.356 290.606 216.314 289.692 216.058C288.777 215.802 287.934 215.337 287.228 214.701C287.185 214.66 287.128 214.637 287.068 214.637C287.009 214.637 286.952 214.66 286.908 214.701C286.887 214.721 286.869 214.746 286.858 214.774C286.846 214.801 286.84 214.831 286.84 214.861C286.84 214.891 286.846 214.92 286.858 214.948C286.869 214.975 286.887 215 286.908 215.021C288.107 216.147 289.698 216.762 291.343 216.733Z"
      fill="#2E353A"
    />
    <path
      d="M288.867 237.296C295.038 237.212 301.094 235.608 306.497 232.626C304.535 232.258 302.543 232.068 300.546 232.06C297.325 233.831 293.688 234.708 290.013 234.597C283.385 234.597 279.812 232.06 279.812 232.06C278.342 232.058 276.873 232.145 275.414 232.318C277.348 234.228 281.574 237.296 288.867 237.296Z"
      fill="#577AFB"
    />
    <path
      d="M298.809 234.252L301.606 232.478C300.167 232.266 298.802 231.708 297.627 230.852C294.017 228.154 295.976 221.267 295.976 221.267H285.615C285.368 225.394 285.479 229.041 283.151 230.754C281.776 231.813 280.105 232.416 278.37 232.478L282.066 234.684C281.832 235.201 284.53 236.174 284.53 236.174L294.818 236.753L296.789 235.521C296.789 235.521 299.376 235.029 298.809 234.252Z"
      fill="#B97964"
    />
    <path
      d="M279.812 232.06C279.812 232.06 283.385 234.597 290.013 234.597C293.688 234.708 297.325 233.831 300.546 232.06C300.546 232.06 321.084 231.653 321.084 246.844H261.738C261.738 246.844 259.077 232.06 279.812 232.06Z"
      fill="#FF9141"
    />
    <path
      d="M274.157 201.21C274.157 201.21 274.835 207.789 276.991 207.567C279.147 207.346 277.631 197.194 281.697 196.479C285.762 195.765 288.079 194.865 288.239 192.315C288.399 189.765 294.707 191.551 293.857 188.311C296.025 189.266 297.756 190.997 298.711 193.165C300.472 196.935 300.965 195.013 302.259 197.637C303.552 200.262 304.723 207.999 306.793 202.344C308.862 196.689 303.552 191.933 303.552 191.933L298.859 186.389L294.473 185.391L290.715 184.615H285.676L282.3 185.391L277.483 190.553L274.527 195.629L274.157 201.21Z"
      fill="#2E353A"
    />
    <path
      d="M276.744 205.892C277.902 208.134 277.68 210.709 276.251 211.645C274.822 212.582 272.716 211.497 271.57 209.255C270.424 207.013 270.633 204.438 272.063 203.502C273.492 202.565 275.598 203.65 276.744 205.892Z"
      fill="#B97964"
    />
    <path
      d="M302.998 205.892C301.84 208.134 302.074 210.709 303.503 211.645C304.932 212.582 307.027 211.497 308.185 209.255C309.343 207.013 309.121 204.438 307.68 203.502C306.238 202.565 304.156 203.65 302.998 205.892Z"
      fill="#B97964"
    />
    <path
      d="M274.551 207.604C274.242 207.683 273.976 207.879 273.808 208.15C273.641 208.421 273.585 208.746 273.652 209.058L274.28 213.087C274.298 213.193 274.358 213.287 274.445 213.35C274.533 213.412 274.642 213.437 274.748 213.419C274.854 213.401 274.949 213.342 275.011 213.254C275.074 213.166 275.099 213.057 275.081 212.951L274.637 210.155H274.896C275.193 210.06 275.446 209.863 275.61 209.598C275.774 209.333 275.838 209.018 275.79 208.711C275.743 208.403 275.587 208.122 275.351 207.919C275.114 207.717 274.813 207.605 274.502 207.604H274.551Z"
      fill="white"
    />
    <path
      d="M305.93 207.604C306.239 207.683 306.505 207.879 306.673 208.15C306.841 208.421 306.897 208.746 306.83 209.058L306.189 213.087C306.171 213.193 306.111 213.287 306.024 213.35C305.936 213.412 305.827 213.437 305.721 213.419C305.614 213.401 305.518 213.342 305.454 213.255C305.39 213.168 305.362 213.059 305.376 212.951L305.819 210.155H305.536C305.238 210.06 304.984 209.861 304.82 209.595C304.657 209.329 304.593 209.013 304.643 208.705C304.692 208.396 304.85 208.115 305.089 207.913C305.327 207.711 305.63 207.602 305.943 207.604H305.93Z"
      fill="white"
    />
    <path
      d="M337.309 180.229C343.44 180.229 348.41 175.259 348.41 169.129C348.41 162.998 343.44 158.029 337.309 158.029C331.179 158.029 326.209 162.998 326.209 169.129C326.209 175.259 331.179 180.229 337.309 180.229Z"
      fill="#FF9141"
    />
    <path
      d="M330.915 175.523C330.742 175.35 330.645 175.115 330.645 174.87C330.645 174.625 330.742 174.39 330.915 174.217L342.397 162.735C342.571 162.562 342.806 162.465 343.05 162.465C343.295 162.465 343.53 162.562 343.703 162.735C343.876 162.908 343.974 163.143 343.974 163.388C343.974 163.633 343.876 163.868 343.703 164.041L332.233 175.523C332.057 175.694 331.82 175.789 331.574 175.789C331.328 175.789 331.092 175.694 330.915 175.523Z"
      fill="white"
    />
    <path
      d="M340.968 175.745H337.728V173.281C338.677 173.18 339.554 172.732 340.192 172.022C340.829 171.312 341.18 170.391 341.178 169.437V168.131C341.178 168.104 341.172 168.076 341.162 168.051C341.151 168.025 341.136 168.002 341.116 167.983C341.097 167.963 341.074 167.948 341.048 167.938C341.023 167.927 340.996 167.922 340.968 167.922H340.451C340.394 167.921 340.34 167.943 340.298 167.982C340.257 168.021 340.232 168.074 340.229 168.131C340.229 168.16 340.235 168.188 340.246 168.214C340.257 168.24 340.274 168.264 340.295 168.284C340.316 168.303 340.34 168.318 340.367 168.328C340.394 168.338 340.422 168.342 340.451 168.34H340.759V169.437C340.759 170.352 340.395 171.229 339.749 171.876C339.102 172.523 338.224 172.887 337.309 172.887C336.394 172.887 335.517 172.523 334.87 171.876C334.223 171.229 333.86 170.352 333.86 169.437V168.34H334.18C334.236 168.34 334.289 168.318 334.328 168.279C334.367 168.24 334.389 168.187 334.389 168.131C334.387 168.076 334.363 168.025 334.325 167.986C334.286 167.948 334.235 167.925 334.18 167.922H333.65C333.596 167.925 333.544 167.948 333.505 167.986C333.467 168.025 333.444 168.076 333.441 168.131V169.437C333.441 170.39 333.794 171.309 334.43 172.019C335.067 172.728 335.943 173.178 336.89 173.281V175.745H333.65C333.538 175.748 333.431 175.795 333.353 175.875C333.275 175.956 333.231 176.064 333.231 176.176V176.595H341.387V176.176C341.387 176.064 341.344 175.956 341.265 175.875C341.187 175.795 341.081 175.748 340.968 175.745Z"
      fill="white"
    />
    <path
      d="M334.71 169.486C334.755 170.146 335.049 170.765 335.533 171.216C336.017 171.668 336.654 171.919 337.315 171.919C337.977 171.919 338.614 171.668 339.098 171.216C339.581 170.765 339.876 170.146 339.921 169.486V164.275C339.946 163.918 339.897 163.559 339.777 163.222C339.657 162.884 339.469 162.575 339.225 162.313C338.98 162.052 338.685 161.843 338.356 161.7C338.028 161.557 337.674 161.484 337.315 161.484C336.957 161.484 336.603 161.557 336.275 161.7C335.946 161.843 335.651 162.052 335.406 162.313C335.162 162.575 334.974 162.884 334.854 163.222C334.734 163.559 334.685 163.918 334.71 164.275V169.486Z"
      fill="white"
    />
    <path
      d="M222.24 198.746H100.223C96.6578 198.746 93.7675 201.637 93.7675 205.202V296.308C93.7675 299.874 96.6578 302.764 100.223 302.764H222.24C225.806 302.764 228.696 299.874 228.696 296.308V205.202C228.696 201.637 225.806 198.746 222.24 198.746Z"
      fill="#FF9141"
    />
    <path
      d="M153.039 207.493C153.039 207.493 146.78 205.584 145.388 219.013C143.996 232.441 134.387 236.914 144.588 241.842C154.788 246.77 164.644 241.373 168.648 241.842C172.652 242.31 179.884 239.686 179.428 233.057C178.973 226.429 167.182 207.185 167.182 207.185L153.039 207.493Z"
      fill="#263238"
    />
    <path
      d="M204.056 266.605C201.851 273.997 195.518 293.586 190.677 292.908C184.726 292.095 180.624 270.732 180.624 270.732L182.262 244.86C182.262 244.86 188.829 244.86 191.712 277.927L198.66 262.97L204.056 266.605Z"
      fill="#263238"
    />
    <path
      d="M199.251 263.192L201.715 257.821L205.584 254.654L207.678 252.4C208.21 251.825 208.911 251.435 209.679 251.284C210.448 251.134 211.244 251.231 211.953 251.562L213.185 252.141C213.905 252.474 214.499 253.031 214.878 253.727C215.257 254.424 215.402 255.224 215.292 256.01L214.639 260.691L204.167 264.079C204.167 264.079 203.871 265.126 203.366 266.827L199.251 263.192Z"
      fill="#EEC1BB"
    />
    <path
      d="M198.266 261.307L205.608 266.334L205.042 269.118L196.923 263.352L198.266 261.307Z"
      fill="#263238"
    />
    <path
      opacity="0.2"
      d="M198.266 261.307L205.608 266.334L205.042 269.118L196.923 263.352L198.266 261.307Z"
      fill="white"
    />
    <path
      d="M142.321 302.764C142.321 302.764 141.2 273.405 132.366 247.324C148.713 243.498 165.618 242.663 182.262 244.86C182.262 244.86 186.365 263.549 181.437 302.764H142.321Z"
      fill="#263238"
    />
    <path
      opacity="0.2"
      d="M142.321 302.764C142.321 302.764 141.2 273.405 132.366 247.324C148.713 243.498 165.618 242.663 182.262 244.86C182.262 244.86 186.365 263.549 181.437 302.764H142.321Z"
      fill="white"
    />
    <path
      d="M148.555 286.354C150.045 285.787 150.92 285.43 150.92 285.43L157.548 282.35L162.476 277.668C162.782 277.375 163.02 277.017 163.173 276.622C163.325 276.226 163.389 275.802 163.36 275.378C163.331 274.955 163.209 274.544 163.003 274.173C162.797 273.802 162.512 273.481 162.168 273.233L159.051 271.04C158.735 270.814 158.377 270.653 157.998 270.568C157.619 270.483 157.226 270.474 156.844 270.543C156.461 270.612 156.097 270.757 155.771 270.969C155.446 271.182 155.166 271.457 154.949 271.779L149.38 280.071C149.38 280.071 148.148 280.428 146.152 280.921L148.555 286.354Z"
      fill="#EEC1BB"
    />
    <path
      d="M148.678 287.118C141.458 289.84 119.824 297.294 113.319 291.43C105.472 284.346 132.366 247.324 132.366 247.324C139.549 255.443 136.961 263.833 136.961 263.833C136.961 263.833 123.126 278.432 124.432 282.029C125.578 285.245 139.795 282.029 146.3 280.415L148.678 287.118Z"
      fill="#263238"
    />
    <path
      d="M147.15 279.528L150.23 287.327L147.766 288.768L144.588 279.528H147.15Z"
      fill="#263238"
    />
    <path
      opacity="0.2"
      d="M147.15 279.528L150.23 287.327L147.766 288.768L144.588 279.528H147.15Z"
      fill="white"
    />
    <path
      d="M165.913 243.702H163.622C163.272 241.365 163.487 238.978 164.25 236.741L155.257 227.575C155.712 231.764 155.91 239.698 153.951 244.059C152.719 244.145 151.573 244.244 150.452 244.355C151.019 246.006 153.187 250.207 160.653 250.207C168.119 250.207 166.739 245.488 165.913 243.702Z"
      fill="#EEC1BB"
    />
    <path
      opacity="0.1"
      d="M156.944 230.938L155.91 233.71C157.527 236.862 160.206 239.341 163.474 240.708C163.582 239.361 163.842 238.03 164.25 236.741L158.287 230.655L156.944 230.938Z"
      fill="black"
    />
    <path
      d="M150.674 220.713C152.854 229.016 153.593 232.589 158.694 236.064C166.357 241.312 176.09 236.827 176.447 228.031C176.78 220.109 173.17 207.851 164.275 206.126C162.319 205.747 160.299 205.872 158.405 206.49C156.511 207.107 154.805 208.197 153.449 209.657C152.093 211.117 151.131 212.898 150.654 214.832C150.177 216.766 150.201 218.79 150.723 220.713H150.674Z"
      fill="#EEC1BB"
    />
    <path
      d="M149.996 227.748C150.38 228.477 150.904 229.124 151.538 229.65C152.172 230.176 152.904 230.572 153.692 230.815C155.799 231.456 156.895 229.583 156.341 227.563C155.848 225.752 154.16 223.238 152.016 223.485C151.275 223.597 150.607 223.999 150.16 224.601C149.712 225.203 149.52 225.957 149.626 226.7C149.681 227.07 149.806 227.426 149.996 227.748Z"
      fill="#EEC1BB"
    />
    <path
      d="M169.819 220.602C170.73 222.045 171.837 223.355 173.108 224.495C172.813 224.817 172.45 225.069 172.045 225.233C171.64 225.397 171.204 225.469 170.768 225.444L169.819 220.602Z"
      fill="#D58745"
    />
    <path
      d="M162.415 217.485C162.358 217.498 162.299 217.498 162.242 217.485C162.166 217.437 162.112 217.361 162.092 217.273C162.071 217.186 162.085 217.094 162.131 217.017C162.448 216.462 162.892 215.991 163.428 215.644C163.964 215.297 164.576 215.083 165.211 215.021C165.302 215.021 165.389 215.055 165.456 215.117C165.522 215.178 165.562 215.263 165.568 215.354C165.572 215.443 165.54 215.53 165.481 215.597C165.421 215.664 165.337 215.705 165.248 215.711C164.724 215.767 164.22 215.947 163.779 216.236C163.337 216.525 162.971 216.915 162.71 217.374C162.676 217.419 162.631 217.453 162.578 217.472C162.526 217.492 162.469 217.496 162.415 217.485Z"
      fill="#2E353A"
    />
    <path
      d="M170.57 213.937C170.53 213.895 170.501 213.845 170.484 213.789C170.471 213.746 170.467 213.701 170.472 213.656C170.476 213.612 170.49 213.569 170.512 213.53C170.534 213.491 170.563 213.456 170.599 213.429C170.634 213.401 170.675 213.381 170.718 213.37C171.329 213.181 171.977 213.14 172.607 213.251C173.237 213.363 173.831 213.623 174.34 214.011C174.383 214.037 174.419 214.072 174.447 214.113C174.474 214.155 174.492 214.202 174.5 214.251C174.508 214.3 174.505 214.351 174.491 214.399C174.478 214.447 174.454 214.491 174.421 214.529C174.389 214.567 174.349 214.597 174.303 214.618C174.258 214.639 174.209 214.649 174.159 214.649C174.109 214.649 174.06 214.638 174.015 214.618C173.969 214.597 173.929 214.566 173.897 214.528C173.474 214.213 172.981 214.003 172.46 213.918C171.939 213.832 171.405 213.872 170.903 214.035C170.844 214.049 170.782 214.046 170.724 214.029C170.666 214.012 170.613 213.98 170.57 213.937Z"
      fill="#2E353A"
    />
    <path
      d="M164.755 220.417C164.891 221.107 165.359 221.649 165.815 221.501C166.271 221.353 166.517 220.787 166.369 220.097C166.221 219.407 165.766 218.939 165.322 219.025C164.879 219.111 164.62 219.727 164.755 220.417Z"
      fill="#2E353A"
    />
    <path
      d="M172.48 218.902C172.603 219.579 173.084 220.06 173.527 219.974C173.971 219.887 174.229 219.271 174.094 218.581C173.958 217.891 173.49 217.411 173.047 217.497C172.603 217.583 172.357 218.212 172.48 218.902Z"
      fill="#2E353A"
    />
    <path
      d="M172.874 217.571L174.427 216.783C174.427 216.783 173.835 218.224 172.874 217.571Z"
      fill="#2E353A"
    />
    <path
      d="M165.088 219.099L166.628 218.31C166.628 218.31 166.086 219.752 165.088 219.099Z"
      fill="#2E353A"
    />
    <path
      d="M171.519 227.637C169.604 227.529 167.683 227.586 165.778 227.809C166.14 228.471 166.706 228.999 167.392 229.314C168.078 229.629 168.847 229.715 169.585 229.559C171.741 229.361 171.519 227.637 171.519 227.637Z"
      fill="#2E353A"
    />
    <path
      d="M168.488 228.745C169.327 228.623 170.183 228.747 170.952 229.103C170.569 229.376 170.116 229.534 169.646 229.559C168.808 229.681 167.952 229.557 167.182 229.201C167.565 228.928 168.018 228.77 168.488 228.745Z"
      fill="#DE5753"
    />
    <path
      d="M171.322 227.624C171.292 227.772 171.22 227.909 171.115 228.018C171.011 228.127 170.877 228.204 170.731 228.24C169.5 228.336 168.265 228.336 167.035 228.24C166.84 228.246 166.647 228.205 166.472 228.121C166.296 228.038 166.143 227.914 166.024 227.76C167.785 227.588 169.555 227.542 171.322 227.624Z"
      fill="white"
    />
    <path
      d="M153.039 227.205C153.039 227.205 156.735 224.101 155.91 217.485C155.084 210.869 163.462 217.041 165.137 211.497C166.813 205.953 174.032 217.202 177.58 210.426C181.129 203.65 164.94 201.999 163.326 203.958C161.712 205.916 139.586 202.726 153.039 227.205Z"
      fill="#263238"
    />
    <path
      d="M217.805 282.177H104.646C103.027 282.177 101.714 283.49 101.714 285.109V290.678C101.714 292.297 103.027 293.61 104.646 293.61H217.805C219.425 293.61 220.737 292.297 220.737 290.678V285.109C220.737 283.49 219.425 282.177 217.805 282.177Z"
      fill="white"
    />
    <path
      d="M116.621 290.752V285.048L120.194 287.906L116.621 290.752Z"
      fill="#263238"
    />
    <path
      d="M125.947 289.582L127.512 287.931L125.947 286.267V289.582Z"
      fill="#263238"
    />
    <path
      d="M127.512 286.329V287.931V289.532H128.214V286.329H127.512Z"
      fill="#263238"
    />
    <path
      d="M110.855 286.267L109.303 287.931L110.855 289.582V286.267Z"
      fill="#263238"
    />
    <path
      d="M109.303 289.532V287.931V286.329H108.588V289.532H109.303Z"
      fill="#263238"
    />
    <path
      d="M215.218 287.093H139.117V288.768H215.218V287.093Z"
      fill="#263238"
    />
    <path
      d="M175.166 284.148H172.455V291.639H175.166V284.148Z"
      fill="#FF9141"
    />
    <path
      d="M411.24 196.522C414.899 181.019 405.298 165.486 389.795 161.827C374.292 158.168 358.759 167.769 355.1 183.272C351.441 198.774 361.042 214.308 376.545 217.967C392.047 221.626 407.581 212.024 411.24 196.522Z"
      fill="#FF9141"
    />
    <path
      opacity="0.7"
      d="M411.24 196.522C414.899 181.019 405.298 165.486 389.795 161.827C374.292 158.168 358.759 167.769 355.1 183.272C351.441 198.774 361.042 214.308 376.545 217.967C392.047 221.626 407.581 212.024 411.24 196.522Z"
      fill="white"
    />
    <g opacity="0.8">
      <path
        d="M377.362 199.707C378.923 198.191 381.013 197.344 383.189 197.344C385.365 197.344 387.455 198.191 389.016 199.707C390.581 201.149 392.946 198.808 391.369 197.354C389.172 195.237 386.24 194.054 383.189 194.054C380.138 194.054 377.206 195.237 375.009 197.354C373.432 198.808 375.785 201.149 377.362 199.707Z"
        fill="#FF9141"
      />
      <path
        d="M382.056 204.401C382.355 204.104 382.761 203.937 383.183 203.937C383.605 203.937 384.01 204.104 384.31 204.401C385.887 205.855 388.24 203.502 386.663 202.048C385.729 201.147 384.481 200.643 383.183 200.643C381.885 200.643 380.637 201.147 379.702 202.048C378.125 203.502 380.491 205.855 382.056 204.401Z"
        fill="#FF9141"
      />
      <path
        d="M371.177 193.523C374.395 190.403 378.701 188.658 383.183 188.658C387.665 188.658 391.971 190.403 395.189 193.523C396.766 194.964 399.119 192.623 397.542 191.169C393.686 187.451 388.539 185.374 383.183 185.374C377.827 185.374 372.679 187.451 368.824 191.169C367.247 192.623 369.612 194.976 371.177 193.523Z"
        fill="#FF9141"
      />
      <path
        d="M365.547 187.88C370.276 183.298 376.604 180.735 383.189 180.735C389.774 180.735 396.101 183.298 400.831 187.88C402.396 189.346 404.749 187.005 403.184 185.527C397.821 180.338 390.651 177.437 383.189 177.437C375.727 177.437 368.556 180.338 363.194 185.527C361.629 187.005 363.982 189.346 365.547 187.88Z"
        fill="#FF9141"
      />
    </g>
    <path
      d="M153.507 371.263C169.892 371.263 183.174 357.981 183.174 341.597C183.174 325.212 169.892 311.93 153.507 311.93C137.123 311.93 123.841 325.212 123.841 341.597C123.841 357.981 137.123 371.263 153.507 371.263Z"
      fill="#FF9141"
    />
    <path
      opacity="0.7"
      d="M153.507 371.263C169.892 371.263 183.174 357.981 183.174 341.597C183.174 325.212 169.892 311.93 153.507 311.93C137.123 311.93 123.841 325.212 123.841 341.597C123.841 357.981 137.123 371.263 153.507 371.263Z"
      fill="white"
    />
    <path
      d="M147.052 332.159V339.81L137.836 333.071V350.122L147.052 343.371V351.034H169.166V332.159H147.052Z"
      fill="#FF9141"
    />
  </svg>
);
