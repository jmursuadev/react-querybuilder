import { cn } from "@/lib/utils";
import { ValueSelectorProps } from "react-querybuilder";

export const ShadCNCombinatorSelector = (allProps: ValueSelectorProps) => {
	const {
		schema: {
			controls: { valueSelector: ValueSelectorControlElement },
		},
		level,
		className,
		value,
	} = allProps;

	// render only the top level combinator selector for group
	if (level !== 0) {
		return null;
	}

	return <ValueSelectorControlElement {...allProps} className={cn(className, value)} />;
};
