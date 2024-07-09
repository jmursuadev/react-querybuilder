import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-10 w-full rounded-[6px] border border-input bg-input p-3 text-sm text-input-placeholder placeholder:text-input-placeholder disabled:cursor-not-allowed disabled:opacity-50",
          "hover:border-input-placeholder",
          "max-h-[30px]",
          "max-w-[100px]",
          "text-foreground",
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
