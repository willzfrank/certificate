import * as React from 'react'

function StopPropagation<T extends HTMLElement>({
  children,
  elementRef,
  callback,
}: {
  children: React.ReactNode
  elementRef: React.RefObject<T>
  callback: (event: React.MouseEvent<T>) => void
}) {
    
  const clickHandler = (event: MouseEvent) => {
    event.stopPropagation()
    callback((event as unknown) as React.MouseEvent<T>)
  }

  React.useEffect(() => {
    let element: T | null = null

    if (elementRef.current) {
      element = elementRef.current
      elementRef.current.addEventListener('click', clickHandler)
    }

    return () => element?.removeEventListener('click', clickHandler)
  }, []);

  return <>{children}</>
}

export default StopPropagation
