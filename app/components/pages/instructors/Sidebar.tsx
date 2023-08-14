import * as React from "react";
import { Image } from "app/components/elements";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "app/hooks";

const InstructorSidebar = () => {
  interface SidebarIconProps {
    color: string;
  }

  const overviewIcon = ({ color }: SidebarIconProps): JSX.Element => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16667 2.75H2.75V9.16667H9.16667V2.75Z"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2487 2.75H12.832V9.16667H19.2487V2.75Z"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2487 12.8335H12.832V19.2502H19.2487V12.8335Z"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16667 12.8335H2.75V19.2502H9.16667V12.8335Z"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const coursesIcon = ({ color }: SidebarIconProps): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
      />
    </svg>
  );

  const discussionIcon = ({ color }: SidebarIconProps): JSX.Element => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7161 16.2236H8.49609"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7161 12.0371H8.49609"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2511 7.86035H8.49609"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.908 2.75C15.908 2.75 8.231 2.754 8.219 2.754C5.459 2.771 3.75 4.587 3.75 7.357V16.553C3.75 19.337 5.472 21.16 8.256 21.16C8.256 21.16 15.932 21.157 15.945 21.157C18.705 21.14 20.415 19.323 20.415 16.553V7.357C20.415 4.573 18.692 2.75 15.908 2.75Z"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const settlementIcon = ({ color }: SidebarIconProps): JSX.Element => (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.8389 13.6962H16.128C14.7654 13.6954 13.661 12.5918 13.6602 11.2292C13.6602 9.86664 14.7654 8.76304 16.128 8.76221H19.8389"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5449 11.1726H16.2592"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.10333 3.25H15.0265C17.6831 3.25 19.8368 5.40372 19.8368 8.06036V14.6393C19.8368 17.2959 17.6831 19.4497 15.0265 19.4497H7.10333C4.44669 19.4497 2.29297 17.2959 2.29297 14.6393V8.06036C2.29297 5.40372 4.44669 3.25 7.10333 3.25Z"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.44922 7.4099H11.3983"
        stroke={color || "#545454"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const studentIcon = ({ color }: SidebarIconProps): JSX.Element => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8867 10.8967C19.2817 10.7007 20.3557 9.50473 20.3587 8.05573C20.3587 6.62773 19.3177 5.44373 17.9527 5.21973"
        stroke="#545454"
        strokeWidth="1.42857"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.7305 14.2505C21.0815 14.4525 22.0245 14.9255 22.0245 15.9005C22.0245 16.5715 21.5805 17.0075 20.8625 17.2815"
        stroke="#545454"
        strokeWidth="1.42857"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8887 14.6641C8.67469 14.6641 5.92969 15.1511 5.92969 17.0961C5.92969 19.0401 8.65769 19.5411 11.8887 19.5411C15.1027 19.5411 17.8467 19.0591 17.8467 17.1131C17.8467 15.1671 15.1197 14.6641 11.8887 14.6641Z"
        stroke="#545454"
        strokeWidth="1.42857"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8854 11.888C13.9944 11.888 15.7044 10.179 15.7044 8.069C15.7044 5.96 13.9944 4.25 11.8854 4.25C9.77643 4.25 8.06643 5.96 8.06643 8.069C8.05843 10.171 9.75543 11.881 11.8574 11.888H11.8854Z"
        stroke="#545454"
        strokeWidth="1.42857"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.88606 10.8967C4.49006 10.7007 3.41706 9.50473 3.41406 8.05573C3.41406 6.62773 4.45506 5.44373 5.82006 5.21973"
        stroke="#545454"
        strokeWidth="1.42857"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.044 14.2505C2.693 14.4525 1.75 14.9255 1.75 15.9005C1.75 16.5715 2.194 17.0075 2.912 17.2815"
        stroke="#545454"
        strokeWidth="1.42857"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const profileIcon = ({ color }: SidebarIconProps): JSX.Element => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.983 15.3462C8.11536 15.3462 4.8125 15.931 4.8125 18.2729C4.8125 20.6148 8.0944 21.2205 11.983 21.2205C15.8506 21.2205 19.1525 20.6348 19.1525 18.2938C19.1525 15.9529 15.8715 15.3462 11.983 15.3462Z"
        stroke="#545454"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9829 12.0059C14.521 12.0059 16.5782 9.94779 16.5782 7.40969C16.5782 4.8716 14.521 2.81445 11.9829 2.81445C9.44484 2.81445 7.38675 4.8716 7.38675 7.40969C7.37817 9.93922 9.42198 11.9973 11.9506 12.0059H11.9829Z"
        stroke="#545454"
        strokeWidth="1.42857"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const [activeLink, setActiveLink] = React.useState("");
  const { pathname } = useRouter();

  const [isExpanded, setExpanded] = React.useState(true);

  const sideBarLinks = [
    { title: "Overview", href: "overview", icon: overviewIcon },
    { title: "Courses", href: "courses", icon: coursesIcon },
    { title: "Discussion forum", href: "discussion", icon: discussionIcon },
    { title: "Settlements", href: "settlements", icon: settlementIcon },
    { title: "Students", href: "students", icon: studentIcon },
    { title: "Profile", href: "profile", icon: profileIcon },
  ];

  const setActiveLinkFromRoute = (url: string) => {
    const activeLink = sideBarLinks.find((link) => url.includes(link.href));
    setActiveLink(activeLink?.href || "");
  };

  React.useEffect(() => setActiveLinkFromRoute(pathname), [pathname]);

  return (
    <motion.div
      className={`sticky top-0 bottom-0 h-screen hidden md:block bg-app-stroke p-2 z-10 transition-all ${
        isExpanded ? "w-[20vw]" : "w-[70px]"
      }`}
    >
      <header
        className={`flex items-center ${
          isExpanded ? "p-4" : "py-4"
        } justify-between mb-8 transition-all`}
      >
        <Link href={"/instructors/overview"}>
          <a>
            <Image
              loading="eager"
              src="/images/unifyLogo.png"
              alt="Certification by Unify Logo"
              className={`transition ${isExpanded ? "w-24 h-10" : "w-12 h-5"}`}
              objectFit="contain"
            />
          </a>
        </Link>

        <button onClick={() => setExpanded(!isExpanded)} className="-mr-4">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.33203 20.0002C3.33203 10.8002 10.8154 3.3335 19.9987 3.3335L20.465 3.3399C29.4497 3.5871 36.6654 10.9561 36.6654 20.0002C36.6654 29.1835 29.1987 36.6668 19.9987 36.6668C10.8154 36.6668 3.33203 29.1835 3.33203 20.0002ZM23.2987 26.6668C23.782 26.1668 23.782 25.3835 23.282 24.9002L18.3654 20.0002L23.282 15.1002C23.782 14.6168 23.782 13.8168 23.2987 13.3335C22.7987 12.8335 22.0154 12.8335 21.532 13.3335L15.7154 19.1168C15.482 19.3502 15.3487 19.6668 15.3487 20.0002C15.3487 20.3335 15.482 20.6502 15.7154 20.8835L21.532 26.6668C21.7654 26.9168 22.082 27.0335 22.3987 27.0335C22.732 27.0335 23.0487 26.9168 23.2987 26.6668Z"
              fill="#2F2D37"
            />
          </svg>
        </button>
      </header>

      <div className="flex flex-col">
        {sideBarLinks.map((val, idx) => (
          <Link key={idx} href={`/instructors/${val.href}`}>
            <button
              className={
                "p-4 my-2 flex hover:bg-[#EECAD6] transition gap-4 overflow-clip"
              }
            >
              {val.icon({
                color: activeLink === val.href ? "#B61046" : "#545454",
              })}
              <AnimatePresence>
                {isExpanded && (
                  <motion.p
                    style={{ textAlign: "left" }}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    exit={{ opacity: 0, width: 0 }}
                    className={
                      activeLink === val.href
                        ? "text-app-pink"
                        : "text-app-gray-400"
                    }
                  >
                    {val.title}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default InstructorSidebar;
