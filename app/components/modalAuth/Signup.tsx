// @ts-nocheck

import { useLoginMutation, useRegisterMutation } from 'app/api/authApi'
import { useNotify } from 'app/hooks'

import { USERTYPES } from 'app/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader } from '../elements'

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  userType: USERTYPES
  userGroupId?: string
}

interface AuthProps {
  setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
}

const Signup = (props: AuthProps) => {
  const [hasRegisteredSuccessfully, setHasRegisteredSuccessfully] =
    React.useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const [register, { isLoading, isError, error, isSuccess, data }] =
    useRegisterMutation()

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
      userGroupId: undefined,
    },
  })

  React.useEffect(() => {
    reset({
      firstName: '',
      lastName: '',
      email: (router?.query?.email as string) || '',
      password: '',
      userGroupId: '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, router])

  const notify = useNotify()

  React.useEffect(() => {
    if (isSuccess) {
      props.setActiveTab(2)
      notify({
        title: 'Success',
        description: 'Your account has been created successfully',
        type: 'success',
      })
    }

    if (isError) {
      const errorMessage =
        error?.data?.errors[0]?.errorMessages || 'Something went wrong'

      notify({
        title: 'Error',
        description: errorMessage,
        type: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, data, error])

  const password = watch('password')

  const handleFormSubmission = (data: FormData) => {
    register(data)
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmission)}>
      <div className="flex items-start md:items-center flex-wrap md:flex-row flex-col md:justify-between justify-start ">
        <div className="flex flex-col items-start space-y-2 mb-3">
          <label className="text-neutral-700 text-base font-medium font-['Inter']">
            First name
          </label>{' '}
          <input
            className="w-full md:w-[215px] h-[51px] px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex  text-base font-normal font-['Inter']"
            placeholder="First name"
            {...rhfregister('firstName', {
              required: 'First name is required',
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters long',
              },
            })}
            id="text"
            type="text"
            name="firstName"
          />
          {errors.firstName && (
            <p className="text-xs text-app-pink">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start space-y-2 mb-3">
          <label className="text-neutral-700 text-base font-medium font-['Inter']">
            Last name
          </label>{' '}
          <input
            {...rhfregister('lastName', {
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters long',
              },
            })}
            id="lastName"
            type="text"
            name="lastName"
            className="w-full md:w-[215px] h-[51px] px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex  text-base font-normal font-['Inter']"
            placeholder="Last name"
          />
          {errors.lastName && (
            <p className="text-xs text-app-pink">{errors.lastName.message}</p>
          )}
        </div>
      </div>
      {/* EMAIL ADDRESS */}
      <div className="flex flex-col">
        <label className="text-neutral-700 text-base font-medium font-['Inter']">
          Email address
        </label>
        <input
          {...rhfregister('email', { required: true })}
          id="email"
          type="email"
          name="email"
          className="w-full md:w-[462px] h-[51px] mt-2 px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex  text-base font-normal font-['Inter']"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-xs text-app-pink">Email required</p>
        )}
      </div>

      {/* password */}
      <div className="my-3 flex flex-col">
        <label className="text-neutral-700 text-base font-medium font-['Inter']">
          Password{' '}
        </label>
        <div className="mt-2 px-3 gap-px inline-flex justify-between items-center py-4 w-full md:w-[462px] h-[51px] border border-neutral-200 rounded">
          <input
            {...rhfregister('password', {
              required: 'You must specify a password',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
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
        <div className="flex flex-wrap w-[250px] md:w-full ">
          <span className="text-neutral-600 text-sm font-normal font-['Inter']">
            I have read, understood and agreed to the{' '}
            <Link href="/privacy/policy">
              <a className="text-rose-600 text-sm font-normal font-['Inter'] underline cursor-pointer">
                Terms and Conditions
              </a>
            </Link>
          </span>
        </div>
      </div>
      <button
        type="submit"
        className="w-full md:w-[462px] h-[59px] px-3 py-5 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg justify-center items-center gap-px inline-flex"
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
  )
}

export default Signup
