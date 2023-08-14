import React from "react";
import Link from "next/link";
import { NextPageWithLayout, USERTYPES } from "app/types";
import { MainLayout } from "app/components";
import Head from "next/head";

const subHeading = "font-medium text-xl mt-7";
const subText = "mt-5";

const Terms: NextPageWithLayout<{}> = () => {
  return (
    <div className="md:flex md:max-w-[90%] max-w-[100%] p-5 md:p-0 md:m-12">
      <div className="md:min-w-[20%] md:p-5 space-y-4 mt-0 md:mt-10 ">
        <div className=" hover:text-app-pink">
          <Link href="/privacy/policy">
            <a>Privacy policy</a>
          </Link>
        </div>
        <div className="text-app-pink">Terms & Conditions</div>
      </div>
      <div className="md:ml-[80px] mt-4 md:mt-0">
        <div className="text-3xl font-medium">Terms & Conditions</div>
        <div className={`mt-4 ${subHeading}`}>
          What is Certification by unify?
        </div>
        <div className="mt-6">
          Certification by unify is a platform that replicates the physical
          organization, infrastructure and business operating model of tertiary
          schools in a digital application format (the &apos;app&apos; or
          &apos;Platform&apos;). These infrastructure and services include
          finance, operation, education delivery, administration, student/alumni
          affairs and extra curricula activities. Certification by unify is
          developed byC-ONE VENTURES PLATFORM LIMITED (&apos;C-One&apos;),a
          technology driven company that has partnered with Sterling Bank Plc (a
          financial institution registered in Nigeria) for the provision of all
          banking products and services offered on the Platform. These Terms &
          Conditions govern and apply to the grant of, access to and use of the
          suite of services (&apos;Services&apos;) on the Platform by a User. By
          accessing, registering and/or using this app, you agree to be bound by
          these Terms and all other terms and policies that are applicable to
          any other account or service accessible through this Platform
          (collectively referred to as &apos;Terms&apos;).
        </div>
        <div className={subHeading}>Meaning of words:</div>
        <div className={subText}>
          &apos;We&apos;, &apos;Us&apos; and &apos;Our&apos; means C-One.
          &apos;User/you&apos; is anyone who has a Certification by
          Certification by unify account or has access to your certification by
          Certification by unify account. &apos;App&apos; means the software we
          offer on compatible iOS and Android devices and on the web, with which
          you can transact and otherwise access a Certification by Certification
          by unify account. &apos;ATM&apos; means Automated Teller Machine
          &apos;Bank&apos; means Sterling Bank Plc (Sterling) &apos;Card&apos;
          means a Debit Verve card issued to you by Us that bears the Verve
          symbol, which is linked to an account and can be used to undertake
          payment transaction &apos;Forum&apos; means any group features or fora
          made available by C-One to you on the Platform to engagement in
          featured educational activities. &apos;Certification by Certification
          by unify account&apos; means a Personal account that exists on
          theCertification by Certification by unify Product
          (&apos;Certification by Certification by unify Account&apos;) in your
          name tied to your email and/or phone number when you register on the
          application. &apos;CBN&apos; means the Central Bank of Nigeria
          &apos;Electronic Access Device&apos; means a personal computer,
          telephone, mobile phone, personal digital assistant or any other
          electronic device, including wireless devices that will allow you to
          access the app. &apos;Fees&apos; You may pay fees when you make
          transactions/transfers. A list of these fees is available on our
          website, you can also reach our call centre for details.
          &apos;Insufficient Funds&apos; If there are insufficient funds in a
          Certification by Certification by unify wallet, we would be unable to
          act on your Payment instruction &apos;Merchant&apos; means a vendor
          who has agreed to provide Us with its services and/or products for the
          efficient operation of the Platform. These services and/or products
          may be offered to eligible Users at discounted rates. &apos;Mobile
          number&apos; means the mobile phone number registered in Nigeria which
          you have nominated to use on or with the device or devices you use to
          access the app. &apos;NDIC&apos; means Nigeria Deposit Insurance
          Corporation &apos;PIN/Password&apos; means the confidential personal
          identification number you select to identify yourself and to confirm
          Transactions on the application or conjunction with a card.
          &apos;Prohibitions on Use&apos; You shall not access or use your
          Certification by unify account for an illegal, fraudulent, malicious
          or defamatory purpose &apos;Password and PIN Security&apos; Your
          Password, PIN and Identification Question must be unique and not
          easily guessed. You must always keep your Password, PIN and
          Identification Questions strictly confidential. You agree to notify Us
          immediately if you become aware of any unusual, suspicious or
          fraudulent activity on your Certification by unify account.
          &apos;Payment&apos; means any transaction from a Certification by
          unify account to another Certification by unify account or a bank and
          vice versa. &apos;Transaction&apos; means any loading of funds from a
          Funding Source to a Certification by unify account, any offloading of
          funds from a Certification by unify Account. &apos;Certification by
          unify Wallet&apos; means a stored value account (&apos;Wallet&apos;)
          in your name tied to your email and/or phone number registered on the
          Platform for the purpose of carrying out financial transactions.
        </div>
        <div className={subHeading}>How to Contact Us: </div>
        <div className={subText}>
          You can contact us through the support section on your app; or send us
          an email at{" "}
          <a
            className="text-blue-700 underline"
            href="mailto:hello@certifications.unify.edu.ng"
          >
            hello@certifications.unify.edu.ng
          </a>
        </div>
        <div className={subHeading}>How We Will Connect with You: </div>
        <div className={subText}>
          Our primary contact method shall be in accordance with your preferred
          communication channel, which may be by email or text messaging. On
          particular occasions, where other means of contact is necessary, we
          will inform you in advance of such requirement. Push notifications: We
          may also send you instant notifications when you attempt to carry out
          transactions on the Platform. Emails, notifications and texts: Payment
          receipts, login notifications, newsletters and other relevant
          information will be sent via email, text messages or in-app
          notifications
        </div>
        <div className={subHeading}>Your Information: </div>

        <div className={subText}>
          <ul className="pl-4 list-disc md:pl-4">
            <li>
              Information we collect
              <br /> When you sign up on Certification by unify, we collect and
              retain your legally identified first name, legally identified last
              name, date of birth, email, phone number and legally identified
              gender. On the application, you will be asked to generate: a
              Password, Passcode for the wallet, transaction PIN, and security
              questions. Please see the Privacy Policy for full details on the
              personal data that We hold and how We use it. By accepting these
              terms, you agree to Our use of your information in furtherance of
              the provision of the Certification by unify Services. If at any
              point, you are no longer interested in Our use of your
              information, you may opt-out of our services and close your
              Certification by unify account.
            </li>
            <li>
              Incorrect information <br /> If We discover that the information
              We hold about you is incorrect, We reserve the right to suspend
              your Certification by unify account until We obtain and verify the
              correct information in order to protect you (User) and Us.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Terms;

Terms.getLayout = function (page) {
  return (
    <MainLayout allowedUserTypes={[USERTYPES.STUDENT, USERTYPES.INSTRUCTOR]}>
      <Head>
        <title>
          Terms & Conditions | Certifications by Unify
        </title>
      </Head>
      {page}
    </MainLayout>
  );
};
