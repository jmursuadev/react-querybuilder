import { cn } from "@/lib/utils";
import { useContext } from "react";
import {
	InlineCombinatorProps,
	standardClassnames,
	TestID,
	ValueSelectorProps,
} from "react-querybuilder";

/**
 * Default `inlineCombinator` component used by {@link QueryBuilder}. A small `<div>`
 * wrapper around the `combinatorSelector` component, used when either
 * `showCombinatorsBetweenRules` or `independentCombinators` are `true`.
 */
export const ShadCNInlineCombinator = (allProps: InlineCombinatorProps) => {
	const { component: CombinatorSelectorComponent, ...props } = allProps;

	if (props.level !== 0) return null;

	return (
		<div
			className={standardClassnames.betweenRules}
			data-testid={TestID.inlineCombinator}
			data-combinator={props.value}
		>
			<CombinatorSelectorComponent {...props} testID={TestID.combinators} />
		</div>
	);
};

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
