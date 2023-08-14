import * as React from 'react'

interface CheckboxProps {
  value: boolean
  className?: string
  onClick?: (value: boolean) => void
}

const Checkbox = (props: CheckboxProps) => {

  const [checked, setChecked] = React.useState(Object.assign({}, props).value) // state should not be initialized from props.

  const handleClick = () => {
    setChecked(!checked)
    props.onClick && props.onClick(checked)
  }

  return (
    <button
      onClick={handleClick}
      className={`w-5 h-5 rounded-full border-2 border-app-pink p-[3px] ${
        props.className || ''
      }`}
    >
      <div className={`transition duration-300 w-full h-full ${props.value ? 'bg-app-pink' : 'bg-transparent'} ${props.value ? 'scale-100' : 'scale-50'} rounded-full`}></div>
    </button>
  )
}

export default Checkbox;
