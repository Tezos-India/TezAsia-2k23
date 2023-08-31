import Tippy, { TippyProps } from "@tippyjs/react";
import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
// import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css'

type Props = {
  className?:string
  content: ReactNode | string;
  children: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
} & TippyProps;

const Tooltip = ({content,children,className='',...rest}: Props) => {
  return <Tippy placement="bottom" animation='scale' arrow={false} className={'!rounded-lg px-3 py-1 !bg-white border border-gray-500 !shadow-xl '+className}
   {...rest} content={content}>{children}</Tippy>;
};

export default Tooltip;
