import * as React from 'react'
import { NotifyContext } from 'app/contexts'
import { NotifyHookProps } from 'app/hooks/useNotify'
import { AnimatePresence, motion } from 'framer-motion'

const NotifyWrapper = ({ children }: { children: React.ReactNode }) => {

  const [shouldShow, setShouldShow] = React.useState(false)
  const [notifyValues, setNotifyValues] = React.useState<NotifyHookProps>({
    title: '',
    description: '',
    type: null,
  })
  
  const headerVisible = React.useRef(true)

  React.useEffect(() => {
    const scrollHandler = () => {
      headerVisible.current = window.scrollY <= 80
    }

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [])


  return (
    <NotifyContext.Provider
      value={{
        shouldShow,
        setShouldShow,
        notifyValues,
        setNotifyValues: (notifyValues) =>
          setNotifyValues(notifyValues as NotifyHookProps),
      }}
    >
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            className={`${
              notifyValues.type === 'error'
                ? 'bg-red-500'
                : notifyValues.type === 'success'
                ? 'bg-green-600'
                : notifyValues.type === 'warning'
                ? 'bg-yellow-500'
                : 'bg-cyan-500'
            } p-4 shadow-md rounded-md text-white fixed transition ${ headerVisible.current ? 'top-[88px]' : 'top-[8px]'} right-[8px] z-[10000] max-w-[370px]`}
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { damping: 40 } }}
            exit={{ x: 500, opacity: 0 }}
          >
            <h1 className="text-base mb-1 font-bold">{notifyValues.title}</h1>
            <p className="text-sm">{notifyValues.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </NotifyContext.Provider>
  )
}

export default NotifyWrapper
