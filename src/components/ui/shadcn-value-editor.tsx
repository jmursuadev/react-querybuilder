import { useValueEditor, ValueEditorProps } from "react-querybuilder";
import { Input } from "@/components/ui/input";

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
