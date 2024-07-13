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
	update,
	useRule,
} from "react-querybuilder";

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
				onPropChange("combinator", value, parentPath);
			}
		},
		[disabled, onPropChange, parentPath]
	);

	return (
		<div className="flex gap-2">
			{!r.schema.independentCombinators &&
				r.schema.showCombinatorsBetweenRules &&
				r.path[1] !== 0 && (
					<ValueSelectorControlElement
						selectorContentClassName="[&_.select-item>span]:!lowercase"
						key={TestID.inlineCombinator}
						options={r.schema.combinators}
						value={parentGroup.combinator}
						title={r.translations.combinators.title}
						className={cn(standardClassnames.combinators, "!lowercase")}
						handleOnChange={handleCombinatorChange}
						rules={parentGroup.rules}
						level={parentPath.length}
						context={r.context}
						validation={validationResult}
						// component={ValueSelectorControlElement}
						path={r.path}
						disabled={r.disabled}
						schema={r.schema}
					/>
				)}

			<RuleControlElement {...r} />
		</div>
	);
});
ShadCNRule.displayName = "ShadCNRule";
