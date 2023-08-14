import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import Link from 'next/link'
import { AccountSet, MainLayout } from 'app/components'
import Head from 'next/head'

const AccountSettings: NextPageWithLayout<{}> = () => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="md:flex md:max-w-[90%] max-w-[100%] p-5 md:p-0 md:m-10">
      <div className="md:min-w-[224px] md:p-5 space-y-7 md:self-start mt-0 md:border md:text-left text-center  ">
        <div className="hover:text-app-pink">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </div>
        {/* <div className="m hover:text-app-pink">
          <Link href="/">
            <a>Payment Methods</a>
          </Link>
        </div> */}
        <div className="text-app-pink">
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
      <div className="md:ml-[130px] w-full md:min-w-[1000px] mt-4 md:mt-0 md:border md:px-12">
        <AccountSet accountTitle="Account settings" />
      </div>
    </div>
  )
}

export default AccountSettings

AccountSettings.getLayout = function (page) {
  return (
    <MainLayout requiresLogin allowedUserTypes={[USERTYPES.STUDENT]}>
      <Head>
        <title>Account Setting | Certifications by Unify</title>
      </Head>
      {page}
    </MainLayout>
  )
}
