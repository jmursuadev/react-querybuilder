import { ShadCNFieldSelectorProps } from "@/types";
import { ShadCNFieldSelector } from "./shadcn-field-selector";
import { Button, ButtonProps } from "@ui";
import { PlusIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";
import { ActionWithRulesAndAddersProps, add, getOption, toArray } from "react-querybuilder";

const ShadCNAddRule = (props: ActionWithRulesAndAddersProps) => {
	const { schema, path } = props;
	const { dispatchQuery } = schema;

	const handleOnChange = (val: any) => {
		let rule = schema.createRule();
		rule.field = val;
		// get the default operator for the field
		const field = getOption(schema.fields, val);
		const operator = field && field.operators ? toArray(field.operators)[0] : null;

		// set the default operator
		if (operator) {
			rule.operator = operator.value ?? operator.name ?? "=";
		}

		const query = schema.getQuery();
		if (query) {
			dispatchQuery(add(query, rule, path));
		}
	};

	const selectorProps: ShadCNFieldSelectorProps = {
		...props,
		handleOnChange,
		options: schema.fields, // use schema fields as options when schema is provided
	};

	const TriggerElement = forwardRef<HTMLButtonElement, ButtonProps>((btnProps, ref) => {
		return (
			<Button variant="ghost" {...btnProps} ref={ref}>
				<PlusIcon /> Filter
			</Button>
		);
	});
	TriggerElement.displayName = "TriggerElement";

	return <ShadCNFieldSelector {...selectorProps} triggerElement={TriggerElement} />;
};

export { ShadCNAddRule };
