//@ts-nocheck
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { InstructorModel, USERTYPES, USER as USERMODEL } from "app/types";
import { useAppSelector, useAppDispatch } from "app/redux/hooks";
import { selectUser } from "app/redux/slices/userSlice";
import {
  useGetProfessionsQuery,
  useUpdateInstructorPictureMutation,
  useUpdateInstructorProfileMutation,
  useAddIntructorProfessionsMutation,
  useRemoveIntructorProfessionsMutation,
} from "app/api/userApi";
import { userSlice } from "app/redux/slices";
import { useNotify } from "app/hooks";

interface UserForm extends Omit<USERMODEL, "profilePictureUrl"> {
  profilePictureUrl?: string;
  profileImageFile?: File;
  userName?: string;
  professionIds?: string[];
  oldProfessions?: string[];
  bio?: string;
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

const getProfessiontToAddOrRemove = (old: string[], current: string[]) => {
  const toRemove: string[] = [];
  const toAdd: string[] = [];

  let profs: Record<string, boolean> = old.reduce(
    (list: Record<string, boolean>, prof: string) => {
      list[prof] = false;
      return list;
    },
    {}
  );

  profs = current.reduce((list: Record<string, boolean>, prof: string) => {
    if (list[prof] === false) {
      list[prof] = true;
    } else {
      prof.trim() ? toAdd.push(prof) : null;
    }
    return list;
  }, profs);

  for (const prof in profs) {
    if (!profs[prof]) {
      toRemove.push(prof);
    }
  }

  return { toAdd, toRemove };
};

const BasicInfoTab = () => {
  const user = useAppSelector(selectUser);
  const [fileError, setFileError] = useState(false);
  const dispatch = useAppDispatch();
  const notify = useNotify();

  const {
    data: professionList,
    isLoading: professionListLoading,
    isError: professionListErr,
  } = useGetProfessionsQuery();
  const [updateInstructorProfile, { isLoading, error, isError, isSuccess }] =
    useUpdateInstructorProfileMutation();

  const [
    updateInstructorPicture,
    {
      isLoading: pictureLoading,
      error: pictureError,
      isError: pictureisError,
      isSuccess: pictureSuccess,
    },
  ] = useUpdateInstructorPictureMutation();

  const [addIntructorProfessions] = useAddIntructorProfessionsMutation();
  const [removeIntructorProfessions] = useRemoveIntructorProfessionsMutation();

  const [profile, setProfile] = useState<UserForm | null>(null);

  const onChange =
    (field: keyof InstructorModel) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      if (profile) {
        if (field === "profilePictureUrl") {
          setFileError(false);
          const file = e?.target?.files ? e?.target.files[0] : null;
          if (validateImage(file as File)) {
            const body = {
              ...profile,
              profileImageFile: file as File,
              profilePictureUrl: URL.createObjectURL(file as File),
            };

            console.log(body);
            setProfile({ ...body });
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

  const onChangeProfession =
    (index: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      const updatedProfile = { ...profile };
      updatedProfile.professionIds = updatedProfile.professionIds ?? [];
      updatedProfile.professionIds[index] = e.target.value;
      setProfile(updatedProfile);
    };

  const discard = () => {
    if (user?.id) {
      setProfile({
        ...user,
        oldProfessions: user.professions.map((prof) => prof.id),
        professionIds: user.professions.map((prof) => prof.id),
      });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await updateInstructorProfile({
        lastName: profile?.lastName as string,
        instructorId: profile?.id,
        firstName: profile?.firstName as string,
        instructorLevel: profile?.instructorLevel,
        userName: profile?.userName || (profile?.email as string),
        bio: profile?.bio as string,
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

        await updateInstructorPicture({
          imageFile: formData,
          instructorId: profile?.id as string,
        })
          .unwrap()
          .then(() => {
            notify({
              title: "Profile image update success",
              type: "success",
              description: "Profile image updated",
            });
          });

        dispatch(
          userSlice.actions.updateUserProfilePicture(res.profilePictureUrl)
        );
      }

      const { toAdd, toRemove } = getProfessiontToAddOrRemove(
        [...new Set(profile?.oldProfessions)],
        [...new Set(profile?.professionIds)]
      );

      //console.log({ toAdd, toRemove });

      if (toAdd.length) {
        await addIntructorProfessions({
          instructorId: profile?.id as string,
          professionIds: toAdd,
        })
          .unwrap()
          .then(() => {
            notify({
              title: "Professions update success",
              type: "success",
              description: "Professions updated",
            });
          });
      }

      if (toRemove.length) {
        await removeIntructorProfessions({
          instructorId: profile?.id as string,
          professionIds: toRemove,
        })
          .unwrap()
          .then(() => {
            notify({
              title: "Professions update success",
              type: "success",
              description: "Professions updated",
            });
          });
      }
    } catch (error) {
      notify({
        title: "Profile update failed",
        type: "error",
        description: "Unable to update profile",
      });
    }
  };

  useEffect(() => {
    if (user?.id) {
      const instructor = user as InstructorModel;
      setProfile({
        ...instructor,
        oldProfessions: instructor.professions.map((prof) => prof.id),
        professionIds: instructor.professions.map((prof) => prof.id),
      });
    }
  }, [user]);

  return (
    <form onSubmit={onSubmit}>
      <div className="font-medium text-3xl flex  justify-between">
        <div></div>
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
      <div className="md:flex w-full md:space-x-32 mt-6 mb-14">
        <div className="font-medium text-lg mt-7 md:mt-0 md:min-w-[153px]">
          Instructor image
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
          <div>
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
                <strong>Invalid File!</strong> File must be less than 100kb and
                must end in either .jpeg, .jpg, .svg, .png, .webp or .gif
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-10 w-full md:space-x-32 md:flex">
        <p className="text-lg font-medium md:min-w-[153px]">Instructor Info</p>
        <div className="mb-5 form-inputs">
          <label htmlFor="bio" className="block mb-2 font-normal text-base">
            About me
          </label>
          <textarea
            name="bio"
            className="w-full md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
            placeholder="First name"
            value={profile?.bio}
            onChange={onChange("bio")}
            id="bio"
            rows={4}
          ></textarea>
        </div>
      </div>
      <div className="mt-10 w-full md:space-x-32 md:flex">
        <div className="text-lg font-medium md:min-w-[153px]">
          Personal data
        </div>
        <div>
          {" "}
          <form className="bg-white rounded w-full">
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
            <div className="mb-5 form-inputs mt-4 md:mt-0">
              <label className="block mb-2 font-normal text-base">Alias</label>
              <input
                id="text"
                type="text"
                name="text"
                className="w-full md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                placeholder="Alias"
                onChange={onChange("userName")}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10 w-full md:space-x-32 md:flex">
        <p className="text-lg font-medium md:min-w-[153px]">Profession</p>
        <div>
          {professionListLoading ? "Loading profs..." : null}
          {professionListErr ? "Loading profs failed..." : null}
          {professionList?.length ? (
            <div className="bg-white rounded w-full">
              <div className="mb-5 form-inputs mt-4 md:mt-0">
                <label
                  htmlFor="prof3"
                  className="block mb-2 font-normal text-base"
                >
                  Profession 1
                </label>
                <select
                  id="prof1"
                  name="prof1"
                  className="w-full capitalize md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                  placeholder="Profession 1"
                  onChange={onChangeProfession(0)}
                  value={
                    profile?.professionIds ? profile?.professionIds[0] : ""
                  }
                >
                  <option value="">Choose a profession</option>
                  {professionList?.map((profession) => (
                    <option
                      className="capitalize"
                      key={profession.id}
                      value={profession.id}
                    >
                      {profession.name.toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5 form-inputs mt-4 md:mt-0">
                <label
                  htmlFor="prof2"
                  className="block mb-2 font-normal text-base"
                >
                  Profession 2
                </label>
                <select
                  id="prof2"
                  name="prof2"
                  className="w-full capitalize md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                  placeholder="Profession 2"
                  onChange={onChangeProfession(1)}
                  value={
                    profile?.professionIds ? profile?.professionIds[1] : ""
                  }
                >
                  <option value="">Choose a profession</option>
                  {professionList?.map((profession) => (
                    <option
                      className="capitalize"
                      key={profession.id}
                      value={profession.id}
                    >
                      {profession.name.toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5 form-inputs mt-4 md:mt-0">
                <label
                  htmlFor="prof3"
                  className="block mb-2 font-normal text-base"
                >
                  Profession 3
                </label>
                <select
                  id="prof3"
                  name="prof3"
                  className="w-full capitalize md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                  placeholder="Profession 3"
                  onChange={onChangeProfession(2)}
                  value={
                    profile?.professionIds ? profile?.professionIds[2] : ""
                  }
                >
                  <option value="">Choose a profession</option>
                  {professionList?.map((profession) => (
                    <option
                      className="capitalize"
                      key={profession.id}
                      value={profession.id}
                    >
                      {profession.name.toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="md:hidden block">
        <div className="flex space-x-3">
          <div>
            {" "}
            <button
              onClick={discard}
              type="button"
              className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group hover:bg-app-fuschia focus:outline-none m py-2.5 px-5 mr-2 mb-2 text-[#B61046] bg-white border-[#B61046] focus:z-10 focus:ring-4 focus:ring-gray-200 "
            >
              Discard changes
            </button>
          </div>
          <div>
            {" "}
            <button
              type="submit"
              className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 "
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BasicInfoTab;
