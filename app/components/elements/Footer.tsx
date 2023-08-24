import Link from 'next/link';
import React, { useRef, FormEvent } from 'react';
import { Image } from 'app/components';
import { USERTYPES } from 'app/types';
import { useAppSelector } from 'app/hooks';
import { useRouter } from 'next/router';

interface FooterProps {
  withSignUpPromotion?: boolean;
}

const Footer = ({ withSignUpPromotion }: FooterProps) => {
  const { id } = useAppSelector((store: any) => store.user);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const emailRef2 = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(
      `/auth/register?email=${
        encodeURIComponent(emailRef?.current?.value as string) ||
        encodeURIComponent(emailRef2?.current?.value as string)
      }`
    );
  };

  return (
    <footer className="relative text-center text-white bg-app-dark mt-8">
      {withSignUpPromotion ? (
        <div className="px-6 py-14 md:px-12 md:py-12 md:mb-8">
          <SvgLines />
          <div className="relative z-10 space-y-4">
            <h1 className="text-2xl font-medium md:text-3xl">
              Want to get your journey started?
            </h1>
            <p className="text-[#B4B0C5] tracking-wide md:text-lg">
              Signup, choose a membership and start learning
            </p>

            <div className="space-x-4">
              <Link href={`/auth/register?as=${USERTYPES.STUDENT}`}>
                <button className="actiongradient p-[2px] rounded-md mt-4">
                  <span className="block p-3 px-10 font-medium md:text-lg">
                    Sign up
                  </span>
                </button>
              </Link>

              <Link href={`/auth/register?as=${USERTYPES.INSTRUCTOR}`}>
                <button className="hover:actiongradient bg-app-gray-400 p-[2px] rounded-md mt-4 transition duration-500">
                  <span className="block p-3 px-10 font-medium rounded-md bg-app-dark md:text-lg">
                    Sign up as an Instructor
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* MAIN FOOTER */}

      <div className="p-14 md:px-12 px-6 grid md:grid-cols-[30%,_repeat(3,_minmax(auto,_250px))] lg:grid-cols-[480px,_repeat(3,_minmax(auto,_250px))] grid-cols-2 mt-0 text-left gap-2">
        <div className="flex-col justify-between hidden md:flex items-st">
          <svg
            width="71"
            height="30"
            viewBox="0 0 71 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.0792 2.456V14.552C4.0792 15.8773 4.42454 16.8947 5.1152 17.604C5.80587 18.2947 6.77654 18.64 8.0272 18.64C9.29654 18.64 10.2765 18.2947 10.9672 17.604C11.6579 16.8947 12.0032 15.8773 12.0032 14.552V2.456H15.9512V14.524C15.9512 16.1853 15.5872 17.5947 14.8592 18.752C14.1499 19.8907 13.1885 20.7493 11.9752 21.328C10.7805 21.9067 9.44587 22.196 7.9712 22.196C6.5152 22.196 5.18987 21.9067 3.9952 21.328C2.8192 20.7493 1.88587 19.8907 1.1952 18.752C0.504537 17.5947 0.159203 16.1853 0.159203 14.524V2.456H4.0792ZM28.3346 6.264C30.1826 6.264 31.676 6.852 32.8146 8.028C33.9533 9.18533 34.5226 10.8093 34.5226 12.9V22H30.6026V13.432C30.6026 12.2 30.2946 11.2573 29.6786 10.604C29.0626 9.932 28.2226 9.596 27.1586 9.596C26.076 9.596 25.2173 9.932 24.5826 10.604C23.9666 11.2573 23.6586 12.2 23.6586 13.432V22H19.7386V6.488H23.6586V8.42C24.1813 7.748 24.844 7.22533 25.6466 6.852C26.468 6.46 27.364 6.264 28.3346 6.264ZM40.2384 4.64C39.5477 4.64 38.969 4.42533 38.5024 3.996C38.0544 3.548 37.8304 2.99733 37.8304 2.344C37.8304 1.69067 38.0544 1.14933 38.5024 0.719999C38.969 0.271999 39.5477 0.0479989 40.2384 0.0479989C40.929 0.0479989 41.4984 0.271999 41.9464 0.719999C42.413 1.14933 42.6464 1.69067 42.6464 2.344C42.6464 2.99733 42.413 3.548 41.9464 3.996C41.4984 4.42533 40.929 4.64 40.2384 4.64ZM42.1704 6.488V22H38.2504V6.488H42.1704ZM53.1553 9.708H50.4393V22H46.4633V9.708H44.6993V6.488H46.4633V5.704C46.4633 3.8 47.0047 2.4 48.0873 1.504C49.17 0.607999 50.8033 0.187999 52.9873 0.244V3.548C52.0353 3.52933 51.3727 3.688 50.9993 4.024C50.626 4.36 50.4393 4.96667 50.4393 5.844V6.488H53.1553V9.708ZM70.5357 6.488L60.9317 29.336H56.7597L60.1197 21.608L53.9037 6.488H58.2997L62.3037 17.324L66.3637 6.488H70.5357Z"
              fill="white"
            />
          </svg>

          {/* <div className="mb-8 space-y-6">
            <p className="text-lg font-semibold text-white">
              Join our Community
            </p>

            <form
              onSubmit={onSubmit}
              className="bg-app-dark border-2 border-app-gray-400 w-4/5 rounded-[4px] overflow-hidden flex items-stretch justify-between p-1 text-lg"
            >
              <input
                type="text"
                ref={emailRef2}
                placeholder="Enter your email"
                className="p-2 bg-transparent outline-none placeholder:text-app-gray-400"
              />

              <button
                type="submit"
                className="border-2 border-app-gray-400 p-2 px-4 rounded-[4px] font-medium"
              >
                Submit
              </button>
            </form>

         
          </div> */}
        </div>
        <div>
          <p className="mb-6 text-lg font-bold">Links</p>
          <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            <Link href="/courses/browseCourses">
              <a>Courses</a>
            </Link>
          </p>
          {/* <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            <Link href="/pricing">
              <a>Pricing</a>
            </Link>
          </p> */}
          {/* {id ? (
            <p className="mb-4 leading-9 tracking-wide text-app-stroke">
              <Link href="/instructors">Instructors</Link>
            </p>
          ) : (
            <p className="mb-4 leading-9 tracking-wide text-app-stroke">
              <Link href="/auth/login?as=instructor">Instructors&apos; Login</Link>
            </p>
          )} */}
          <div className="mb-4 leading-9 tracking-wide text-app-stroke">
            <a href="https://unifyedu.ng/home" target="_blank" rel="noreferrer">
              Unify
            </a>
          </div>
          <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            <Link href="https://forms.unifyedu.ng">Unify Forms</Link>
          </p>
        </div>
        <div>
          <p className="mb-6 text-lg font-bold">About</p>
          <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            <Link href="/about">
              <a>About us</a>
            </Link>
          </p>
          <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            <Link href={'/faqs'}>FAQs</Link>
          </p>
          <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            <Link href="/privacy/terms">
              <a>Terms & Conditions</a>
            </Link>
          </p>
          <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            <Link href="/privacy/policy">
              <a>Privacy policy</a>
            </Link>
          </p>
          <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            <Link href="/auth/login">
              <a>Login</a>
            </Link>
          </p>
        </div>
        <div className="hidden md:block">
          <p className="mb-6 text-lg font-bold">Socials</p>
          <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            <a
              href="https://instagram.com/unify_ng?igshid=YmMyMTA2M2Y="
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </p>
          <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            <a
              href="https://twitter.com/unify_ng?s=11&t=_TXe-Quwv4XWiQaqQ50HMg"
              target="_blank"
              rel="noreferrer"
            >
              X (formerly Twitter)
            </a>
          </p>
          {/* <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            Facebook
          </p>
          <p className="mb-4 leading-9 tracking-wide text-app-stroke">
            LinkedIn
          </p> */}
        </div>

        <div className="col-span-2 mt-12 socialsMobile md:hidden">
          <p className="mb-6 text-lg font-bold">Socials</p>
          <div className="flex space-x-6">
            {/* FACEBOOK */}
            {/* <a href="">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 11.0614C0 16.5303 3.97192 21.0778 9.16667 22V14.0553H6.41667V11H9.16667V8.55525C9.16667 5.80525 10.9386 4.27808 13.4447 4.27808C14.2386 4.27808 15.0948 4.4 15.8886 4.52192V7.33333H14.4833C13.1386 7.33333 12.8333 8.00525 12.8333 8.86142V11H15.7667L15.2781 14.0553H12.8333V22C18.0281 21.0778 22 16.5312 22 11.0614C22 4.9775 17.05 0 11 0C4.95 0 0 4.9775 0 11.0614Z"
                  fill="white"
                />
              </svg>
            </a> */}

            {/* INSTAGRAM  */}
            <a href="https://instagram.com/unify_ng?igshid=YmMyMTA2M2Y=">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9471 8.30499C20.937 7.54761 20.7952 6.79776 20.5281 6.08899C20.2964 5.49114 19.9426 4.94819 19.4892 4.49482C19.0359 4.04145 18.4929 3.68764 17.8951 3.45599C17.1954 3.19334 16.4562 3.05133 15.7091 3.03599C14.7471 2.99299 14.4421 2.98099 12.0001 2.98099C9.55807 2.98099 9.24507 2.98099 8.29007 3.03599C7.54323 3.05144 6.80442 3.19346 6.10507 3.45599C5.50713 3.68748 4.96409 4.04123 4.5107 4.49462C4.05732 4.94801 3.70356 5.49105 3.47207 6.08899C3.2089 6.78812 3.06719 7.5271 3.05307 8.27399C3.01007 9.23699 2.99707 9.54199 2.99707 11.984C2.99707 14.426 2.99707 14.738 3.05307 15.694C3.06807 16.442 3.20907 17.18 3.47207 17.881C3.70395 18.4787 4.05797 19.0216 4.51151 19.4748C4.96505 19.928 5.50813 20.2816 6.10607 20.513C6.8035 20.7862 7.54244 20.9384 8.29107 20.963C9.25407 21.006 9.55907 21.019 12.0011 21.019C14.4431 21.019 14.7561 21.019 15.7111 20.963C16.4582 20.9483 17.1974 20.8066 17.8971 20.544C18.4948 20.3121 19.0376 19.9582 19.4909 19.5048C19.9442 19.0515 20.2982 18.5087 20.5301 17.911C20.7931 17.211 20.9341 16.473 20.9491 15.724C20.9921 14.762 21.0051 14.457 21.0051 12.014C21.0031 9.57199 21.0031 9.26199 20.9471 8.30499ZM11.9941 16.602C9.44007 16.602 7.37107 14.533 7.37107 11.979C7.37107 9.42499 9.44007 7.35599 11.9941 7.35599C13.2202 7.35599 14.396 7.84305 15.263 8.71003C16.13 9.57701 16.6171 10.7529 16.6171 11.979C16.6171 13.2051 16.13 14.381 15.263 15.2479C14.396 16.1149 13.2202 16.602 11.9941 16.602ZM16.8011 8.26299C16.6595 8.26312 16.5192 8.23533 16.3884 8.1812C16.2575 8.12707 16.1386 8.04767 16.0385 7.94754C15.9384 7.84741 15.859 7.72852 15.8049 7.59768C15.7507 7.46683 15.7229 7.32659 15.7231 7.18499C15.7231 7.04349 15.7509 6.90337 15.8051 6.77265C15.8592 6.64192 15.9386 6.52314 16.0387 6.42308C16.1387 6.32302 16.2575 6.24366 16.3882 6.18951C16.519 6.13536 16.6591 6.10749 16.8006 6.10749C16.9421 6.10749 17.0822 6.13536 17.2129 6.18951C17.3436 6.24366 17.4624 6.32302 17.5625 6.42308C17.6625 6.52314 17.7419 6.64192 17.7961 6.77265C17.8502 6.90337 17.8781 7.04349 17.8781 7.18499C17.8781 7.78099 17.3961 8.26299 16.8011 8.26299Z"
                  fill="white"
                />
                <path
                  d="M11.9942 14.982C13.6527 14.982 14.9972 13.6375 14.9972 11.979C14.9972 10.3205 13.6527 8.97601 11.9942 8.97601C10.3357 8.97601 8.99121 10.3205 8.99121 11.979C8.99121 13.6375 10.3357 14.982 11.9942 14.982Z"
                  fill="white"
                />
              </svg>
            </a>

            {/* TWITTER */}
            <a href="https://twitter.com/unify_ng?s=11&t=_TXe-Quwv4XWiQaqQ50HMg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.633 7.99701C19.646 8.17201 19.646 8.34601 19.646 8.52001C19.646 13.845 15.593 19.981 8.186 19.981C5.904 19.981 3.784 19.32 2 18.172C2.324 18.209 2.636 18.222 2.973 18.222C4.78599 18.2264 6.54765 17.6202 7.974 16.501C7.13342 16.4858 6.31858 16.2085 5.64324 15.7077C4.9679 15.207 4.46578 14.5079 4.207 13.708C4.456 13.745 4.706 13.77 4.968 13.77C5.329 13.77 5.692 13.72 6.029 13.633C5.11676 13.4488 4.29647 12.9544 3.70762 12.2337C3.11876 11.513 2.79769 10.6107 2.799 9.68001V9.63001C3.336 9.92901 3.959 10.116 4.619 10.141C4.06609 9.7736 3.61272 9.27504 3.29934 8.6898C2.98596 8.10457 2.82231 7.45087 2.823 6.78701C2.823 6.03901 3.022 5.35301 3.371 4.75501C4.38314 6.00003 5.6455 7.01857 7.07634 7.74467C8.50717 8.47077 10.0746 8.88823 11.677 8.97001C11.615 8.67001 11.577 8.35901 11.577 8.04701C11.5767 7.51797 11.6807 6.99407 11.8831 6.50525C12.0854 6.01643 12.3821 5.57229 12.7562 5.1982C13.1303 4.82411 13.5744 4.52742 14.0632 4.32509C14.5521 4.12276 15.076 4.01875 15.605 4.01901C16.765 4.01901 17.812 4.50501 18.548 5.29101C19.4498 5.11663 20.3145 4.78743 21.104 4.31801C20.8034 5.24883 20.1738 6.03812 19.333 6.53801C20.1328 6.44679 20.9144 6.23647 21.652 5.91401C21.1011 6.71711 20.4185 7.42136 19.633 7.99701Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* <div className="col-span-2 mt-12 joinOurCommunity md:hidden">
          <p className="mb-6 text-lg font-bold">Join Our Community</p>
          <form
            onSubmit={onSubmit}
            className="bg-app-dark border-2 border-app-gray-400 rounded-[4px] overflow-hidden flex items-stretch justify-between p-1"
          >
            <input
              type="text"
              ref={emailRef}
              placeholder="Enter your email"
              className="p-2 bg-transparent outline-none placeholder:text-app-gray-400"
            />

            <button
              type="submit"
              className="border-2 border-app-gray-400 p-2 px-4 rounded-[4px] font-medium"
            >
              Submit
            </button>
          </form>
       
        </div> */}

        <div className="col-span-2 md:hidden mt-14">
          <Image
            src="/images/unifyLogo.png"
            alt=""
            className="w-24 h-10 mb-4"
          />
          <p className="text-app-gray-100">Enabling the future</p>
        </div>
      </div>
    </footer>
  );
};

