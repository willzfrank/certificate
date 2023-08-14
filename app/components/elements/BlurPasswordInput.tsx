import * as React from 'react'

const BlurPasswordInput = (props: {
  render: (isShowing: boolean) => React.ReactElement<HTMLInputElement>
  containerClassName?: string
  controllerClassName?: string
}) => {

  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  return (
    <div className="relative">

      {props.render(showPassword)}

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-[50%] -translate-y-[50%] right-3 text-sm text-app-pink"
      >
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  )
}


export default BlurPasswordInput
