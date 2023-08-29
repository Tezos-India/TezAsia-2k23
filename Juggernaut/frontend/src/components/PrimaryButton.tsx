// import { Link } from 'react-router-dom'
type PropsType = {
  text: string
  disabled?: boolean
  onClick?: ((e?: any) => void) | ((e?: any) => Promise<void>)
}

export default function PrimaryButton({ text, disabled, onClick }: PropsType) {
  return (
    <div
      className={`pop-on-hover bg-gradient ${
        disabled ? 'cursor-default' : 'hover:bg-gradient-reverse cursor-pointer'
      } h-fit w-fit rounded-full p-0 px-8 py-3 font-semibold`}
      onClick={disabled ? undefined : onClick}
    >
      <p className={`font-primary ${disabled ? 'text-disabledGray' : ''}`}>
        {text}
      </p>
    </div>
  )
}
