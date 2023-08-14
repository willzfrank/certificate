import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { NextPageWithLayout, USERTYPES } from "app/types";
import { MainLayout, Loader } from "app/components";
import { useWatchSearchParams } from "app/hooks";
import { useLazyVerifyEmailQuery } from "app/api/authApi";

const VerifyEmail: NextPageWithLayout<{}> = () => {
  const [emailAddress, confirmationToken] = useWatchSearchParams([
    "emailAddress",
    "confirmationToken",
  ]) as string[];

  const [loading, setLoading] = React.useState(true);
  const [verifyEmail] = useLazyVerifyEmailQuery();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (emailAddress && confirmationToken) {
        try {
          const res = await verifyEmail({ confirmationToken, emailAddress })
            .unwrap()
            .then((data) => console.log);
          // console.log(res)
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [emailAddress, confirmationToken, verifyEmail]);

  // update the isInstructor form field when the user uses the slider

  return (
    <div className="flex flex-wrap items-center justify-center min-h-[60vh] my-16">
      {loading ? (
        <div className="flex items-center justify-center flex-col">
          <Loader mainColor="red" className="w-24 h-24" />
          <h1>Verifying email, please wait...</h1>
        </div>
      ) : error ? (
        <div>
          <h1 className="text-2xl text-center">An error occurred</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4">
          <Image
            src="/images/success.svg"
            alt="account successfullt verified"
            width={150}
            height={150}
          />
          <h1 className="text-2xl">Email verification successful</h1>
          <p className="text-muted">
            Please proceed to{" "}
            <Link href="/auth/login">
              <a className="text-app-pink">login</a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

VerifyEmail.getLayout = (page) => {
  return (
    <MainLayout
      allowedUserTypes={[USERTYPES.STUDENT, USERTYPES.INSTRUCTOR]}
      completeFooter
    >
      {page}
    </MainLayout>
  );
};
