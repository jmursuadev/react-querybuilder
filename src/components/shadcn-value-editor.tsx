import {
	getFirstOption,
	standardClassnames,
	useValueEditor,
	ValueEditorProps,
} from "react-querybuilder";
import {
	Input,
	MultiCombobox,
	Checkbox,
	RadioGroup,
	RadioGroupItem,
	Label,
	Switch,
	DatePicker,
} from "./ui";
import { ComboboxOption } from "@/types/combobox";
import { cn, toFullOptionList } from "@/lib/utils";

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

	if (inputTypeCoerced === "date") {
		return (
			<DatePicker
				value={value}
				handleOnChange={handleOnChange}
				placeholder="Select a Date..."
			/>
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
					className={className}
				/>
			);
		case "select":
			return (
				<SelectorComponent
					{...props}
					data-testid={testID}
					className={className}
					disabled={disabled}
					value={value ?? getFirstOption(values)}
					options={values}
					handleOnChange={handleOnChange}
				/>
			);
		case "checkbox":
			return <Checkbox checked={value} onCheckedChange={handleOnChange} />;
		case "radio":
			return (
				<RadioGroup
					value={value}
					data-testid={testID}
					className={cn("flex", className)}
					title={title}
					orientation="horizontal"
					onValueChange={handleOnChange}
				>
					{toFullOptionList(values).map((v) => (
						<div className="flex items-center space-x-2" key={v.value}>
							<RadioGroupItem value={v.value} id={v.name} />
							<Label htmlFor={v.name}>{v.label}</Label>
						</div>
					))}
				</RadioGroup>
			);
		case "switch":
			return (
				<Switch
					checked={value}
					onCheckedChange={handleOnChange}
					data-testid={testID}
					className={cn("flex", className)}
					title={title}
				/>
			);
	}

	return (
		<Input
			className={className}
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
