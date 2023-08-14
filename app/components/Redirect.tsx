import * as React from 'react'
import router from 'next/router'

const Redirect = ({ to, onRedirect }: { to: string, onRedirect?: () => void }) => {
  React.useEffect(() => {
    router.replace(to);

    if (onRedirect) {
      onRedirect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to])
  return null
}


export default Redirect;