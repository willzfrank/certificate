import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import { NextPageWithLayout, USERTYPES } from "app/types";
import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "app/components";
import { USER as USERMODEL } from "app/types";
import { useAppSelector } from "app/redux/hooks";
import { selectUser } from "app/redux/slices/userSlice";
import {
  useUpdateStudentPictureMutation,
  useUpdateStudentProfileMutation,
} from "app/api/userApi";
import { useNotify } from "app/hooks";

interface UserForm extends Omit<USERMODEL, "profilePictureUrl"> {
  profilePictureUrl?: string;
  profileImageFile?: File;
}

const validateImage = (imageFile?: File) => {
  if (
    imageFile &&
    imageFile.name.match(/.(jpg|jpeg|png|gif|webp|svg)$/i) &&
    imageFile.size / 1000 < 100
  ) {
    return true;
  }
  return false;
};

const getUrl = (imageUrl?: string, imageFile?: File) => {
  if (imageFile) {
    return URL.createObjectURL(imageFile);
  }
  return (
    imageUrl ||
    "https://certification-by-unify.s3.amazonaws.com/6787fce5-bfe2-46e2-8985-be6dfda5e5f8-imageKey?AWSAccessKeyId=AKIAWGSLF2G2J2TJ475M&Expires=1690031061&Signature=aNAzOTmiYYz2r%2F9xUiKt18Ix%2F78%3D"
  );
};

