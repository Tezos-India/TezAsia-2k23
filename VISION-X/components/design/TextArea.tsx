import clsx from 'clsx';
import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from 'react';

interface Props
    extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    label?: string;
    className?: string;
    error?: string;
    id?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(function Input(
    { label, error, className = '', ...props },
    ref
) {
    return (
        <label className="w-full  ">
            {label && (
                <div className="mb-2 text-gray-500 font-medium ">{label}</div>
            )}
            <div className="flex items-center  ">
                <textarea
                    className={clsx(
                        'ring-1 ring-gray-300 hover:ring-gray-300 hover:shadow-lg focus:shadow-xl focus:-translate-y-0.5 duration-300 ease-out  focus:ring-primary-500 rounded-xl disabled:opacity-60 disabled:bg-opacity-20 outline-none w-full p-4',
                        {
                            '!ring-red-500 ring-1': error,
                        },
                        className
                    )}
                    id={props.id}
                    ref={ref}
                    {...props}
                />
            </div>
            {error !== "" && <div className="mt-1 text-red-600">{error}</div>}
        </label>
    );
});