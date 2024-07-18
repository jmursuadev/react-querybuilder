import { cn } from "@/lib/utils";
import { memo, useCallback } from "react";
import {
	defaultControlElements,
	findPath,
	getParentPath,
	RuleGroupType,
	RuleGroupTypeAny,
	RuleProps,
	standardClassnames,
	TestID,
	useRule,
} from "react-querybuilder";

/*
 * This component is used to overwrite the rule component {@link Rule} with the combinator
 * @param {RuleProps} r - The rule props
 */
export const ShadCNRule = memo((r: RuleProps) => {
	// get the default control elements
	const { rule: RuleControlElement, inlineCombinator: InlineCombinatorControlElement } =
		defaultControlElements;

	const {
		actions: { onPropChange },
		disabled,
		schema: {
			controls: { valueSelector: ValueSelectorControlElement },
		},
	} = r;

	// get the validation result
	const { validationResult } = useRule(r);

	const parentPath = getParentPath(r.path);
	const query = r.schema.getQuery();
	const parentGroup = findPath(parentPath, query as RuleGroupTypeAny) as RuleGroupType;

	// create a function to handle the combinator change
	const handleCombinatorChange = useCallback(
		(value: any) => {
			if (!disabled) {
				onPropChange("combinator", value, [r.path[0], r.path[1] - 1]);
			}
		},
		[disabled, onPropChange, r.path]
	);

	return (
		<div className="flex gap-2 items-center">
			{r.schema.independentCombinators &&
				r.schema.showCombinatorsBetweenRules &&
				r.path[1] !== 0 && (
					<ValueSelectorControlElement
						selectorContentClassName="[&_.select-item>span]:!lowercase"
						key={TestID.inlineCombinator}
						options={r.schema.combinators}
						value={parentGroup.rules[r.path[1] - 1]}
						title={r.translations.combinators.title}
						className={cn(
							standardClassnames.combinators,
							"!lowercase",
							"!bg-transparent border-0 hover:!ring-0 hover:!bg-primary-rgb-light data-[state=open]:!bg-primary-rgb-light data-[state=open]:!text-primary"
						)}
						handleOnChange={handleCombinatorChange}
						rules={parentGroup.rules}
						level={parentPath.length}
						context={r.context}
						validation={validationResult}
						path={r.path}
						disabled={r.disabled}
						schema={r.schema}
					/>
				)}
			{/*
			 * Append this element to the first rule component
			 */}
			{r.schema.independentCombinators &&
				r.schema.showCombinatorsBetweenRules &&
				r.path[1] === 0 && <span className="text-sm">where</span>}

			<RuleControlElement {...r} />
		</div>
	);
});
ShadCNRule.displayName = "ShadCNRule";
