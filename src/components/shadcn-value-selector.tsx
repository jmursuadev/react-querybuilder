import {
	useSelectElementChangeHandler,
	useValueSelector,
	ValueSelectorProps,
} from "react-querybuilder";
import { Select } from "@/components/ui/select";
import { toFullOption, toFullOptionList, toFullOptionMap } from "@/lib/utils";

type Val = string[];

export const ShadCNValueSelector = (allProps: ValueSelectorProps) => {
	const { options, testID, title } = allProps;
	const { onChange, val } = useValueSelector(allProps);

	// Seperate the props from the allProps object
	const selectProps = {
		onValueChange: onChange,
		value: val as string,
		options: toFullOptionList(options),
		id: testID,
		title: title,
	};

	// es-lint-disable-next-line @typescript-eslint/no-explicit-any
	return <Select {...selectProps} />;
};
