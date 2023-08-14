import * as React from 'react'
import type { NextPage } from 'next'
import { useCookies } from 'react-cookie'
import { USER_TYPE_KEY, TOKEN_KEY, USER_ID_KEY } from 'app/constants'
import { Loader, Redirect } from 'app/components'
import { useAppDispatch } from 'app/hooks'
import { logoutUser } from 'app/redux/actions'

const Logout: NextPage = () => {
  const [_, __, removeCookies] = useCookies([
    USER_TYPE_KEY,
    USER_ID_KEY,
    TOKEN_KEY,
  ])

  const dispatch = useAppDispatch()
  const [hasCleared, setHasCleared] = React.useState(false)

  React.useEffect(() => {

    dispatch(logoutUser())

    removeCookies(USER_TYPE_KEY, { path: '/' })
    removeCookies(USER_ID_KEY, { path: '/' })
    removeCookies(TOKEN_KEY, { path: '/' })
    
    localStorage.clear()
    
    setHasCleared(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return hasCleared ? (
    <div className="h-screen w-screen items-center justify-center flex">
      <Loader mainColor="red" className="h-40 w-40" />
    </div>
  ) : (
    <Redirect to="/auth/login" />
  )
}

export default Logout
