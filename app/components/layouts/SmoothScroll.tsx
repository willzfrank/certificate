import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react'
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from 'framer-motion'

import { deviceType as getDeviceType } from 'app/utils'

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [pageHeight, setPageHeight] = useState(0)

  // update scrollable height when browser is resizing
  const resizePageHeight = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setPageHeight(entry.contentRect.height)
    }
  }, [])

  // observe when browser is resizing
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      resizePageHeight(entries),
    )
    scrollRef.current && resizeObserver.observe(scrollRef.current)
    return () => resizeObserver.disconnect()
  }, [scrollRef, resizePageHeight])

  const { scrollY } = useViewportScroll()

  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight])

  const physics = { damping: 15, mass: 0.27, stiffness: 55 }
  const spring = useSpring(transform, physics)

  const [deviceType, setDeviceType] = useState<
    ReturnType<typeof getDeviceType>
  >()

  useEffect(() => {
    setDeviceType(getDeviceType())
  }, [])

  if (deviceType === 'mobile') {
    return <div className="softgradientbackground">{children}</div>
  }

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y: spring }} // translateY of scroll container using negative scroll value
        className="scroll-container softgradientbackground"
      >
        {children}
      </motion.div>

      <div style={{ height: pageHeight }}></div>
    </>
  )
}

export default SmoothScroll
