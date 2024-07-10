import {
	useValueEditor,
	ValueEditorProps,
} from "react-querybuilder";
import { Input, Combobox, MultiCombobox } from "@/components/ui";
import { ComboboxOption, ComboboxValue } from "@/types/combobox";
import { toFullOptionList } from "@/lib/utils";

export const ShadCNValueEditor = (allProps: ValueEditorProps) => {
	const {
		fieldData,
		operator,
		value,
		handleOnChange,
		title,
		className,
		type,
		inputType,
		values = [],
		separator,
		testID,
		disabled,
		selectorComponent: SelectorComponent = allProps.schema.controls.valueSelector,
		...props
	} = allProps;

	const { valueAsArray, multiValueHandler } = useValueEditor({
		handleOnChange,
		inputType,
		operator,
		value,
		type,
		values,
	});

	if (operator === "null" || operator === "notNull") {
		return null;
	}

	const inputTypeCoerced = inputType || "text";
	const placeHolderText = fieldData?.placeholder ?? "Value...";

	switch (type) {
		case "multiselect":
			return (
				<MultiCombobox
					onChange={(e) => {
						console.log(e, "VAL");
						handleOnChange(e);
					}}
					options={toFullOptionList(values) as ComboboxOption[]}
					value={valueAsArray as ComboboxValue[]}
				/>
			);
			break;
	}

	return (
		<Input
			type={inputTypeCoerced}
			value={value}
			title={title}
			disabled={disabled}
			placeholder={placeHolderText}
			onChange={(e) => handleOnChange(e.target.value)}
		/>
	);
};
