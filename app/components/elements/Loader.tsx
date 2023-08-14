import * as React from 'react'
import Lottie from './Lottie'
import whiteMainLottie from 'app/lotties/loading.json'
import redMainLottie from 'app/lotties/loading2.json'


const Loader = ({
  className,
  mainColor,
  text,
}: {
  className?: string
  mainColor?: 'white' | 'red'
  text?: string
}) => {
  return (
    <React.Fragment>
      <Lottie
        className={className}
        config={{
          loop: true,
          autoplay: true,
          animationData:
            mainColor === 'red' ? redMainLottie : whiteMainLottie,
        }}
      />

      {text ? (
        <p className="text-center text-sm text-gray-600 -translate-y-14">
          {text}
        </p>
      ) : null}
    </React.Fragment>
  )
}

export default React.memo(Loader)
