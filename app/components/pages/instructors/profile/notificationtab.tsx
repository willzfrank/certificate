import * as React from 'react'
import { NotificationContent } from 'app/components/notificiations/NotificationContent'
import { useAppSelector } from 'app/hooks'
import { useGetUserNotificationsQuery } from 'app/api/userApi'

const InstructorNotification = () => {
  const { id: userId = '' } = useAppSelector((store) => store.user)

  const {
    data: notificationResponse,
    isLoading: isLoadingNotifications,
  } = useGetUserNotificationsQuery({
    userId,
    page: 1,
    perPage: 1000,
  })

  const notifications = notificationResponse?.data?.pagedList

  return (
    <div>
      {notifications && notifications.length > 0 ? (
        <NotificationContent
          notifications={notifications.map((notification) => ({
            timeOfNotification: '2/10/22',
            content: notification.content,
          }))}
        />
      ) : (
        <div className="mt-5">No notifications yet</div>
      )}
    </div>
  )
}

export default InstructorNotification
