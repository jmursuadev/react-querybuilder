import {
	getFirstOption,
	standardClassnames,
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
		listsAsArrays,
		selectorComponent: SelectorComponent = allProps.schema.controls.valueSelector,
		...props
	} = allProps;

	console.log("allProps", allProps);

	const { valueAsArray, multiValueHandler } = useValueEditor({
		handleOnChange,
		inputType,
		operator,
		value,
		type,
		values,
		listsAsArrays,
	});

	if (operator === "null" || operator === "notNull") {
		return null;
	}

	const inputTypeCoerced = ["in", "notIn"].includes(operator) ? "text" : inputType || "text";
	const placeHolderText = fieldData?.placeholder ?? "Value...";

	if (
		(operator === "between" || operator === "notBetween") &&
		(type === "select" || type === "text")
	) {
		const editors = ["from", "to"].map((key, i) => {
			if (type === "text") {
				return (
					<Input
						data-testid={testID}
						key={key}
						type={inputTypeCoerced}
						value={valueAsArray[i] ?? ""}
						title={title}
						className={standardClassnames.valueListItem}
						disabled={disabled}
						placeholder={placeHolderText}
						onChange={(e) => multiValueHandler(e.target.value, i)}
					/>
				);
			}

			return (
				<SelectorComponent
					{...props}
					data-testid={testID}
					key={key}
					className={standardClassnames.valueListItem}
					handleOnChange={(v: any) => multiValueHandler(v, i)}
					disabled={disabled}
					value={valueAsArray[i] ?? getFirstOption(values)}
					options={values}
					listsAsArrays={listsAsArrays}
				/>
			);
		});

		return (
			<span data-testid={testID} className={className} title={title}>
				{editors[0]}
				{separator}
				{editors[1]}
			</span>
		);
	}

	switch (type) {
		case "multiselect":
			return (
				<MultiCombobox
					data-testid={testID}
					placeholder="Select..."
					onChange={handleOnChange}
					options={toFullOptionList(values) as ComboboxOption[]}
					value={value}
					isValueArray={listsAsArrays}
				/>
			);
		case "select":
			return (
				<SelectorComponent
					{...props}
					data-testid={testID}
					className={standardClassnames.valueListItem}
					disabled={disabled}
					value={value ?? getFirstOption(values)}
					options={values}
					handleOnChange={handleOnChange}
				/>
			);
	}

	return (
		<Input
			data-testid={testID}
			type={inputTypeCoerced}
			value={value}
			title={title}
			disabled={disabled}
			placeholder={placeHolderText}
			onChange={(e) => handleOnChange(e.target.value)}
		/>
	);
};
