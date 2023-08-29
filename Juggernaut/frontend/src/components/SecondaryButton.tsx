// import { Link } from 'react-router-dom'
type PropsType = {
  text: string
  disabled?: boolean
  onClick?: ((e?: any) => void) | ((e?: any) => Promise<void>)
}

export default function SecondaryButton({
  text,
  disabled,
  onClick,
}: PropsType) {
  return (
    <div
      className={`bg-gradient pop-on-hover ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      } h-fit rounded-full p-px font-semibold`}
      onClick={disabled ? undefined : onClick}
    >
      <div
        className={`${
          disabled ? '' : 'hover:bg-gradient'
        } rounded-full bg-bgBlack px-8 py-3`}
      >
        <p className={`font-primary ${disabled ? 'text-disabledGray' : ''}`}>
          {text}
        </p>
      </div>
    </div>
  )
}
