import { ProtectedRoute } from 'app/components/elements';
import { USERTYPES } from 'app/types';
import CourseDetailsNavbar from '../courseDetailsComponent/CourseDetailsNavbar';
import SmoothScroll from './SmoothScroll';

const CourseDetailsLayout = ({
  children,
  completeFooter = false,
  requiresLogin,
  redirectUrl,
  allowedUserTypes,
}: {
  children: React.ReactNode;
  completeFooter?: boolean;
  requiresLogin?: boolean;
  allowedUserTypes: USERTYPES[];
  redirectUrl?: string;
}) => {
  if (requiresLogin) {
    return (
      <ProtectedRoute
        allowedUserTypes={allowedUserTypes}
        redirectUrl={redirectUrl}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </ProtectedRoute>
    );
  }

  return <SmoothScroll>{children}</SmoothScroll>;
};

export default CourseDetailsLayout;
