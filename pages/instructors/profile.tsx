import type { NextPageWithLayout } from 'app/types'
import { InstructorsLayout, Tabs } from 'app/components'
import {
  BankAccountInfoTab,
  BasicInfoTab,
  NotificationTab,
  AccountSettingsTab,
} from 'app/components/pages'
import { useWatchSearchParams } from 'app/hooks'
import Head from 'next/head'

enum TabValues {
  basicinformation = 'basicinformation',
  bankInfo = 'bankaccountinfo',
  accountSetting = 'accountSettings',
  notifications = 'notifications',
}

const InstructorProfile: NextPageWithLayout<{}> = () => {
  const page = useWatchSearchParams('page')

  return (
    <div className="px-14">
      <p className="text-xl font-semibold my-5">Profile</p>
      <Tabs
        isLink={true}
        containerClassName="space-x-12 my-4"
        tabs={[
          {
            href: `/instructors/profile?page=${TabValues.basicinformation}`,
            title: 'Basic information',
            active: !page || page === TabValues.basicinformation,
          },
          // {
          //   href: `/instructors/profile?page=${TabValues.bankInfo}`,
          //   title: "Bank Account Info",
          //   active: page === TabValues.bankInfo,
          // },
          {
            href: `/instructors/profile?page=${TabValues.accountSetting}`,
            title: 'Account Settings',
            active: page === TabValues.accountSetting,
          },
          {
            href: `/instructors/profile?page=${TabValues.notifications}`,
            title: 'Notifications',
            active: page === TabValues.notifications,
          },
        ]}
        id="instructor's profile tab"
      />

      <div className="flex items-center justify-end"></div>

      {(!page || page === TabValues.basicinformation) && <BasicInfoTab />}

      {page === TabValues.bankInfo && <BankAccountInfoTab />}

      {page === TabValues.accountSetting && <AccountSettingsTab />}

      {page === TabValues.notifications && <NotificationTab />}
    </div>
  )
}

export default InstructorProfile

InstructorProfile.getLayout = (page) => {
  return (
    <InstructorsLayout>
      <Head>
        <title>Profile | Certifications by Unify</title>
      </Head>
      {page}
    </InstructorsLayout>
  )
}
