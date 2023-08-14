import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppSelector, useNotify } from "app/hooks";
import { BlurPasswordInput, Button } from "../elements";
import { useForm } from "react-hook-form";
import { useUpdateUserPasswordMutation } from "app/api/userApi";

interface AccountProps {
  accountTitle: string;
}

const AccountSet = ({ accountTitle }: AccountProps) => {
  const { email, roleName, id } = useAppSelector((store) => store.user);
  let [isOpen, setIsOpen] = useState(false);
  const [updatePassword, { isLoading }] = useUpdateUserPasswordMutation();
  const notify = useNotify();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    reValidateMode: "onChange",
  });

  const password = watch("newPassword");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const discard = () => {
    reset({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  async function onSubmit() {
    handleSubmit(
      async ({ oldPassword, newPassword }) => {
        try {
          const res = await updatePassword({
            isInstructor: roleName?.toLowerCase().trim() === "instructor",
            oldPassword,
            newPassword,
            userId: id as string,
          }).unwrap();

          if (res.errors.length === 0) {
            notify({
              title: "Password changed successfully",
              type: "success",
              description: "You have successfully changed your password",
            });
          } else {
            notify({
              title: "Password change failed",
              type: "error",
              description: res.errors[0].errorMessages[0],
            });
          }
        } catch (er) {
          notify({
            title: "Password change failed",
            type: "error",
            description: "Could not change your password",
          });
        }
      },
      (stuffs) => {
        console.log(stuffs);
      }
    )();
  }

  return (
    <div>
      <div className="flex justify-between text-3xl font-medium md:mt-10">
        <div>{accountTitle}</div>
        <div className="hidden space-x-2 md:flex">
          <button
            onClick={discard}
            type="button"
            className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group hover:bg-app-fuschia focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-[#B61046] bg-white border-[#B61046] focus:z-10 focus:ring-4 focus:ring-gray-200 text-center"
          >
            Discard changes
          </button>

          <Button
            onClick={onSubmit}
            type="submit"
            className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 !h-auto"
            loading={isLoading}
            // disabled={!isValid}
          >
            Save changes
          </Button>
        </div>
      </div>
      <div className="w-full mt-10 md:space-x-32 md:flex">
        <div className="text-xl font-medium md:min-w-[160px]">
          Email address
        </div>
        <div>
          {" "}
          <form className="w-full bg-white rounded">
            <div className="mt-4 mb-5 form-inputs md:mt-0">
              <label className="block mb-2 text-base font-normal">
                Email address
              </label>
              <div className="relative flex items-stretch justify-between overflow-hidden">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full md:min-w-[400px] px-3 py-2 pr-10 leading-tight text-gray-700 border border-app-gray rounded"
                  placeholder="Email address"
                  value={email}
                  disabled
                />
                {/* <button
                  type="button"
                  onClick={openModal}
                  className="absolute right-4 top-2/4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <rect width="24" height="24" fill="#EAEAEA" rx="12"></rect>
                    <path
                      stroke="#545454"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.125"
                      d="M12.873 16.221h3.626"
                    ></path>
                    <path
                      fillRule="evenodd"
                      stroke="#545454"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.125"
                      d="M12.39 7.897a1.123 1.123 0 011.558-.151l.867.673c.52.315.681.983.36 1.492-.017.028-4.769 5.971-4.769 5.971a.85.85 0 01-.655.317l-1.82.022-.41-1.735c-.057-.244 0-.5.159-.697l4.71-5.892z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      stroke="#545454"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.125"
                      d="M11.512 9l2.726 2.094"
                    ></path>
                  </svg>
                </button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mt-5 md:mt-10 md:space-x-32 md:flex">
        <div className="font-medium text-xl md:min-w-[160px]">
          Change password
        </div>
        <div>
          <form className="w-full bg-white rounded">
            <div className="mt-4 mb-5 form-inputs md:mt-0">
              <label className="block mb-2 text-base font-normal">
                Current password
              </label>
              <BlurPasswordInput
                render={(showPassword) => (
                  <input
                    id="password"
                    {...register("oldPassword", { required: true })}
                    className="w-full md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                    placeholder="Current password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                  />
                )}
              />
            </div>
            <div className="mt-4 mb-5 form-inputs md:mt-0">
              <label className="block mb-2 text-base font-normal">
                New password
              </label>
              <BlurPasswordInput
                render={(showPassword) => (
                  <input
                    {...register("newPassword", {
                      required: true,
                    })}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                    autoComplete="new-password"
                    placeholder="New password"
                  />
                )}
              />
            </div>
            <div className="mt-4 mb-5 form-inputs md:mt-0">
              <label className="block mb-2 text-base font-normal">
                Confirm new password
              </label>
              <BlurPasswordInput
                render={(showPassword) => (
                  <input
                    id="password"
                    {...register("confirmPassword", {
                      validate: (val: string) => {
                        if (password != val || !val?.trim()) {
                          return "Your passwords do not match";
                        }
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    className="w-full md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                    autoComplete="new-password"
                    placeholder="Confirm new password
                  "
                  />
                )}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="flex space-x-3">
          <button
            onClick={discard}
            type="button"
            className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group hover:bg-app-fuschia focus:outline-none  py-2.5 px-5 mr-2 mb-2 text-[#B61046] bg-white border-[#B61046] focus:z-10 focus:ring-4 focus:ring-gray-200 text-center"
          >
            Discard changes
          </button>
          <Button
            onClick={onSubmit}
            loading={isLoading}
            className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group focus:outline-none py-2.5 px-5 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 !h-auto"
          >
            Save changes
          </Button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 m-2 md:min-w-[531px]"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white divide-y shadow-xl rounded-xl">
                  <Dialog.Title as="h3" className="relative p-4 font-medium">
                    <div className="font-sans text-center">Change Email</div>
                    <button
                      type="button"
                      className="absolute right-4 top-2/4 -translate-y-2/4"
                      onClick={closeModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="#2F2D37"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12.994 1.005l-11.99 11.99M13 13.002L1 1"
                        ></path>
                      </svg>
                    </button>
                  </Dialog.Title>
                  <div className="p-6 px-[50px]">
                    <div className="mt-2">
                      <form className="w-full bg-white rounded">
                        <div className="mt-4 mb-5 form-inputs md:mt-0">
                          <label className="block mb-2 text-base font-normal">
                            Password
                          </label>
                          <input
                            id="password"
                            name="password"
                            className="w-full md:min-w-[200px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                            autoComplete="new-password"
                            placeholder="Current password
                  "
                          />
                        </div>

                        <div className="mt-4 mb-5 form-inputs md:mt-0">
                          <label className="block mb-2 text-base font-normal">
                            New email address
                          </label>
                          <div className="relative flex items-stretch justify-between overflow-hidden">
                            <input
                              id="email"
                              type="email"
                              name="email"
                              className="w-full md:min-w-[200px] px-3 py-2 pr-10 leading-tight text-gray-700 border border-app-gray rounded"
                              placeholder="New email address
                  "
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="my-9">
                      {" "}
                      <button
                        type="submit"
                        className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                      >
                        Change email address
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export { AccountSet };
