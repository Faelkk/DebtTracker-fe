import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/app/utils/cn";



interface ButtonProps extends ComponentProps<"button"> {
    isLoading?: boolean;
    variant?: "danger" | "ghost";
}
const Button = ({
    variant,
    className,
    children,
    disabled,
    isLoading,
    type,
    ...props
}: ButtonProps) => {
    return (
        <button
        type={type}
            disabled={disabled || isLoading}
            {...props}
            className={cn(
                "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-300  cursor-pointer font-poppins flex items-center justify-center max-w-[25rem] disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl font-medium text-white transition-colors",
                variant === "danger" && "bg-red-800 hover:bg-red-900",
                variant === "ghost" &&
                    "bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/5",
                className
            )}
        >
            {!isLoading && children}
            {isLoading && <LoaderCircle className="w-6 h-6 animate-spin text-gray-50" />}
        </button>
    );
};

export default Button;