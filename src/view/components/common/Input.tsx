

import { CircleAlert } from "lucide-react";
import {  forwardRef } from "react";
import type {ComponentProps} from "react";
import { cn } from "@/app/utils/cn";


interface InputProps extends ComponentProps<"input"> {
    name: string;
    error?: string;
    label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ name, id, placeholder, className, error,label, ...props }, ref) => {
        const inputId = id ?? name;

        return (
            <div className="relative">
                <input
                    ref={ref}
                    name={name}
                    id={id}
                    {...props}
                    placeholder={placeholder}
                            className={cn(
                        "bg-gray-100 rounded-lg border border-gray-500 px-3 h-[3.25rem] text-gray-800 w-full pt-4 max-w-[25rem]    focus:border-gray-800 transition-all outline-none",
                        error && "border-red-900 focus:border-red-900",
                        className
                    )}
                />
                <label
                    htmlFor={inputId}
                    className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
                >
                    {label}
                </label>

                {error && (
                    <div className="flex gap-2 items-center mt-2 text-red-900">
                        <CircleAlert />
                        <span className=" text-xs">{error}</span>
                    </div>
                )}
            </div>
        );
    }
);

export default Input;