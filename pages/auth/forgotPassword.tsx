import React from 'react'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import { Button, MainLayout } from 'app/components'
import { useRequestPasswordResetMutation } from 'app/api/authApi'
import { useNotify } from 'app/hooks'
import { useForm } from 'react-hook-form'
import Head from 'next/head'

type FormData = {
  email: string
}

const ForgotPassword: NextPageWithLayout<{}> = () => {
  const [email, setEmail] = React.useState<string>('')
  const [
    requestPasswordReset,
    { isLoading },
  ] = useRequestPasswordResetMutation()
  const notify = useNotify()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const handleFormSubmit = async (data: FormData) => {
    try {
      const res = await requestPasswordReset(data.email).unwrap()

      if (res.errors.length === 0) {
        notify({
          title: 'Success ✔',
          description: 'Please check your mail for link to reset your password',
          type: 'success',
        })
      } else {
        notify({
          title: 'Error 🚫',
          description: "Couldn't reset password. Please try again.",
          type: 'error',
        })
      }
    } catch (error) {
      notify({
        title: 'Error 🚫',
        description: "Couldn't reset password. Please try again.",
        type: 'error',
      })
    }
  }

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
              Forgot Password?
            </div>
          </div>
          <div className="text-center text-app-gray text-[15px] mb-10">
            <p>
              Enter your email and we’ll send a reset link, remember to check
              your spam if you cant find our mail
            </p>
          </div>

          <div className="mb-5 form-inputs">
            <label className="block mb-2 font-normal text-base">Email</label>
            <input
              {...register('email', { required: true })}
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
          <div className="mt-10">
            <Button
              loading={isLoading}
              type="submit"
              className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group hover:bg-app-fuschia focus:outline-none m py-2.5 px-5 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 hover:bg-[#B61046] hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 "
            >
              Send mail
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword

ForgotPassword.getLayout = (page) => {
  return (
    <MainLayout
      allowedUserTypes={[USERTYPES.STUDENT, USERTYPES.INSTRUCTOR]}
      completeFooter
    >
      <Head>
        <title>Forgot Password | Certifications by Unify</title>
      </Head>
      {page}
    </MainLayout>
  )
}
