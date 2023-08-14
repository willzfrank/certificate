import * as React from 'react'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import { Button, MainLayout, Redirect } from 'app/components'
import { useLazyCompletePasswordResetQuery } from 'app/api/authApi'
import { useNotify } from 'app/hooks'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/router'

type FormData = {
  password: string
  confirm_password: string
  confirmationToken: string
  emailAddress: string
}

const ResetPassword: NextPageWithLayout<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>()

  const router = useRouter()

  const [resetPassword, { isFetching }] = useLazyCompletePasswordResetQuery()
  const notify = useNotify()
  const [hasRendered, setHasRendered] = React.useState(false)
  const [confirmationToken, emailAddress] = watch([
    'confirmationToken',
    'emailAddress',
  ])

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.href.split('?')[1])
    reset({
      password: '',
      confirm_password: '',
      confirmationToken: searchParams.get('confirmationToken') || '',
      emailAddress: searchParams.get('emailAddress') || '',
    })

    setHasRendered(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFormSubmit = async (data: FormData) => {
    const res = await resetPassword({
      email: data.emailAddress,
      confirmationToken: data.confirmationToken,
      newPassword: data.password,
    })

    if (res.isSuccess) {
      notify({
        title: 'Success✔',
        description:
          'Your password has been reset successfully. You can now login',
        type: 'success',
      })

      router.push('/auth/login')
    } else {
      notify({
        title: 'Error 🚫',
        description:
          'An error occurred while resetting password, please try again',
        type: 'error',
      })
    }
  }

  if (hasRendered && !(emailAddress && confirmationToken)) {
    return (
      <Redirect
        to="/auth/forgotPassword"
        onRedirect={() =>
          notify({
            type: 'error',
            title: 'Email & Token not found',
            description:
              'Please check your mail for a link to reset your password or input your email address to get a new one',
          })
        }
      />
    )
  }

  const password = watch('password')
  return (
    <div className="flex flex-wrap items-center justify-center min-h-[75vh] my-16">
      <div className="flex-wrap items-center justify-center w-full max-w-[475px]">
        <form
          className="px-10 pt-8 pb-8 mx-2 mb-4 bg-white border-2 border-app-stroke rounded "
          method="POST"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="mb-7">
            <div className="font-normal text-center text-xl text-app-dark-500">
              Set a new password?
            </div>
          </div>

          <div className="mb-5 form-inputs">
            <label
              htmlFor="password"
              className="block mb-2 font-normal text-base"
            >
              Password
            </label>
            <input
              {...register('password', {
                required: 'You must specify a password',
              })}
              name="password"
              id="password"
              type="password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-xs text-app-pink">{errors.password.message}</p>
            )}

            <label
              htmlFor="confirmPassword"
              className="block mb-2 font-normal text-base mt-6"
            >
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              {...register('confirm_password', {
                //@ts-ignore
                validate: (val: string) => {
                  if (password != val || !val?.trim()) {
                    return 'Your passwords do not match'
                  }
                },
              })}
              name="confirm_password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
              placeholder="Confirm Password"
            />
            {errors.confirm_password && (
              <p className="text-xs text-app-pink">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
          <div className="mt-10">
            <Button
              loading={isFetching}
              type="submit"
              className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group hover:bg-app-fuschia focus:outline-none m py-2.5 px-5 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 hover:bg-[#B61046] hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 "
            >
              Change Password
            </Button>
          </div>

          <p className="text-sm mt-6 text-center">
            Already have an account?{' '}
            <Link href="/auth/login">
              <a className="text-app-pink">Login</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword

ResetPassword.getLayout = (page) => {
  return (
    <MainLayout
      allowedUserTypes={[USERTYPES.STUDENT, USERTYPES.INSTRUCTOR]}
      completeFooter
    >
      {page}
    </MainLayout>
  )
}
