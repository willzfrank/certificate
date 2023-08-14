import * as React from 'react'
import Loader from './Loader'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
  loaderColor?: React.ComponentProps<typeof Loader>['mainColor']
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { loading, loaderColor = 'white', ...otherProps },
  ref,
) => {
  return (
    <button
      {...otherProps}
      ref={ref}
      className={`h-12 disabled:bg-gray-400 ${otherProps.className} ${
        loading ? 'pointer-events-none' : ''
      }`}
      disabled={otherProps.disabled || loading}
    >
      {loading ? (
        <div className="w-full h-full relative">
          <Loader
            className="h-16 w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            mainColor={loaderColor}
          />
        </div>
      ) : (
        otherProps.children
      )}
    </button>
  )
}

const ButtonWithRef = React.forwardRef(Button)

export default ButtonWithRef
