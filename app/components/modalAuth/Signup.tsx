import { useLoginMutation, useRegisterMutation } from 'app/api/authApi';
import { useAppDispatch, useNotify } from 'app/hooks';
import { TOKEN_KEY, USER_ID_KEY, USER_TYPE_KEY } from 'app/constants';

import { USERTYPES } from 'app/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader } from '../elements';
import { updateUser, updateUserToken } from 'app/redux/actions';
import { useCookies } from 'react-cookie';
import { useLazyGetUserByIdQuery, getUserFromResponse } from 'app/api/userApi';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: USERTYPES;
  userGroupId?: string;
};

interface AuthProps {
  setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setAccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup = (props: AuthProps) => {
  const [_, setCookies] = useCookies([TOKEN_KEY, USER_TYPE_KEY, USER_ID_KEY]);

  const [hasRegisteredSuccessfully, setHasRegisteredSuccessfully] =
    React.useState(false);
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [register, { isLoading, isError, error, isSuccess, data }] =
    useRegisterMutation();

  const [trigger, { isLoading: isLoadingUserDetails }] =
    useLazyGetUserByIdQuery();

  const router = useRouter();
  const [
    login,
    {
      isLoading: loginLoading,
      isSuccess: LoadngSuccess,
      error: loadingError,
      isError: isLoadingError,
    },
  ] = useLoginMutation();

  const {
    register: rhfregister,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      userGroupId: undefined,
    },
  });

  React.useEffect(() => {
    reset({
      firstName: '',
      lastName: '',
      email: (router?.query?.email as string) || '',
      password: '',
      userGroupId: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, router]);

  const notify = useNotify();

  React.useEffect(() => {
    if (isSuccess) {
      props.setActiveTab(2);
      notify({
        title: 'Success',
        description: 'Your account has been created successfully',
        type: 'success',
      });
    }

    // if (isError)
    //   notify({
    //     title: 'Error',
    //     description:
    //       'Error creating account. Please check if account already exists',
    //     type: 'error',
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, data, error]);

  const password = watch('password');

  const handleFormSubmission = async (data: FormData) => {
    try {
      // Call the register endpoint
      await register(data).unwrap();

      // Notify success if registration is successful
      notify({
        title: 'Success',
        description: 'Your account has been created.',
        type: 'success',
      });
    } catch (error) {
      // Handle errors for registration without rethrowing
      console.error('Registration error:', error);
    }

    // Call the login endpoint whether registration succeeds or results in an error
    const loginData = {
      userName: data.email,
      password: data.password,
      userType: USERTYPES.STUDENT,
    };

    try {
      const loginResponse = await login(loginData).unwrap();
      const { token, userId } = loginResponse.data;

      // Update the user details in the store and set cookies
      dispatch(updateUserToken(token));

      setCookies(TOKEN_KEY, token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
        path: '/',
      });

      setCookies(USER_TYPE_KEY, data.userType, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
        path: '/',
      });

      setCookies(USER_ID_KEY, userId, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
        path: '/',
      });

      // Get the user details and update the store
      const userDetails = await trigger({
        id: userId,
        isInstructor: false, // Assuming isInstructor is always false for students
      }).unwrap();

      dispatch(updateUser({ ...getUserFromResponse(userDetails), token }));

      // Set the appropriate modals
      props.setAccessModal(true);
      props.setShowAuthModal(false);

      // Notify success
      notify({
        title: 'Success',
        description: 'You are now logged in.',
        type: 'success',
      });
    } catch (error) {
      // Handle errors for login
      console.error('Login error:', error);
      notify({
        title: 'Error',
        description: 'Error logging in after registration.',
        type: 'error',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmission)}>
      <div className="flex items-center flex-wrap justify-between">
        <div className="flex flex-col items-start space-y-2 mb-3">
          <label className="text-neutral-700 text-base font-medium font-['Inter']">
            First name
          </label>{' '}
          <input
            className="w-[215px] h-[51px] px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex  text-base font-normal font-['Inter']"
            placeholder="First name"
            {...rhfregister('firstName', { required: true })}
            id="text"
            type="text"
            name="firstName"
          />
          {errors.firstName && (
            <p className="text-xs text-app-pink">First name required</p>
          )}
        </div>
        <div className="flex flex-col items-start space-y-2 mb-3">
          <label className="text-neutral-700 text-base font-medium font-['Inter']">
            Last name
          </label>{' '}
          <input
            {...rhfregister('lastName', { required: true })}
            id="lastName"
            type="text"
            name="lastName"
            className="w-[215px] h-[51px] px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex  text-base font-normal font-['Inter']"
            placeholder="Last name"
          />
          {errors.lastName && (
            <p className="text-xs text-app-pink">Last name required</p>
          )}
        </div>
      </div>
      {/* EMAIL ADDRESS */}
      <div>
        <label className="text-neutral-700 text-base font-medium font-['Inter']">
          Email address
        </label>
        <input
          {...rhfregister('email', { required: true })}
          id="email"
          type="email"
          name="email"
          className="w-[462px] h-[51px] mt-2 px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex  text-base font-normal font-['Inter']"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-xs text-app-pink">Email required</p>
        )}
      </div>

      {/* password */}
      <div className="my-3">
        <label className="text-neutral-700 text-base font-medium font-['Inter']">
          Password{' '}
        </label>
        <div className="mt-2 px-3 gap-px inline-flex justify-between items-center py-4 w-[462px] h-[51px] border border-neutral-200 rounded">
          <input
            {...rhfregister('password', {
              required: 'You must specify a password',
            })}
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            className="border-none  w-full  text-base font-normal font-['Inter']"
            placeholder="Password"
          />
          <span
            className="text-neutral-700 text-base font-normal font-['Inter'] cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        {errors.password && (
          <p className="text-xs text-app-pink">{errors.password.message}</p>
        )}
      </div>

      {/* CHECKBOX */}
      <div className="flex items-center gap-2 my-3">
        <input
          type="checkbox"
          name=""
          id="terms"
          required
          className="cursor-pointer"
        />
        <div>
          <span className="text-neutral-600 text-sm font-normal font-['Inter']">
            I have read, understood and agreed to the{' '}
          </span>
          <Link href="/privacy/policy">
            <a className="text-rose-600 text-sm font-normal font-['Inter'] underline cursor-pointer">
              Terms and Conditions
            </a>
          </Link>
        </div>
      </div>
      <button
        type="submit"
        className="w-[462px] h-[59px] px-3 py-5 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg justify-center items-center gap-px inline-flex"
        disabled={isLoading}
      >
        <div className="text-white text-base font-medium font-['Inter']">
          {isLoading ? (
            <Loader
              className="h-16 w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              mainColor="red"
            />
          ) : (
            'Sign Up'
          )}
        </div>
      </button>
    </form>
  );
};

export default Signup;
