import { NotifyContext } from 'app/contexts'
import * as React from 'react'

export interface NotifyHookProps {
    title: string
    description?: string,
    type: 'error' | 'success' | 'info' | 'warning' | null
}

const useNotify = () => {

    const notifyContextValues = React.useContext(NotifyContext)

    if (notifyContextValues === null) {
        const ERROR_MSG = 'Could not find NotifyContext. Did you forget to wrap your component with NotifyWrapper?'
        throw new Error(ERROR_MSG);
    }

    const { shouldShow, setNotifyValues, setShouldShow } = notifyContextValues;

    React.useEffect(() => {

        let timeout: NodeJS.Timeout;

        if (shouldShow) {
            timeout = setTimeout(() => {
                setNotifyValues({ title: '', description: '', type: null })
                setShouldShow(false)
            }, 3000)
        }

        return () => clearTimeout(timeout)

    }, [setNotifyValues, setShouldShow, shouldShow])

    const notify = React.useCallback(function (options: NotifyHookProps) {
        setNotifyValues(options)
        setShouldShow(true)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return notify;
}

export default useNotify;