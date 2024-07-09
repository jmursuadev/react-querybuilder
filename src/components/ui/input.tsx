import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-10 w-full max-h-[30px] max-w-[100px] rounded-[6px] border border-input bg-input p-3 text-sm text-foreground placeholder:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
          "hover:border-input-placeholder",
          "focus:placeholder:text-input-placeholder",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