const Profile: NextPageWithLayout<{}> = () => {
  const user = useAppSelector(selectUser);
  const [fileError, setFileError] = useState(false);
  const notify = useNotify();

  const [profile, setProfile] = useState<UserForm | null>(null);
  const [updateStudentProfile, { isLoading, error, isError, isSuccess }] =
    useUpdateStudentProfileMutation();
  useUpdateStudentPictureMutation;
  const [
    updateStudentPicture,
    {
      isLoading: pictureLoading,
      error: pictureError,
      isError: pictureisError,
      isSuccess: pictureSuccess,
    },
  ] = useUpdateStudentPictureMutation();

  const onChange =
    (field: keyof USERMODEL) => (e: ChangeEvent<HTMLInputElement>) => {
      if (profile) {
        if (field === "profilePictureUrl") {
          setFileError(false);

          const file = e?.target?.files ? e.target.files[0] : null;
          if (validateImage(file as File)) {
            setProfile({
              ...profile,
              profileImageFile: file as File,
              profilePictureUrl: URL.createObjectURL(file as File),
            });
          } else {
            setFileError(true);
          }
        } else {
          setProfile({
            ...profile,
            [field]: e.target.value,
          });
        }
      }
    };

  const discard = () => {
    if (user?.id) {
      setProfile({ ...user });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateStudentProfile({
        firstName: profile?.firstName as string,
        lastName: profile?.lastName as string,
        studentId: profile?.id as string,
      })
        .unwrap()
        .then(() => {
          notify({
            title: "Profile update success",
            type: "success",
            description: "Profile updated",
          });
        });

      if (profile?.profileImageFile) {
        const formData = new FormData();

        formData.append(
          "imageFile",
          profile.profileImageFile,
          profile.profileImageFile.name
        );

        await updateStudentPicture({
          imageFile: formData,
          studentId: profile?.id as string,
        })
          .unwrap()
          .then(() => {
            notify({
              title: "Profile image update success",
              type: "success",
              description: "Profile image updated",
            });
          });
      }
    } catch (error) {
      console.log(100, error);
      notify({
        title: "Profile update failed",
        type: "error",
        description: "Unable to update profile",
      });
    }
  };

  useEffect(() => {
    if (user?.id) {
      setProfile({ ...user });
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Profile | Certifications by Unify</title>
      </Head>
      <div className="md:flex md:max-w-[90%] max-w-[100%] p-5 md:p-0 md:m-10">
        <div className="md:min-w-[224px] md:p-5 space-y-7 md:self-start mt-0 md:border md:text-left text-center  ">
          <div className="text-app-pink">
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </div>

          <div className="m hover:text-app-pink">
            <Link href="/profile/accountsettings">
              <a>Account Settings</a>
            </Link>
          </div>
          <div className="m hover:text-app-pink pb-6">
            <Link href="/profile/notifications">
              <a>Notifications</a>
            </Link>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="md:ml-[130px] w-full md:min-w-[1000px] mt-4 md:mt-0 md:border md:px-12"
        >
          <div className="font-medium text-3xl md:mt-10 flex  justify-between">
            <div>Profile</div>
            <div className="md:flex space-x-2 hidden">
              <div>
                <button
                  onClick={discard}
                  type="button"
                  className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group hover:bg-app-fuschia focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-[#B61046] bg-white border-[#B61046] focus:z-10 focus:ring-4 focus:ring-gray-200 "
                >
                  Discard changes
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                >
                  {isLoading ? "Updating..." : "Save changes"}{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full md:space-x-32 md:flex">
            <div className="text-xl font-medium md:min-w-[153px]">
              Basic Information
            </div>
            <div>
              <div className="bg-white rounded w-full">
                <div className="mb-5 form-inputs mt-4 md:mt-0">
                  <label className="block mb-2 font-normal text-base">
                    First name
                  </label>
                  <input
                    id="text"
                    type="text"
                    name="text"
                    className="w-full md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                    placeholder="First name"
                    value={profile?.firstName}
                    onChange={onChange("firstName")}
                  />
                </div>
                <div className="mb-5 form-inputs">
                  <label className="block mb-2 font-normal text-base">
                    Last name
                  </label>
                  <input
                    id="text"
                    type="text"
                    name="text"
                    className="w-full px-3 md:min-w-[400px] py-2 leading-tight text-gray-700 border border-app-gray rounded"
                    placeholder="Last name"
                    value={profile?.lastName}
                    onChange={onChange("lastName")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex w-full md:space-x-32 mt-6 mb-14">
            <div className="font-medium text-xl mt-7 md:min-w-[153px]">
              Profile image
            </div>
            <div className="space-y-3 mt-4 md:mt-0">
              <div className="relative w-36 aspect-square">
                {profile?.profilePictureUrl || user?.profilePictureUrl ? (
                  <Image
                    src={getUrl(
                      profile?.profilePictureUrl || user?.profilePictureUrl,
                      profile?.profileImageFile
                    )}
                    alt={`${profile?.firstName} avatar`}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="142"
                    height="103"
                    fill="none"
                    viewBox="0 0 142 103"
                  >
                    <rect
                      width="140.096"
                      height="102"
                      x="0.5"
                      y="0.5"
                      fill="#F7EFF4"
                      rx="5.14"
                    ></rect>
                    <path
                      fill="#C5B8C9"
                      fillRule="evenodd"
                      d="M86.109 37.658a15.503 15.503 0 01-15.562 15.556 15.505 15.505 0 01-15.562-15.556 15.503 15.503 0 0115.562-15.553 15.5 15.5 0 0115.562 15.553zM70.547 80.895c-12.75 0-23.516-2.072-23.516-10.068 0-7.998 10.833-9.997 23.516-9.997 12.754 0 23.516 2.072 23.516 10.067 0 7.999-10.833 9.998-23.516 9.998z"
                      clipRule="evenodd"
                    ></path>
                    <rect
                      width="140.096"
                      height="102"
                      x="0.5"
                      y="0.5"
                      stroke="#ADADAD"
                      rx="5.14"
                    ></rect>
                  </svg>
                )}
              </div>
              <div className="relative pb-6">
                <div className="border rounded-[4px] overflow-hidden flex items-stretch justify-between md:min-w-[400px] pl-4">
                  <input
                    type="file"
                    placeholder="No image uploaded"
                    className="opacity-0"
                    id="file"
                    accept="image/*"
                    onChange={onChange("profilePictureUrl")}
                  />

                  <label
                    htmlFor="file"
                    className="border-2 border-app-gray-400 px-4 rounded-[4px] py-[6px] font-normal text-base"
                  >
                    Select file
                  </label>
                </div>
                {fileError ? (
                  <p className="text-app-pink text-sm absolute italic py-1">
                    <strong>Invalid File!</strong> File must be less than 100kb
                    and must end in either .jpeg, .jpg, .svg, .png, .webp or
                    .gif
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="md:hidden block">
            <div className="flex space-x-3">
              <div>
                <button
                  onClick={discard}
                  type="button"
                  className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group hover:bg-app-fuschia focus:outline-none m py-2.5 px-5 mr-2 mb-2 text-[#B61046] bg-white border-[#B61046] focus:z-10 focus:ring-4 focus:ring-gray-200 "
                >
                  Discard changes
                </button>
              </div>
              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                >
                  {isLoading ? "Updating..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;

Profile.getLayout = function (page) {
  return (
    <MainLayout
      requiresLogin
      allowedUserTypes={[USERTYPES.STUDENT]}
      redirectUrl="/instructors/profile"
    >
      {page}
    </MainLayout>
  );
};