const SvgLines = () => {
  return (
    <div className="absolute top-0 left-0 flex justify-between w-full overflow-hidden">
      <svg
        style={{ transformOrigin: 'top left', transform: 'scale(0.8)' }}
        width="369"
        height="306"
        viewBox="0 0 369 306"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M349.486 -1.8246C394.923 99.4216 336.861 225.143 218.144 278.421C99.4273 331.698 -33.0937 291.507 -78.531 190.261C-123.968 89.0146 -65.9053 -36.7066 52.8113 -89.9843C171.528 -143.262 304.049 -103.071 349.486 -1.8246Z"
          stroke="#151414"
          strokeWidth="8"
        />
        <path
          d="M198.23 231.639C290.168 190.38 336.731 92.08 300.577 11.5195C264.423 -69.0411 160.032 -99.596 68.0951 -58.3365C-23.8421 -17.0769 -70.4051 81.2229 -34.2512 161.783C1.90277 242.344 106.293 272.899 198.23 231.639Z"
          stroke="#151414"
          strokeWidth="8"
        />
        <path
          d="M164.667 187.692C246.351 151.034 287.721 63.6967 255.599 -7.87919C223.477 -79.4551 130.729 -106.602 49.0454 -69.9444C-32.6384 -33.2863 -74.0084 54.0505 -41.8865 125.626C-9.76471 197.202 82.9834 224.35 164.667 187.692Z"
          stroke="#151414"
          strokeWidth="7.10779"
        />
      </svg>

      <svg
        style={{ transformOrigin: 'top right', transform: 'scale(0.8)' }}
        width="327"
        height="311"
        viewBox="0 0 327 311"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden md:block"
      >
        <path
          d="M19.9532 2.48985C-25.484 103.736 32.5789 229.457 151.296 282.735C270.012 336.013 402.533 295.822 447.97 194.575C493.408 93.3291 435.345 -32.3922 316.628 -85.6698C197.912 -138.947 65.3905 -98.7564 19.9532 2.48985Z"
          stroke="#151414"
          strokeWidth="8"
        />
        <path
          d="M171.209 235.954C79.2718 194.694 32.7088 96.3945 68.8627 15.8339C105.017 -64.7266 209.407 -95.2816 301.344 -54.022C393.282 -12.7624 439.845 85.5374 403.691 166.098C367.537 246.658 263.146 277.213 171.209 235.954Z"
          stroke="#151414"
          strokeWidth="8"
        />
        <path
          d="M204.772 192.006C123.088 155.348 81.7184 68.0112 113.84 -3.56474C145.962 -75.1407 238.71 -102.288 320.394 -65.6299C402.078 -28.9719 443.448 58.365 411.326 129.941C379.204 201.517 286.456 228.664 204.772 192.006Z"
          stroke="#151414"
          strokeWidth="7.10779"
        />
      </svg>
    </div>
  );
};
export default Footer;
