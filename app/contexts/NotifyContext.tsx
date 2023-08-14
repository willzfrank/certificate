import * as React from 'react'
import { NotifyHookProps } from 'app/hooks/useNotify'

const NotifyContext = React.createContext<{
  shouldShow: boolean
  setShouldShow: Function
  notifyValues: NotifyHookProps
  setNotifyValues: (notifyValues?: NotifyHookProps) => void
} | null>(null)

export default NotifyContext
