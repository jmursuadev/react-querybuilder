import { toFullOptionList, useValueSelector, ValueSelectorProps } from "react-querybuilder";
import { Select } from "@/components/ui/select";

type Val = string[];

export const ShadCNValueSelector = (allProps: ValueSelectorProps) => {
	const { options, testID, title, className } = allProps;
	const { onChange, val } = useValueSelector(allProps);

	// Seperate the props from the allProps object
	const selectProps = {
		onValueChange: onChange,
		value: val as string,
		options: toFullOptionList(options),
		id: testID,
		title: title,
		className,
	};

	// es-lint-disable-next-line @typescript-eslint/no-explicit-any
	return <Select {...selectProps} />;
};
