import * as React from 'react'
import { useCookies } from 'react-cookie'
import { useLazyGetUserByIdQuery } from 'app/api/userApi'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { TOKEN_KEY, USER_ID_KEY, USER_TYPE_KEY } from 'app/constants'
import { USERTYPES } from 'app/types'
import { getUserFromResponse } from 'app/api/userApi'
import Redirect from '../Redirect'
import { updateUser, updateUserToken } from 'app/redux/actions'

export default function PersistAuthState({
  children,
}: {
  children: React.ReactNode
}) {
  const [cookies] = useCookies([TOKEN_KEY, USER_TYPE_KEY, USER_ID_KEY])

  const dispatch = useAppDispatch()

  const [getUserDetails] = useLazyGetUserByIdQuery()

  React.useEffect(() => {
    ;(async function () {
      if (cookies[TOKEN_KEY]) {

        dispatch(updateUserToken(cookies[TOKEN_KEY]))
        
        const userDetailsRes = await getUserDetails({
          id: cookies[USER_ID_KEY],
          isInstructor: cookies[USER_TYPE_KEY] === USERTYPES.INSTRUCTOR,
        }).unwrap()


        dispatch(
          updateUser({
            ...getUserFromResponse(userDetailsRes),
            token: cookies[TOKEN_KEY],
          }),
        )
      } else {
        return <Redirect to="/auth/login" />
      }
    })()
  }, [])

  return children
}
