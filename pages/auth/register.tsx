import * as React from 'react'
import { MainLayout } from 'app/components/layouts'
import type { NextPageWithLayout } from 'app/types'
import Link from 'next/link'
import { Tabs, Button, BlurPasswordInput } from 'app/components'
import { useWatchSearchParams } from 'app/hooks'
import { USERTYPES } from 'app/types'
import { useRegisterMutation, RegisterBody } from 'app/api/authApi'
import { useNotify } from 'app/hooks'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Head from 'next/head'

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirm_password: string
  userType: USERTYPES
  userGroupId?: string
}

const Register: NextPageWithLayout<{}> = () => {
  const [
    register,
    { isLoading, isError, error, isSuccess, data },
  ] = useRegisterMutation()

  const [searchParam, userGroupId] = useWatchSearchParams([
    'as',
    'userGroupId',
  ]) as [string, string]
  const router = useRouter()

  const {
    register: rhfregister,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      userGroupId: userGroupId || undefined,
    },
  })

  React.useEffect(() => {
    if (userGroupId) setValue('userGroupId', userGroupId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userGroupId])

  const isInstructor = searchParam === USERTYPES.INSTRUCTOR
  const [
    hasRegisteredSuccessfully,
    setHasRegisteredSuccessfully,
  ] = React.useState(false)

  const notify = useNotify()

  React.useEffect(() => {
    reset({
      firstName: '',
      lastName: '',
      email: (router?.query?.email as string) || '',
      password: '',
      confirm_password: '',
      userGroupId: undefined,
      userType: isInstructor ? USERTYPES.INSTRUCTOR : USERTYPES.STUDENT,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstructor, reset, router])

  React.useEffect(() => {
    if (isSuccess) {
      setHasRegisteredSuccessfully(true)
      notify({
        title: 'Success',
        description: 'Your account has been created successfully',
        type: 'success',
      })
    }

    if (isError)
      notify({
        title: 'Error',
        description:
          'Error creating account. Please check if account already exists',
        type: 'error',
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, data, error])

  const handleFormSubmission = (data: FormData) => {
    register(data)
  }

  if (hasRegisteredSuccessfully) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center  text-center">
        <p className="flex gap-3 items-center text-app-dark-500 text-xl">
          You&apos;ve got mail{' '}
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect y="0.5" width="24" height="24" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_246_4190"
                  transform="scale(0.0138889)"
                />
              </pattern>
              <image
                id="image0_246_4190"
                width="72"
                height="72"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </p>

        <p className="text-muted w-1/3 mt-4 mb-12 leading-6">
          Email verification. Follow the link sent to your email to verify your
          email address and log in to your account
        </p>

        <p className="text-sm">
          Already verified?{' '}
          <Link href="/auth/login">
            <a className="text-app-pink">Login</a>
          </Link>
        </p>
      </div>
    )
  }

  const password = watch('password')
  const formValues = watch()
  return (
    <div className="flex flex-wrap items-center justify-center min-h-[75vh] my-16">
      <div className="flex-wrap items-center justify-center w-full max-w-[475px]">
        <form
          onSubmit={handleSubmit(handleFormSubmission)}
          className="md:px-10 px-6 border-0 md:pt-8 pb-8 mx-2 mb-4 bg-white md:border-2 md:border-app-stroke rounded "
        >
          <div className="mb-7">
            <div className="font-normal text-center text-xl text-app-dark-500">
              Sign up and start your journey
            </div>
          </div>

          <Tabs
            isLink
            id={'registrationTab'}
            tabs={[
              {
                href: `/auth/register?as=${USERTYPES.STUDENT}`,
                title: 'Student',
                active: !isInstructor,
              },
              {
                href: `/auth/register?as=${USERTYPES.INSTRUCTOR}`,
                title: 'Instructor',
                active: isInstructor,
              },
            ]}
          />
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div className="mb-5 form-inputs">
              <label className="block mb-2 font-normal text-base">
                First name
              </label>
              <input
                {...rhfregister('firstName', { required: true })}
                id="text"
                type="text"
                name="firstName"
                className="w-full px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-xs text-app-pink">First name required</p>
              )}
            </div>
            <div className="mb-5 form-inputs">
              <label className="block mb-2 font-normal text-base">
                Last name
              </label>
              <input
                {...rhfregister('lastName', { required: true })}
                id="lastName"
                type="text"
                name="lastName"
                className="w-full px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="text-xs text-app-pink">Last name required</p>
              )}
            </div>
          </div>

          <div className="mb-5 form-inputs">
            <label className="block mb-2 font-normal text-base">Email</label>
            <input
              {...rhfregister('email', { required: true })}
              id="email"
              type="email"
              name="email"
              className="w-full px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-xs text-app-pink">Email required</p>
            )}
          </div>
          <div className="mb-6 form-inputs">
            <label htmlFor="" className="block mb-2 text-base font-normal ">
              Password
            </label>
            <div className="relative">
              <BlurPasswordInput
                render={(showPassword) => (
                  <input
                    {...rhfregister('password', {
                      required: 'You must specify a password',
                    })}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                    placeholder="Password"
                  />
                )}
              />
              {errors.password && (
                <p className="text-xs text-app-pink">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-6 form-inputs">
            <label htmlFor="" className="block mb-2 text-base font-normal ">
              Confirm password
            </label>
            <div className="relative">
              <BlurPasswordInput
                render={(showConfirmPassword) => (
                  <input
                    {...rhfregister('confirm_password', {
                      //@ts-ignore
                      validate: (val: string) => {
                        if (password != val || !val?.trim()) {
                          return 'Your passwords do not match'
                        }
                      },
                    })}
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                    placeholder="Confirm Password"
                  />
                )}
              />

              {/* {errors.confirm_password && (
                  <p className="text-xs text-app-pink">Password required</p>
                )} */}
              {errors.confirm_password && (
                <p className="text-xs text-app-pink">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300"
            >
              I have read and agree to the{' '}
              <Link href="/privacy/policy">
                <a className="text-app-pink">terms & Conditions</a>
              </Link>
            </label>
          </div>
          <div className="mt-5">
            <Button
              loading={isLoading}
              type="submit"
              className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group hover:bg-app-fuschia focus:outline-none m py-2.5 px-5 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 hover:bg-[#B61046] hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 "
            >
              Sign up
            </Button>
          </div>
          <div className="items-center">
            <div className="text-sm text-center">
              <div>
                <p className="font-normal text-base mt-4">
                  Have an account?{' '}
                  <span className="text-app-pink">
                    <Link href="/auth/login">
                      <a>Login</a>
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

export default Register

Register.getLayout = (page) => (
  <MainLayout
    allowedUserTypes={[USERTYPES.STUDENT, USERTYPES.INSTRUCTOR]}
    completeFooter
  >
    <Head>
      <title>Create an account | Certifications by Unify</title>
    </Head>
    {page}
  </MainLayout>
)
