import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  className?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", error = "", className = "", ...props },
  ref
) {
  return (
    <label className="w-full">
      {label && <div className="mb-2 font-medium text-gray-500">{label}</div>}
      <div className="flex items-center ring-1 ring-gray-300  hover:shadow-lg focus-within:shadow-xl hover:ring-gray-300 focus-within:ring-primary-500  focus-within:-translate-y-0.5 duration-200 ease-out rounded-lg bg-white ">
        <input
          autoComplete="off"
          className={clsx(
            " focus:ring-primary rounded-lg focus:ring-1 text-gray-900   bg-white disabled:opacity-60 disabled:bg-opacity-20 outline-none w-full p-3",
            {
              "!ring-red-500 ring-1": error !== "",
            },
            className
          )}
          type={type}
          ref={ref}
          {...props}
        />
      </div>
      {error !== "" && <div className="mt-1 text-red-600">{error}</div>}
    </label>
  );
});
