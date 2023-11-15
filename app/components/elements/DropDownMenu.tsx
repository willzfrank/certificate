import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { USERTYPES } from 'app/types';
import { useAppSelector } from 'app/hooks';
import { Image } from 'app/components';
import Link from 'next/link';
import { API_URL } from 'app/constants';

enum TabValues {
  inProgress = 'inProgress',
  wishlist = 'wishlist',
  completed = 'completed',
}

enum TabValues {
  basicinformation = 'basicinformation',
  bankInfo = 'bankaccountinfo',
  accountSetting = 'accountSettings',
  notifications = 'notifications',
}

interface DropdownMenuProps {
  isOpen: boolean;
  close: () => void;
}

const DropDownMenu: React.ForwardRefRenderFunction<
  HTMLElement,
  DropdownMenuProps
> = ({ isOpen, close }, ref) => {
  const user = useAppSelector((store) => store.user);
  const isInstructor = user.roleName?.toLowerCase() === USERTYPES.INSTRUCTOR;

  const divRef = React.useRef<HTMLDivElement>(null);

  const handleLinkClick = () => {
    close();
  };
  /// I should extract this too a hook or a higher order component but i'm too lazy to... lol 🫠

  const clickOutListener = React.useCallback(
    (e: MouseEvent) => {
      if (
        !divRef.current?.contains(e.target as HTMLElement) &&
        //@ts-ignore
        !ref.current?.contains(e.target as HTMLElement)
      ) {
        close();
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    document.body.addEventListener('click', clickOutListener);

    return () => document.body.removeEventListener('click', clickOutListener);
  }, []);

  const href =
    API_URL === 'https://api-certifications.unifyedu.ng/api/v1'
      ? 'https://blog.unifyedu.ng/'
      : 'https://unify-prod-blog.azurewebsites.net/';
      

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={divRef}
          className="absolute min-w-[500px] px-6 py-4 top-full right-0 z-20 bg-white rounded divide-y divide-gray-100 shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex px-4 py-3 space-x-3 text-sm text-black">
            <div className="relative flex items-center justify-center w-8 h-8 font-medium text-white rounded-full bg-app-dark-500 overflow-clip">
              {user.profilePictureUrl ? (
                <Image
                  src={user.profilePictureUrl}
                  alt={`${user.firstName}'s picture`}
                  layout="fill"
                  className="w-full h-full"
                />
              ) : (
                (user.firstName as string).charAt(0).toUpperCase() +
                (user.lastName as string).charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <div>{`${user.firstName} ${user.lastName}`}</div>
              <div className="font-medium truncate">{user.email}</div>
            </div>
          </div>

          {isInstructor ? (
            <div className="flex space-x-6">
              <ul className="py-1 text-sm text-black">
                <li onClick={handleLinkClick}>
                  <Link href="/instructors/profile">
                    <a className="block px-4 py-2 hover:text-app-pink">
                      Profile
                    </a>
                  </Link>
                </li>
                <li onClick={handleLinkClick}>
                  <Link href="/instructors/courses">
                    <a className="block px-4 py-2 hover:text-app-pink">
                      My courses
                    </a>
                  </Link>
                </li>
              </ul>
              <ul className="py-1 text-sm text-black">
                <li onClick={handleLinkClick}>
                  <Link
                    href={`/instructors/profile?page=${TabValues.accountSetting}`}
                  >
                    <a className="block px-4 py-2 hover:text-app-pink">
                      Account settings
                    </a>
                  </Link>
                </li>
                <li onClick={handleLinkClick}>
                  <Link
                    href={`/instructors/profile?page=${TabValues.notifications}`}
                  >
                    <a className="block px-4 py-2 hover:text-app-pink">
                      Notifications
                    </a>
                  </Link>
                </li>
              </ul>
              <ul className="py-1 text-sm text-black">
                <ul>
                  <li onClick={handleLinkClick}>
                    <Link href="/instructors/overview">
                      <a className="block px-4 py-2 hover:text-app-pink">
                        Dashboard
                      </a>
                    </Link>
                  </li>
                  <li onClick={handleLinkClick}>
                    <Link href="/auth/logout">
                      <a className="block px-4 py-2 text-sm text-black hover:text-app-pink">
                        Log out
                      </a>
                    </Link>
                  </li>
                </ul>
              </ul>
            </div>
          ) : (
            <div className="flex space-x-6">
              <ul className="py-1 text-sm text-black">
                <li onClick={handleLinkClick}>
                  <Link href="/profile">
                    <a className="block px-4 py-2 hover:text-app-pink">
                      Profile
                    </a>
                  </Link>
                </li>
                <li onClick={handleLinkClick}>
                  <Link href="/dashboard">
                    <a className="block px-4 py-2 hover:text-app-pink">
                      My courses
                    </a>
                  </Link>
                </li>
                <li onClick={handleLinkClick}>
                  <Link href={`/dashboard?page=${TabValues.wishlist}`}>
                    <a className="block px-4 py-2 hover:text-app-pink">
                      Wishlist
                    </a>
                  </Link>
                </li>
                <li onClick={handleLinkClick}>
                  <Link href="/profile/notifications">
                    <a className="block px-4 py-2 hover:text-app-pink">
                      Notifications
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/profile/certificates">
                    <a className="block px-4 py-2 hover:text-app-pink">
                      Certificates
                    </a>
                  </Link>
                </li> */}
              </ul>
              <ul className="py-1 text-sm text-black">
                <li onClick={handleLinkClick}>
                  <Link href="/profile/accountsettings">
                    <a className="block px-4 py-2 hover:text-app-pink">
                      Account settings
                    </a>
                  </Link>
                </li>
                {/* <li>
                <Link href="/profile/paymentmethods">
                  <a className="block px-4 py-2 hover:text-app-pink">
                    Payment information
                  </a>
                </Link>
              </li> */}
                <li onClick={handleLinkClick}>
                  <Link href={href}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 hover:text-app-pink"
                    >
                      Blog
                    </a>
                  </Link>
                </li>
                <li onClick={handleLinkClick}>
                  <a
                    href="mailto:hello@certifications.unify.edu.ng"
                    className="block px-4 py-2 hover:text-app-pink"
                  >
                    Support
                  </a>
                </li>
              </ul>
              <div className="py-1" onClick={handleLinkClick}>
                <Link href="/auth/logout">
                  <a className="block px-4 py-2 text-sm text-black hover:text-app-pink">
                    Log out
                  </a>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.forwardRef(DropDownMenu);
