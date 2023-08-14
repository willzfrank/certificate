import * as React from "react";
import Link from "next/link";
import {
  Footer,
  InstructorSidebar,
  ProtectedRoute,
  DropDownMenu,
  Image,
} from "app/components";
import { useAppSelector } from "app/hooks";
import { USERTYPES } from "app/types";

enum TabValues {
  basicinformation = "basicinformation",
  bankInfo = "bankaccountinfo",
  accountSetting = "accountSettings",
  notifications = "notifications",
}

const InstructorsLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((store) => store.user);
  const [showOptions, setShowOptions] = React.useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const dropdownRef = React.useRef<HTMLButtonElement>(null);

  return (
    <ProtectedRoute
      allowedUserTypes={[USERTYPES.INSTRUCTOR]}
      redirectUrl="/dashboard"
    >
      <div className="relative">
        <InstructorSidebar />
        <div className="sticky mainContent md:pl-[calc(20vw+6px)] top-0 md:-mt-[100vh] min-h-screen p-[6px] pt-0">
          <div className="header px-6 py-2 border-b md:px-14 md:py-4 flex items-center justify-end gap-3 md:gap-8 sticky top-0 bg-white z-10">
            <Link href="./profile?page=notifications">
              <button className="rounded-full flex items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26 20C26 18.4087 25.3679 16.8826 24.2426 15.7574C23.1174 14.6321 21.5913 14 20 14C18.4087 14 16.8826 14.6321 15.7574 15.7574C14.6321 16.8826 14 18.4087 14 20C14 27 11 29 11 29H29C29 29 26 27 26 20Z"
                    stroke="#545454"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.7295 33C21.5537 33.3031 21.3014 33.5547 20.9978 33.7295C20.6941 33.9044 20.3499 33.9965 19.9995 33.9965C19.6492 33.9965 19.3049 33.9044 19.0013 33.7295C18.6977 33.5547 18.4453 33.3031 18.2695 33"
                    stroke="#545454"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="22"
                    y="9"
                    width="10"
                    height="10"
                    rx="5"
                    fill="#B61046"
                  />
                </svg>
              </button>
            </Link>
            <div>
              <button
                onClick={handleClick}
                type="button"
                className="h-8 w-8 rounded-full bg-app-dark-500 flex items-center justify-center text-white font-medium overflow-clip"
                ref={dropdownRef}
              >
                {user.profilePictureUrl ? (
                  <Image
                    src={user.profilePictureUrl}
                    alt={`${user.firstName}'s picture`}
                    layout="fill"
                    className="h-full w-full"
                  />
                ) : (
                  (user.firstName as string).charAt(0).toUpperCase() +
                  (user.lastName as string).charAt(0).toUpperCase()
                )}
              </button>
              <DropDownMenu
                ref={dropdownRef}
                isOpen={showOptions}
                close={() => setShowOptions(false)}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  );
};

export default InstructorsLayout;
