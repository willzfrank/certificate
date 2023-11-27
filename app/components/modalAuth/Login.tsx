import { useLoginMutation } from 'app/api/authApi';
import { useLazyGetUserByIdQuery, getUserFromResponse } from 'app/api/userApi';
import { TOKEN_KEY, USER_ID_KEY, USER_TYPE_KEY } from 'app/constants';
import { useAppDispatch, useAppSelector, useNotify } from 'app/hooks';
import { updateUser, updateUserToken } from 'app/redux/actions';
import { USERTYPES } from 'app/types';
import Link from 'next/link';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { Loader } from '../elements';

type FormData = {
  userName: string;
  password: string;
  userType: USERTYPES.STUDENT;
};

interface AuthProps {
  setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = (props: AuthProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const [_, setCookies] = useCookies([TOKEN_KEY, USER_TYPE_KEY, USER_ID_KEY]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [login, { data, isLoading, isSuccess, error, isError }] =
    useLoginMutation();

  const dispatch = useAppDispatch();

  const [trigger, { isLoading: isLoadingUserDetails }] =
    useLazyGetUserByIdQuery();

  const notify = useNotify();
  const isInstructor = false;

  const handleLogin = async (data: FormData) => {
    try {
      const {
        data: { token, userId },
      } = await login(data).unwrap();

      localStorage.clear();
      // log user in and update token in store
      dispatch(updateUserToken(token));

      // set cookies
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

      // get the user details and update the store
      const userDetails = await trigger({
        id: userId,
        isInstructor,
      }).unwrap();
      dispatch(updateUser({ ...getUserFromResponse(userDetails), token }));
      props.setShowAuthModal(false);
      props.setAccessModal(true);
    } catch (error) {
      notify({
        title: 'Invalid credentials',
        description: 'Please check your email address or password',
        type: 'error',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setIsShowing((prev) => !prev);
  };

  React.useEffect(() => {
    reset({
      userName: '',
      password: '',
      userType: USERTYPES.STUDENT,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstructor, reset]);

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      {/* EMAIL ADDRESS */}
      <div className="my-3">
        <label className="text-neutral-700 text-base font-medium font-['Inter']">
          Email address
        </label>
        <input
          {...register('userName', { required: true })}
          id="email"
          type="email"
          name="userName"
          className="w-[462px] h-[51px] mt-2 px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex  text-base font-normal font-['Inter']"
          placeholder="Email"
        />
        {errors.userName && (
          <p className="text-xs text-app-pink">Your email is required</p>
        )}
      </div>

      {/* password */}
      <div className="my-3">
        <label className="text-neutral-700 text-base font-medium font-['Inter']">
          Password{' '}
        </label>
        <div className="mt-2 px-3 gap-px inline-flex justify-between items-center py-4 w-[462px] h-[51px] border border-neutral-200 rounded">
          <input
            {...register('password', { required: true })}
            id="password"
            name="password"
            type={isShowing ? 'text' : 'password'}
            className="border-none   text-base font-normal font-['Inter']"
            placeholder="Password"
          />
          <span
            className="text-neutral-700 text-base font-normal font-['Inter'] cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isShowing ? 'Hide' : 'Show'}
          </span>
        </div>
        {errors.password && (
          <p className="text-xs text-app-pink">Password required</p>
        )}
      </div>
      <Link href="/auth/forgotPassword">
        <a className="text-rose-600 my-4 text-center text-base font-normal font-['Inter']">
          Forgot Password?
        </a>
      </Link>

      <button
        type="submit"
        className="w-[460px] h-[59px] px-3 py-5 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg justify-center items-center gap-px inline-flex"
        disabled={isLoading}
      >
        <div className="text-white text-base font-medium font-['Inter']">
          {isLoading ? (
            <Loader
              className="h-16 w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              mainColor="red"
            />
          ) : (
            'LogIn'
          )}
        </div>
      </button>
    </form>
  );
};

export default Login;
