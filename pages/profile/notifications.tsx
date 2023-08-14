import React from 'react'
import Head from 'next/head'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import Link from 'next/link'
import { MainLayout } from 'app/components'
import { NotificationContent } from 'app/components/notificiations/NotificationContent'
import { useGetUserNotificationsQuery } from 'app/api/userApi'
import { useAppSelector } from 'app/hooks'

// const subHeading = 'font-medium text-xl mt-7'
// const subText = 'mt-5'

// const notificationsContent = [
//   {
//     content:
//       'You’ve successfully completed the “Zero to Hero, baking” course. Check your email to find your certificate!',
//     timeOfNotification: '2hr ago',
//   },
//   {
//     content:
//       'You started the “Zero to Hero, baking “ course. Your learning journey begins! Remember to stay consistent',
//     timeOfNotification: '11/20/2022',
//   },
// ]

const Notifications: NextPageWithLayout<{}> = () => {
  const { id: userId, token } = useAppSelector((store) => store.user)

  const {
    data: notificationsResponse,
    isLoading: isLoadingNotifications,
  } = useGetUserNotificationsQuery({
    userId: userId as string,
    page: 1,
    perPage: 20,
    token: token as string,
  })

  const notifications = notificationsResponse?.data?.pagedList

  return (
    <>
      <Head>
        <title>Profile | Certifications by Unify</title>
      </Head>
      <div className="md:flex md:max-w-[90%] max-w-[100%] p-5 md:p-0 md:m-10">
        <div className="md:min-w-[224px] md:p-5 space-y-7 md:self-start mt-0 md:border md:text-left text-center  ">
          <div className="hover:text-app-pink">
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </div>
          {/* <div className="m hover:text-app-pink">
          <Link href="/profile/terms">
            <a>Payment Methods</a>
          </Link>
        </div> */}
          <div className="hover:text-app-pink">
            <Link href="/profile/accountsettings">
              <a>Account Settings</a>
            </Link>
          </div>
          <div className="text-app-pink pb-6">
            <Link href="/profile/notifications">
              <a>Notifications</a>
            </Link>
          </div>
        </div>
        <div className="md:ml-[130px] w-full md:min-w-[1000px] mt-4 md:mt-0 md:border md:px-12 md:min-h-[70vh]">
          <div className="font-medium text-3xl md:mt-10 flex  justify-between">
            <div>Notifications</div>
          </div>
          <div>
            {!isLoadingNotifications &&
            notifications &&
            notifications.length > 0 ? (
              <NotificationContent
                notifications={notifications.map((not) => ({
                  timeOfNotification: '10/20/2022',
                  content: not.content,
                }))}
              />
            ) : (
              <div className="mt-5">No notifications yet</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notifications

Notifications.getLayout = function (page) {
  return (
    <MainLayout requiresLogin allowedUserTypes={[USERTYPES.STUDENT]}>
      {page}
    </MainLayout>
  )
}
