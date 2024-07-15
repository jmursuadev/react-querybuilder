import { toFullOptionList, useValueSelector, ValueSelectorProps } from "react-querybuilder";
import { Select } from "@/components";

type Val = string[];

export const ShadCNValueSelector = (
	allProps: ValueSelectorProps & { selectorContentClassName?: string }
) => {
	const { options, testID, title, className, selectorContentClassName, value } = allProps;
	const { onChange, val } = useValueSelector(allProps);

	// Seperate the props from the allProps object
	const selectProps = {
		onValueChange: onChange,
		value: val as string,
		options: toFullOptionList(options),
		id: testID,
		title: title,
		className,
		selectorContentClassName,
	};

	// es-lint-disable-next-line @typescript-eslint/no-explicit-any
	return <Select {...selectProps} />;
};
