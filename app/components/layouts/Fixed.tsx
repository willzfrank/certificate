import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Fixed = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const [mounted, setMounted] = useState(false)
  const [fixedElement, setFixedElement] = useState<Element>()

  useEffect(() => {
    setMounted(true)
    const fixedElement = document.getElementById('fixed') as Element
    setFixedElement(fixedElement)

    return () => {
      fixedElement.className = ''
      console.log('unmounting')
    }
  }, [])

  if (mounted && fixedElement) {
    fixedElement.classList.add('fixed')
    fixedElement.classList.add('z-50')
    fixedElement.classList.add(...(className?.split(' ') || []))
    return createPortal(children, fixedElement)
  }

  return null
}

export default Fixed
