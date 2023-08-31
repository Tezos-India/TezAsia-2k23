import React from "react";
import Link, { LinkProps } from "next/link";

type Props = {
  children: React.ReactNode;
} & LinkProps;

const NextLink = ({ children, ...rest }: Props) => {
  return (
    <Link {...rest}>
      <a>{children}</a>
    </Link>
  );
};

export default NextLink;
