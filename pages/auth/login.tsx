import * as React from 'react'
import Link from 'next/link'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import { BlurPasswordInput, Button, MainLayout, Tabs } from 'app/components'
import { LoginBody, useLoginMutation } from 'app/api/authApi'
import { getUserFromResponse, useLazyGetUserByIdQuery } from 'app/api/userApi'
import {
  useAppDispatch,
  useAppSelector,
  useNotify,
  useWatchSearchParams,
} from 'app/hooks'
import { useRouter } from 'next/router'
import { updateUser, updateUserToken } from 'app/redux/actions'
import { useCookies } from 'react-cookie'
import { TOKEN_KEY, USER_TYPE_KEY, USER_ID_KEY } from 'app/constants'
import { useForm } from 'react-hook-form'
import Head from 'next/head'

type FormData = {
  userName: string
  password: string
  userType: USERTYPES
}

const Login: NextPageWithLayout<{}> = () => {
  const router = useRouter()
  const searchParam = useWatchSearchParams('as')
  const isInstructor =
    searchParam === 'instructor' || router.asPath.includes('instructor')
  const [_, setCookies] = useCookies([TOKEN_KEY, USER_TYPE_KEY, USER_ID_KEY])
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const [
    login,
    { data, isLoading, isSuccess, error, isError },
  ] = useLoginMutation()

  const dispatch = useAppDispatch()
  const user = useAppSelector((store) => store.user)

  const [
    trigger,
    { isLoading: isLoadingUserDetails },
  ] = useLazyGetUserByIdQuery()

  // const [data, setdata] = React.useState<LoginBody>({
  //   userName: "",
  //   password: "",
  //   userType: isInstructor ? USERTYPES.INSTRUCTOR : USERTYPES.STUDENT,
  // });

  // update the isInstructor form field when the user uses the slider
  React.useEffect(() => {
    reset({
      userName: '',
      password: '',
      userType: isInstructor ? USERTYPES.INSTRUCTOR : USERTYPES.STUDENT,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstructor, reset])

  // redirect to the appropriate page when the userState changes
  React.useEffect(() => {
    if (user.id) {
      // redirectTo is the key in the URL
      if (router.query.redirectTo) {
        router.push(router.query.redirectTo as string)
      } else {
        if (user.roleName?.toLowerCase() === USERTYPES.STUDENT) {
          router.push('/dashboard')
        } else {
          router.push('/instructors/overview')
        }
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id])

  const notify = useNotify()
  const handleLogin = async (data: FormData) => {
    try {
      const {
        data: { token, userId },
      } = await login(data).unwrap()

      localStorage.clear()
      // log user in and update token in store
      dispatch(updateUserToken(token))

      // set cookies
      setCookies(TOKEN_KEY, token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
        path: '/',
      })
      setCookies(USER_TYPE_KEY, data.userType, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
        path: '/',
      })
      setCookies(USER_ID_KEY, userId, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
        path: '/',
      })

      // get the user details and update the store
      const userDetails = await trigger({ id: userId, isInstructor }).unwrap()
      dispatch(updateUser({ ...getUserFromResponse(userDetails), token }))
    } catch (error) {
      notify({
        title: 'Invalid credentials',
        description: 'Please check your email address or password',
        type: 'error',
      })
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center min-h-[75vh] my-16">
      <div className="flex-wrap items-center justify-center w-full max-w-[475px]">
        <form
          className="md:px-10 px-6 border-0 md:pt-8 pb-8 mx-2 mb-4 bg-white md:border-2 md:border-app-stroke rounded "
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="mb-7">
            <div className="font-normal text-center text-xl text-app-dark-500">
              Log in to your account
            </div>
          </div>

          <Tabs
            isLink
            id={'loginTab'}
            tabs={[
              {
                href: `/auth/login?as=${USERTYPES.STUDENT}`,
                title: 'Student',
                active: !isInstructor,
              },
              {
                href: `/auth/login?as=${USERTYPES.INSTRUCTOR}`,
                title: 'Instructor',
                active: isInstructor,
              },
            ]}
          />

          <div className="mb-5 form-inputs">
            <label className="block mb-2 font-normal text-base">Email</label>
            <input
              {...register('userName', { required: true })}
              id="email"
              type="email"
              name="userName"
              className="w-full px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
              placeholder="Email"
            />
            {errors.userName && (
              <p className="text-xs text-app-pink">Your email is required</p>
            )}
          </div>

          <div className="mb-6 form-inputs">
            <label htmlFor="" className="block mb-2 text-base font-normal ">
              Password
            </label>
            <BlurPasswordInput
              render={(isShowing) => (
                <input
                  {...register('password', { required: true })}
                  id="password"
                  name="password"
                  type={isShowing ? 'text' : 'password'}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                  placeholder="Password"
                />
              )}
            />
            {errors.password && (
              <p className="text-xs text-app-pink">Password required</p>
            )}
          </div>
          <div className="mt-5">
            <Button
              loading={isLoading || isLoadingUserDetails}
              type="submit"
              className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group hover:bg-app-fuschia focus:outline-none m py-2.5 px-5 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 hover:bg-[#B61046] hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 "
            >
              Log in
            </Button>
          </div>
          <div className="items-center">
            <div className="text-sm text-center">
              <div className="mt-7">
                <Link href="/auth/forgotPassword">
                  <a className="font-normal text-app-pink ">Forgot password?</a>
                </Link>
              </div>
              <div>
                <p className="font-normal mt-4">
                  Don&apos;t have an account?{' '}
                  <span className="text-app-pink">
                    <Link href="/auth/register">
                      <a>Sign up</a>
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

Login.getLayout = (page) => {
  return (
    <MainLayout
      allowedUserTypes={[USERTYPES.STUDENT, USERTYPES.INSTRUCTOR]}
      completeFooter
    >
      <Head>
        <title>Login to your account | Certifications by Unify</title>
      </Head>
      {page}
    </MainLayout>
  )
}
