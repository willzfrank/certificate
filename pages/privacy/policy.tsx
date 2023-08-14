import React from 'react'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import Link from 'next/link'
import { MainLayout } from 'app/components'
import Head from 'next/head'

const subHeading = 'font-medium text-xl mt-7'
const subText = 'mt-5'

const Policy: NextPageWithLayout<{}> = () => {
  return (
    <div className="md:flex md:max-w-[90%] max-w-[100%] p-5 md:p-0 md:m-12">
      <div className="md:min-w-[20%] md:p-5 space-y-4 mt-0 md:mt-10 ">
        <div className="text-app-pink">Privacy policy</div>
        <div className="m hover:text-app-pink">
          <Link href="/privacy/terms">
            <a>Terms & Conditions</a>
          </Link>
        </div>
      </div>
      <div className="md:ml-[80px] mt-4 md:mt-0">
        <div className="text-3xl font-medium">Privacy policy</div>
        <div className="mt-10">
          Certifications by Certification by unify is an online learning
          platform that allows anyone to watch, listen and learn from our
          everyday STARS. Essentially a MOOC service provider. The goal is to
          aid people with little or no experience learn from powerfully talented
          individuals using brilliant storytelling and in-depth learning
          methods. The vision for Certifications by Certification by unify is to
          offer knowledge by the second; through practical, funny and engaging
          video modules. You can learn a trade, improve a passion, advance a
          career or get inspiration from industry best. These Masterclasses are
          to be hosted on Certification by unify, an EdTech platform with an
          all-in-one School Management System that manages and automates the
          physical operations of universities . Personal information is
          essential to the provision of exceptional and personalized products
          and services, but more important is the protection and security of
          your personal information. C-One respects individuals’ rights to
          privacy and the protection of personal information. Therefore, we want
          to transparently explain how and why we collect, store, share and use
          your personal information – as well as outline the controls and
          choices you have around when you choose to share your personal data
          This Privacy Policy (&apos;Policy&apos;) outlines our objectives in
          detail. The Policy applies to all Certification by unify services and
          any associated services (&apos;Certification by unify Service&apos;).
          The terms governing your use of the Certification by unify Service are
          defined in our Terms and Conditions.
          <ul className="list-decimal flex flex-col  my-2 md:max-w-[50vw] md:ml-[88px] pl-4 md:pl-0">
            <li>
              Ensure that you understand what personal data we collect about
              you, our reasons for collection and use, and who we share it with;{' '}
            </li>
            <li>
              Explain the way we use the personal data you share with us in
              order to give you a great experience when you are using the
              Certification by unify Service; and{' '}
            </li>
            <li>
              Explain your rights and choices in relation to the personal data
              we collect and process about you and how we will protect your
              privacy.{' '}
            </li>
          </ul>
          From time to time, we may develop new or offer additional services. If
          the introduction of these new or additional services results in any
          material change to the way we collect or process your personal data,
          we will provide you with more information or additional terms or
          policies. Unless stated otherwise, new or additional services, will be
          subject to this Privacy Policy. We hope this helps you to understand
          our privacy commitments to you. For further clarifications of the
          terms used in this Policy, please email us at{' '}
          <a href="mailto:hello@certifications.unify.edu.ng">
            hello@certifications.unify.edu.ng
          </a>{' '}
          or leave a message for our support officer on the Certification by
          unify app. For information on how to contact us if you ever have any
          questions or concerns, please see the &apos;Contact Us&apos; section
          below. Alternatively, if you do not agree with the content of this
          Policy, you may voluntarily opt out of this service and discontinue
          its use. Our Principal address is Block 10, Plot 2, The Lennox Mall,
          3, Admiralty Way, Lekki Phase 1, Lagos.
        </div>
        <div className={subHeading}>Your Privacy Rights </div>
        <div className={subText}>
          You have certain rights in relation to the personal information we
          collect as provided by the Nigeria Data Protection Regulation 2019
          (NDPR) and other applicable data protection laws/regulations. These
          include the right to:
          <ul className="list-disc flex flex-col mt-2 md:max-w-[50vw] md:ml-[88px] pl-4 md:pl-0">
            <li>Access your personal data; </li>
            <li>Rectify/update your information in our possession; </li>
            <li>
              Withdraw your consent to processing of personal information. This
              will however not affect the legality of processing carried out
              prior to any such withdrawal;{' '}
            </li>
            <li>
              Object to processing of personal information (ways in which we are
              using your personal information, including direct marketing). This
              will only be applicable where there are no legal or operational
              reasons;{' '}
            </li>
            <li>
              Request that your personal information be made available to you in
              a common electronic format and/or request that such data be sent
              to a third party;{' '}
            </li>
            <li>
              Request that your information be erased. However, we are obligated
              to retain such data if there are valid legal, regulatory, or
              operational reasons to do so.{' '}
            </li>
            <li>
              Request that we restrict the processing of your personal
              information{' '}
            </li>
            <li>
              not to be subject to a decision based solely on automated
              decision-making, including profiling, where the decision would
              have a legal effect on you or produce a similarly significant
              effect{' '}
            </li>
          </ul>
          The exercise of these rights is dependent on many factors and in
          certain instances, we may be unable to comply with these requests,
          e.g., because we have legitimate grounds for refusal or where the
          right is not applicable to the particular data obtained from that
          individual. These rights are also subject to the limitations provided
          in the NDPR and other applicable data protection laws/regulations. If
          you have any questions about your privacy, your rights, or how to
          exercise them, please refer to the Contact Us section of this Policy.
        </div>
        <div className={subHeading}>
          The Type of Personal Information We Collect from You{' '}
        </div>
        <div className={subText}>
          We currently collect and process different categories of personal
          information for various purposes, to provide and improve the
          Certification by unify Service to you. To enable you to sign up for
          and use the Certification by unify Service, we collect the following
          personal data from you:
          <ul className="list-disc flex flex-col mt-2 md:max-w-[50vw] md:ml-[88px] pl-4 md:pl-0">
            <li>
              Personal identifiers – this includes your name, username, email
              address, phone number, birth date, gender, street address and
              country{' '}
            </li>
            <li>
              Biometric information – this includes photographs (copies of your
              passports or ID document), voice recognition (when you call our
              helpline){' '}
            </li>
            <li>
              Transaction details – this includes your Certification by unify
              transaction history and information you provide to deliver payment
              for services
            </li>
            <li>
              Educational History – Information about your previous educational
              qualification, test scores, academic data from previous
              institutions attended and details of sponsors.
            </li>
            <li>
              Financial information – this includes your bank account number,
              Certification by unify card information and other account
              information regarding accounts you hold with other providers that
              you opt to save on your Certification by unify Account
            </li>
            <li>
              Information about your family, lifestyle, and social circumstances
              (such as dependents, marital status, next of kin details).
            </li>
            <li>
              Information about any of our products and services you currently
              use and have, you have applied for or have previously held.
            </li>
            <li>
              User Content – this includes content you post to Certification by
              unify such as photos, your contact list and location data. Please
              note that we will only access your contact list, current location,
              camera, or photos from your device if you give us permission to do
              so, and we will only access images that you specifically choose to
              share with us and metadata related to those images, such as the
              type of file and the size of the image. We will never scan or
              import your device’s photo library or camera roll.
            </li>
            <li>
              Educational Content – this includes any academic content you
              provide on Certification by unify such as learning materials,
              research publications, teaching and study guides, etc.{' '}
            </li>
            <li>
              Inferences drawn about your interests and preferences based on
              your usage of the Certification by unify Service{' '}
            </li>
            <li>
              Information about your interactions with the Certification by
              unify Service such as your search queries and other requests
              (including the date and time of any requests you make){' '}
            </li>
            <li>
              Certain technical data – this may include URL information, online
              identifiers including cookie data and IP addresses, smart device
              information (including mobile device unique ID, your mobile
              operating system and other diagnostic data), mobile network
              provider, browser type, language and your non-precise location
              (which may be derived or inferred from certain technical data like
              your IP address and the language setting of your phone or payment
              currency). We do not store or upload this information to our
              servers. We only collect what we need to improve your experience.{' '}
            </li>
            <li>
              Contests, surveys and Sweepstakes Data – this includes personal
              data you may provide on any forms or surveys and questionnaires or
              when you participate in a contest.
            </li>
          </ul>
          We may also process specific categories of information for specific
          and limited purposes, such as detecting and preventing financial crime
          or making our services available to customers. We will only process
          particular types of information after we have obtained your explicit
          consent or are otherwise lawfully permitted to do so
        </div>
        <div className={subHeading}>
          How We Gather Personal Information and Why We Have It{' '}
        </div>
        <div className={subText}>
          Most of the personal information we process is collected or provided
          directly to Us by you. The information we collect includes:
          <ul className="list-disc flex flex-col mt-2 md:max-w-[50vw] md:ml-[88px] pl-4 md:pl-0">
            <li>
              Information collected or provided directly to us by you to enable
              you sign up for and use the Certification by unify Service;{' '}
            </li>
            <li>
              Information collected about you when you are accessing and/or
              using the Certification by unify Service such as your location
              data, browser settings, your IP address and other online
              identifiers;{' '}
            </li>
            <li>
              Information that we learn about you through our relationship with
              you and the way you operate your accounts and or services, such as
              payments made to and from your accounts;
            </li>
          </ul>
          We also receive personal information indirectly, from the following
          sources in the following scenarios:
          <ul className="list-disc flex flex-col mt-2 md:max-w-[50vw] md:ml-[88px] pl-4 md:pl-0">
            <li>
              Information that we receive from various third parties – third
              parties who provide services to you or Us, including credit
              reference, fraud prevention or government agencies and other
              banks;
            </li>
            <li>
              Information we collect from publicly available sources, such as
              the press, company registers and online search engines.
            </li>
          </ul>
          We have set out in the table below the reasons why we process your
          personal information and the associated lawful basis that we rely upon
          as provided in the Nigeria Data Protection Regulation (NDPR) 2019 and
          other applicable data protection laws/regulations.
          <div className="md:ml-[88px] pl-4 md:pl-0">
            <table className="w-full my-2 text-left table-fixed">
              <thead className="">
                <tr className="border-b">
                  <th className="px-6 py-3">Processing Purpose </th>
                  <th className="px-6 py-3">Lawful Basis under NDPR </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To Provide and personalize the Certification by unify
                    Service{' '}
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Performance of a contract </li>
                      <li>Legitimate Interest </li>
                      <li>Consent </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To Provide and personalize the Certification by unify
                    Service{' '}
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Performance of a contract </li>
                      <li>Legitimate Interest </li>
                      <li>Consent </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To improve product features and design
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Legitimate Interest </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To provide you with tailored content and marketing messages
                    such as recommending similar or related C-One (and related
                    entities and affiliates) products or services we believe you
                    may be interested in{' '}
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Legitimate Interest </li>
                      <li>Consent</li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To comply with and enforce applicable legal and regulatory
                    requirements, relevant industry standards, contractual
                    obligations and our internal policies.
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Compliance with legal obligations</li>
                      <li>Legitimate Interest </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To verify your identity when you access your account
                    information.
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Performance of a contract</li>
                      <li>Compliance with legal obligations</li>
                      <li>Legitimate Interest </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To manage our risks, and establish, exercise or defend legal
                    claims
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Legitimate Interest </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To carry our business research, analytics, planning and
                    forecasting.
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Legitimate Interest </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To detect fraud, money laundering or terrorism financing
                    activities
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Performance of a contract</li>
                      <li>Compliance with legal obligations</li>
                      <li>Legitimate Interest </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    Respond to your requests and communicate with you.
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Consent</li>
                      <li>Performance of a contract</li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To check your account balance, transaction history and
                    predict your billings
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Performance of a contract</li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To help recover funds that may have entered your account as
                    a result of a payment sent in error
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Compliance with legal obligations</li>
                      <li>Legitimate Interest </li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-3">
                    To conduct research, contests, surveys and Sweepstakes
                  </td>
                  <td className="px-6 py-3">
                    <ul className="list-disc">
                      <li>Legitimate Interest </li>
                      <li>Consent</li>
                      <li>Performance of a contract</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={subHeading}>Sharing Your Personal Information</div>
        <div className={subText}>
          We share personal information about you and your dealings with us, to
          the extent permitted by law, with the following:
          <ul className="list-disc flex flex-col mt-2 md:max-w-[50vw] md:ml-[88px] pl-4 md:pl-0">
            <li>
              Legal/Regulatory Authorities - We may disclose personal
              information if we determine that for the purposes of national
              security, law enforcement, or other issues of public importance, a
              disclosure of personal information is necessary or appropriate. It
              may be necessary by law, legal process, litigation, and/or
              requests from public and governmental authorities for the
              disclosure of your personal information.
            </li>
            <li>Professional Advisers: Auditors/Legal Advisers</li>
            <li>Correspondent Banks;</li>
            <li>External Auditors;</li>
            <li>
              Strategic partners/service providers – we provide personal data to
              trusted and authorised third parties who assist us in conducting
              our business and/or providing services to you. We require that
              these parties agree to process such information based on our
              instructions and in compliance with this Privacy Policy and any
              other appropriate confidentiality and security measures.
            </li>
          </ul>
          We also disclose your Personal Information in good faith when we
          believe it is necessary for us to do so in any of the following
          circumstances:
          <ul className="list-disc flex flex-col mt-2 md:max-w-[50vw] md:ml-[88px] pl-4 md:pl-0">
            <li>We have your consent to share the information.</li>
            <li>To comply with a legal obligation. </li>
            <li>
              To bring you improved service across our array of products and
              services, when permissible under relevant laws and regulations, by
              disclosing your personal information with C-One’s affiliates or
              partner bank (i.e., Sterling Bank Plc) .{' '}
            </li>
            <li>
              To protect and defend the rights or property of C-One and its
              partners..{' '}
            </li>
            <li>
              To prevent or investigate possible wrongdoing in connection with
              our Service.
            </li>
            <li>
              To protect the personal safety of users of our Service or the
              public.{' '}
            </li>
            <li>To protect against legal liability. </li>
            <li>
              In the event of a reorganization, merger, or sale, we may transfer
              any and all personal information we collect to the relevant third
              party.{' '}
            </li>
            <li>
              We find that your actions on our website or application violate
              any part of our Terms and Conditions of use.
            </li>
          </ul>
          Whenever we share your personal information with anyone other than for
          purposes highlighted herein , we will inform you about the details of
          the exchange. We require that all third parties with whom we share
          your personal data agree to process such information based on our
          instructions and in compliance with this privacy policy and any other
          appropriate confidentiality and security measures. Special categories
          of personal data (also known as sensitive personal data) are part of
          the information we collect from you. In particular, we may process
          biometric data (such as facial and voice recognition), for services
          that require it. Where we process such sensitive personal data, we
          will do so on the basis that we have your explicit consent to do so,
          and that it is necessary for reasons of substantial public interest,
          to establish, and/or to exercise or defend any legal claims. We will
          carry out processing under applicable laws.
        </div>
        <div className={subHeading}>
          How Long We Will Keep Your Information{' '}
        </div>
        <div className={subText}>
          We will keep your personal data for as long as we have a relationship
          with you, i.e., for as long as you use the app, remain validly
          subscribed to our newsletter or partake in surveys. Whenever we share
          your personal information with anyone other than for purposes
          highlighted herein , we will inform you about the details of the
          exchange. We require that all third parties with whom we share your
          personal data agree to process such information based on our
          instructions and in compliance with this privacy policy and any other
          appropriate confidentiality and security measures Whenever we share
          your personal information with anyone other than for purposes
          highlighted herein , we will inform you about the details of the
          exchange. We require that all third parties with whom we share your
          personal data agree to process such information based on our
          instructions and in compliance with this privacy policy and any other
          appropriate confidentiality and security measures
        </div>
        <div className={subHeading}>How Do We Protect Your Information?</div>
        <div className={subText}>
          We implement a variety of reasonable security measures to protect the
          security and integrity of your personal information. We use computer
          safeguards such as firewalls and data encryption, enforce physical
          access to our buildings and files and only authorize access to
          personal information to only employees who require the data to fulfil
          their job responsibilities, or our affiliates as may be required in
          the provision of our services to you. However, the internet is not
          always a secure medium, and we cannot guarantee the non-occurrence of
          security breaches. Accordingly, we are not responsible for matters,
          which include actions of hackers and other unauthorized third parties
          that attempt to breach our reasonable security procedures. No method
          of electronic transmission or storage is 100% secure, therefore, we
          cannot guarantee the absolute security of your Personal Information.
          It is important that you understand that you also play a crucial role
          in protecting your Personal Information. Please safeguard your
          passcodes for your Certification by unify account and do not share
          them with others. If we receive instructions using your Certification
          by unify account login information, we will consider that you have
          authorized the instruction. You agree to notify us immediately of any
          unauthorized use of your Certification by unify account or any other
          breach of security. We reserve the right, at our sole discretion, to
          refuse to provide our Services, terminate Certification by unify
          accounts, and to remove or edit content.
        </div>
        <div className={subHeading}>Third-Party Policy</div>
        <div className={subText}>
          Occasionally, at our discretion, we may include or offer third-party
          products or services or links on our application. These third-party
          sites have separate and independent Privacy Policies. We request that
          you separately review these policies, as we, have no responsibility or
          liability for the content and activities of linked platforms.
          Nonetheless, we seek to protect the integrity of our application and
          welcome feedback about these sites.{' '}
        </div>
        <div className={subHeading}>Cookie Policy</div>
        <div className={subText}>
          Cookies help us serve you better. Think of cookies as crumbs. Every
          time you visit a website, that website saves bits of your visit so
          they can keep track of how many times you have visited, the length of
          time spent, and your activities. This information helps the site show
          you things that are relevant to you based on your past visits. The
          length of time stored depends on the cookie, but this is generally at
          least a few minutes and up to two years.
        </div>
        <div className={subHeading}>
          Why and How We Use Cookies on Our Website{' '}
        </div>
        <div className={subText}>
          We use cookies to enhance our customers’ online activity by making
          navigation easier and providing important security features. Think of
          cookies as crumbs. Every time you visit a website, that website saves
          bits of your visit so they can keep track of how many times you have
          visited, the length of time spent, and your activities. For the
          provision of certain services, cookies are a requirement because they
          help protect customer privacy. For example, automatically terminating
          the online session if the customer forgets to log out. Visitors to our
          website who have JavaScript enabled are tracked using Google
          Analytics. Google Analytics collects the following types of
          information from users:
          <ul className="list-decimal flex flex-col mt-2 md:max-w-[50vw] md:ml-[88px] pl-4 md:pl-0">
            <li>
              Web browser used – software manufacturer, and version number
            </li>
            <li>Operating system</li>
            <li>Screen colors</li>
            <li>JavaScript support</li>
            <li>Flash version</li>
            <li>Screen resolution</li>
            <li>
              Network location and IP address: a. May include geographic b.
              Hostname c. Connection Bandwidth
            </li>
            <li>May include geographic data</li>
            <li>Hostname</li>
            <li>Connection bandwidth</li>
            <li>Time of visit</li>
            <li>Pages visited and dwell time on these pages</li>
            <li>
              Referring site a. The referring website URL b.Search engine query
              used Google Analytics data is shared with Google.
            </li>
          </ul>
          For more information on Google’s Privacy Policies, visit{' '}
          <a
            href="https://policies.google.com/privacy?hl=en-US"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            https://policies.google.com/privacy
          </a>
        </div>
        <div className={subHeading}>Third-party Cookies</div>
        <div className={subText}>
          Third parties that are trusted suppliers of C-One. They include
          C-One’s approved suppliers who are expected to follow the information
          security requirements of the company. We will allow only our trusted
          suppliers to have their cookies on our website. We use two kinds of
          cookies: This information helps the site show you things that are
          relevant to you based on your past visits. The length of time stored
          depends on the cookie, but this is generally at least a few minutes
          and up to two years.
          <ul className="list-disc flex flex-col mt-2 md:max-w-[50vw] md:ml-[88px] pl-4 md:pl-0">
            <li>Strictly Necessary Cookies, such as PHPSESSID and HttpOnly </li>
            <li>
              Functionality Cookies, like SnapABugHistory, SnapABugRef and
              SnapABugVisit{' '}
            </li>
          </ul>
          You can turn functionality cookies off whenever you like. You can
          choose to have your computer warn you each time a cookie is being
          sent, or you can choose to turn off all cookies. Exactly how you do
          this would depend on your device&apos;s privacy settings. If you turn
          your cookies off, some of the features that make your site experience
          more efficient may not function properly. Since browsers differ, we
          recommend that you access the Help Menu to learn the correct way to
          modify your cookies. To learn more about cookies and privacy, visit{' '}
          <a
            className="text-blue-700 underline"
            href="https://allaboutcookies.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://allaboutcookies.org/
          </a>
        </div>
        <div className={subHeading}>Information Shared Socially</div>
        <div className={subText}>
          Personal data collected within Nigeria may be transferred to and
          processed by third parties located in other countries. In such
          instances, We shall ensure that the transfer of your personal data is
          carried out in accordance with applicable privacy laws/regulations
          and, in particular, that appropriate contractual, technical, and
          organizational measures are in place, such as Adequacy mechanisms and
          Standard Contractual clauses approved by the Attorney General of the
          Federation. For further details of the security measures we use to
          protect your personal data, please see the &apos;How do we protect
          your personal information&apos; section of this policy.
        </div>
        <div className={subHeading}>Changes to This Policy </div>
        <div className={subText}>
          Based on the changing nature of privacy laws, user needs and our
          business, we may modify this Privacy Policy from time to time. Any
          change to our Privacy Policy will be communicated on our upgrades via
          the application, and this will be effective as soon as published.
          Accordingly, we encourage periodic reviews of this Privacy Policy for
          awareness of any changes that may have occurred.
        </div>
        <div className={subHeading}>Contact Us </div>
        <div className={subText}>
          If you have any queries about how we use your personal information
          which is not answered here, you may contact us at{' '}
          <a
            className="text-blue-700 underline"
            href="mailto:hello@certifications.unify.edu.ng"
          >
            hello@certifications.unify.edu.ng
          </a>
          . Where you have suffered a breach, we advise that you inform us
          immediately to enable us take appropriate action within 72 hours of
          our receipt of your complaint. If you want to make a complaint about
          how we have handled your personal information or would like to know
          more about your rights and how to exercise them, you may contact our
          Data Protection Officer to investigate the matter via email to{' '}
          <a
            className="text-blue-700 underline"
            href="mailto:hello@certifications.unify.edu.ng"
          >
            hello@certifications.unify.edu.ng
          </a>
          .You may also write a letter addressed as follows: The Data Protection
          Officer, C-ONE VENTURES PLATFORM LIMITED, Block 10, Plot 2, The Lennox
          Mall, 3, Admiralty Way, Lekki Phase 1, Lagos
        </div>
      </div>
    </div>
  )
}

export default Policy

Policy.getLayout = function (page) {
  return (
    <MainLayout allowedUserTypes={[USERTYPES.INSTRUCTOR, USERTYPES.STUDENT]}>
      <Head>
        <title>Privacy Policy | Certifications by Unify</title>
      </Head>
      {page}
    </MainLayout>
  )
}
