import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface Props {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "warning" | "danger";
}

const Spinner: React.FC<Props> = ({
  size = "sm",
  variant = "secondary",
  className = "",
}) => {
  return (
    <div
      className={clsx(
        {
          "border-primary-500/25 border-t-primary-600": variant === "primary",
          "border-black/10 border-t-black": variant === "secondary",
          "border-yellow-500/25 border-t-yellow-400": variant === "warning",
          "border-red-500/25 border-t-red-500": variant === "danger",

          "h-4 w-4 border-[2px]": size === "xs",
          "h-5 w-5 border-2": size === "sm",
          "h-8 w-8 border-[3px]": size === "md",
          "h-10 w-10 border-2": size === "lg",
        },
        "rounded-full animate-spin ease-in-out ",
        className
      )}
    />
  );
};

export default Spinner;
