import * as React from "react"
import { SVGProps } from "react"

const FileUploadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={76}
    height={81}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M62.969 65.686c0 2.592-2.1 4.692-4.692 4.692H17.614a4.692 4.692 0 0 1-4.692-4.692V9.384c0-2.591 2.1-4.692 4.692-4.692h27.772c1.244 0 2.438.494 3.317 1.374l12.892 12.891a4.692 4.692 0 0 1 1.374 3.318v43.411Z"
      fill="#BCCFFC"
    />
    <path
      d="M22.697 29.325h26.588v3.127H22.697v-3.127Zm0 6.255H43.03v3.128H22.697V35.58Zm0 6.256h26.588v3.128H22.697v-3.128Zm0 6.256H43.03v3.128H22.697v-3.128Z"
      fill="#fff"
    />
    <rect x={6} y={60} width={21} height={21} rx={10.5} fill="#4B7DF3" />
    <path
      d="M16.692 66.394v8.211M12.586 70.5h8.211"
      stroke="#fff"
      strokeWidth={1.759}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default FileUploadIcon
