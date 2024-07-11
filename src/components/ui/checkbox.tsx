"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

type ExtractedCheckboxProps = { showMinus?: boolean };

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root> & ExtractedCheckboxProps,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & ExtractedCheckboxProps
>(({ className, showMinus, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			"flex items-center justify-center text-current",
			"checkbox-wrapper peer h-[18px] w-[18px] shrink-0 rounded-sm border border-border hover:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
			showMinus ? "data-[state=checked]:bg-white data-[state=checked]:text-foreground" : "",
			className
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn("flex items-center justify-center text-current")}
		>
			<CheckIcon className="w-[18px] h-[18px]" />
		</CheckboxPrimitive.Indicator>
		{showMinus !== undefined && props.checked !== true && (
			<MinusIcon className="w-[15px] h-[15px]" />
		)}
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
