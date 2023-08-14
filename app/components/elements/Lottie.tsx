import * as React from 'react'
import LottieWeb, { AnimationConfigWithData } from 'lottie-web'

const Lottie = ({
  className,
  text,
  config,
}: {
  className?: string
  text?: string
  config: Omit<AnimationConfigWithData, 'container'>
}) => {
  const lottieRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    LottieWeb.loadAnimation({
      loop: true,
      autoplay: true,
      ...config,
      container: lottieRef.current as HTMLDivElement,
    })

    return () => LottieWeb.destroy()
  }, [config])

  return (
    <React.Fragment>
      <div ref={lottieRef} className={className}></div>
      {text ? (
        <p className="text-center text-sm text-gray-600 -translate-y-14">
          {text}
        </p>
      ) : null}
    </React.Fragment>
  )
}

export default React.memo(Lottie);
