import React from 'react'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import { AccordionFaqs, MainLayout } from 'app/components'
import Link from 'next/link'
import Head from 'next/head'

const FAQS: NextPageWithLayout<{}> = () => {
  const onSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  const questionAndAnswers: Array<{
    question: string
    answer: React.ReactNode
  }> = [
    {
      question: 'What is Certification by Unify?',
      answer: `Certifications by Unify is an online learning platform that allows anyone to watch, listen and learn from our
      everyday STARS or Subject matter expert The goal is to aid
      prospective users to learn from powerfully talented
      individuals using brilliant storytelling, interactivity,
      and gamification.`,
    },
    {
      question: 'Who is Certification by Unify for?',
      answer: `The platform is available to anyone willing to improve a
      passion, learn a trade, advance a career or get inspiration
      from the industry best.`,
    },
    {
      question: 'How do I create a Certifications by Unify account?',
      answer: (
        <>
          To get started with your account, all you should do is;
          <br />
          <ol>
            <li>
              Step 1: Log on to Certifications by Unify’s Website –
              https://certication.unifyedu.ng/
            </li>
            <li>Step 2: Input your details on the sign-up form</li>
            <li>Step 3: Agree to the terms and conditions</li>
            <li>Step 4: Click on sign up </li>
          </ol>
          <p className="mt-3">You are all set!</p>
        </>
      ),
    },
    {
      question: 'How do I change my password?',
      answer: (
        <ol>
          <li>Step 1: Log on to Certifications by Unify Website</li>
          <li>Step 2: Click on the notification icon</li>
          <li>Step 3: Click on Account settings to change your password</li>
        </ol>
      ),
    },
    {
      question: 'How do I reset my password?',
      answer: (
        <ol>
          <li>Step 1: Go to the Log in page</li>
          <li>
            Step 2: Click &apos;Forgot Password&apos; to receive an email on
            your registered email address
          </li>
          <li>Step 3: Follow the instructions sent to you via email</li>
        </ol>
      ),
    },
    {
      question: 'How do I change my Profile Picture?',
      answer: (
        <ol>
          <li>Step 1: Log on to Certifications by Unify Website</li>
          <li>Step 2: Click on the notification icon</li>
          <li>
            Step 3: Under profile, you will see where you can upload your
            profile picture
          </li>
        </ol>
      ),
    },
    {
      question: 'How do I access the courses?',
      answer: `When you log into the platform, click on courses at the top of your screen`,
    },
    {
      question: 'How much does a course cost?',
      answer: 'The cost of a course varies per course.',
    },
    {
      question: 'How do I access free courses?',
      answer: (
        <ol>
          <li>Step 1: Log onto the platform</li>
          <li>Step 2: Click on courses</li>
          <li>
            Step 3: You will see all the courses, click on the courses that are
            inscribed &apos;free&apos;
          </li>
        </ol>
      ),
    },
    {
      question: 'Is Certification by Unify accredited?',
      answer: `Certifications by Unify is in partnership with an accredited
      business school called Harde Business school`,
    },
    {
      question: 'Is a Certificate offered upon completion of courses?',
      answer: `Yes, you will receive a certification on successful
      completion of courses and assessments.`,
    },
    {
      question: 'Is there a required pass mark for the assessment?',
      answer: `Learners are expected to score a minimum of 70% on each
      module`,
    },
    {
      question: 'What courses are offered on Certification by Unify?',
      answer: (
        <>
          Certifications by Unify offers a wide range of practical courses from
          our stars. You can view all the courses on our website{' '}
          <Link href="/courses/browseCourses">
            <a className="text-app-pink underline">here</a>
          </Link>
          .
        </>
      ),
    },
    {
      question: 'Do the courses have time limits for completion?',
      answer: `You have to finish a course 29 days at the latest after the
      start date.`,
    },
    {
      question: 'How long does each course take?',
      answer: `The length of each course is different and based on the
      instructor but an average of 2 -6 hours`,
    },
    {
      question: 'How soon can I get my certificate after completing a course?',
      answer: `You get your certificate immediately after you complete the
      course registered for. A link to download your certificate
      will also be sent to your email`,
    },
    {
      question: 'Where else can I access my certificate on the platform?',
      answer:
        'Log onto the platform and all the certificates you have earned will be displayed on your dashboard.',
    },
    {
      question: 'What kind of Credit cards are Accepted for Payment?',
      answer: (
        <>
          You can make payments on Certifications using the following credit
          cards:
          <ol>
            <li>* Visa </li>
            <li>* MasterCard</li>
            <li>* Verve</li>
          </ol>
        </>
      ),
    },
    {
      question: 'Can a Third-party pay for me?',
      answer: `Certifications by Unify doesn't offer gift cards or
      other options for making payments for another user. All
      Payments must be made using the same account to be used to
      take the course or Specialization. Payments can&apos;t be
      gifted or transferred across accounts.`,
    },
    {
      question:
        'Can a user be logged on to two or more devices at the same time?',
      answer: 'Yes, you can.',
    },
    {
      question: 'What do I do if I need help/assistance?',
      answer: (
        <>
          Email our Support -{' '}
          <a className = 'text-app-pink underline ' href="mailto:support-certifications@unifyedu.ng">
            support-certifications@unifyedu.ng
          </a>
        </>
      ),
    },
  ]

  return (
    <>
      <div className="pt-[31px] md:pt-[70px] text-center text-xl font-normal text-app-pink">
        FAQS
      </div>
      <div className="flex flex-col items-center justify-center mt-2">
        <h1 className="md:text-[38px] text-3xl max-w-[80%] text-center font-medium">
          Have questions?
        </h1>
      </div>
      <div className="mb-20">
        <AccordionFaqs qAndA={questionAndAnswers} />
      </div>
      <div className="hidden w-full mb-20 text-center md:block">
        <p className="mt-4 text-base font-normal">
          Can’t find the answers you’re looking for?{' '}
          <span className="text-app-pink">
            <a
              href="mailto:hello@certifications.unify.edu.ng"
              className="font-medium"
            >
              {' '}
              Contact our support team
            </a>
          </span>
        </p>
      </div>
    </>
  )
}

export default FAQS

FAQS.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>Certifications by Unify | FAQs</title>
      </Head>
      <MainLayout
        allowedUserTypes={[USERTYPES.INSTRUCTOR, USERTYPES.STUDENT]}
        completeFooter
      >
        {page}
      </MainLayout>
    </>
  )
}
