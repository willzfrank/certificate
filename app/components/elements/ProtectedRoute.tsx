import * as React from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from 'app/hooks'
import { USERTYPES } from 'app/types'
import { useCookies } from 'react-cookie'
import { TOKEN_KEY, USER_TYPE_KEY } from 'app/constants'

const ProtectedRoute = ({
  children,
  allowedUserTypes,
  redirectUrl,
}: {
  children: React.ReactNode
  allowedUserTypes: USERTYPES[]
  redirectUrl?: string
}): JSX.Element => {
  const router = useRouter()
  const [cookie] = useCookies([TOKEN_KEY, USER_TYPE_KEY])
  const { asPath } = useRouter()
  const [hasRendered, setHasRendered] = React.useState(false)

  const user = useAppSelector((store) => store.user)

  const isLoggedIn = Boolean(user.id || cookie[TOKEN_KEY])

  const isAllowed =
    allowedUserTypes.find(
      (usertype) =>
        usertype.toLowerCase() ===
        (user.roleName?.toLowerCase() || cookie[USER_TYPE_KEY]?.toLowerCase()),
    ) === cookie[USER_TYPE_KEY]?.toLowerCase()

  const isInstructorOnly =
    allowedUserTypes.length === 1 &&
    allowedUserTypes[0].toLowerCase() === USERTYPES.INSTRUCTOR

  React.useEffect(() => {
    if (!isLoggedIn) {
      const regExp = /\[\w+\]$/

      if (!regExp.test(asPath))
        router.replace(
          `/auth/login?redirectTo=${encodeURIComponent(asPath)}&as=${
            isInstructorOnly ? 'instructor' : 'student'
          }`,
        )
    } else {
      if (!isAllowed) {
        router.replace(
          redirectUrl ||
            '/auth/login' +
              '?redirectTo=' +
              encodeURIComponent(asPath) +
              '&as=' +
              isInstructorOnly
            ? 'instructor'
            : 'student',
        )
      }
    }

    setHasRendered(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  if (hasRendered) {
    return isLoggedIn ? <>{children}</> : <></>
  }

  return <div />
}

export default ProtectedRoute
