import {
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Command,
	CommandEmpty,
	CommandInput,
	CommandList,
	CommandItem,
	CommandGroup,
	Checkbox,
} from "@/components/ui";
import { ComboboxOption, ComboboxProps, ComboboxValue, MultiComboboxProps } from "@/types/combobox";
import { useState, isValidElement, cloneElement, FC, Fragment, useMemo } from "react";
import { cn, isObject, toggleValueInArray } from "@/lib/utils";
import { FullOption, toFlatOptionArray } from "react-querybuilder";
import { useComboboxHandler } from "@/hooks/useComboboxHandler";

const MultiCombobox: FC<MultiComboboxProps> = ({
	placeholder,
	value,
	options,
	isValueArray,
	onChange,
	labelKey = "label",
	valueKey = "value",
	...props
}) => {
	const [open, setOpen] = useState<boolean>(false);

	const { valueArray, selectedAll, comboboxOnChange } = useComboboxHandler({
		value,
		isValueArray,
		handleOnChange: onChange,
		valueKey,
		options: toFlatOptionArray(options as FullOption[]),
	});

	const isActive = (val: ComboboxOption) => {
		return valueArray.find((v: any) => v === val[valueKey]) !== undefined;
	};

	const renderOption = (opt: ComboboxValue): JSX.Element | JSX.Element[] => {
		if (opt.parent && opt.options && opt.options.length > 0) {
			return (
				<div key={opt[labelKey]}>
					<div className="px-2">
						<span className="text-sm font-bold">{opt[labelKey]}</span>
					</div>
					{opt.options.map((opt: ComboboxValue) => renderOption(opt))}
				</div>
			);
		}

		return (
			<CommandItem
				key={opt.value}
				value={opt.value}
				onSelect={comboboxOnChange}
				className={cn("gap-2", "[&>.checkbox-wrapper]:hover:ring")}
			>
				<Checkbox checked={isActive(opt)} />
				<span className="text-foreground">{opt[labelKey]}</span>
			</CommandItem>
		);
	};

	const renderValue = () => {
		return valueArray.map((val: any) => (isObject(val) ? val[labelKey] : val)).join(", ");
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="max-w-[300px] justify-start flex-grow-1 flex-shrink-0 w-min-content bg-input max-h-input"
				>
					<span className="overflow-hidden w-full text-ellipsis">
						{renderValue()}
						{!value && placeholder}
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" align="start">
				<Command
					className={cn("p-3")}
					filter={(value, search) => {
						if (value.includes(search) || value.includes("donotfilter-")) return 1; // ensures items arent filtered
						return 0;
					}}
				>
					<CommandInput placeholder="Search" />
					<CommandList>
						<CommandGroup>
							<CommandItem
								key={"all"}
								value={"donotfilter-all"}
								onSelect={comboboxOnChange}
								className={cn("gap-2", "[&>.checkbox-wrapper]:hover:ring")}
							>
								<Checkbox checked={selectedAll} showMinus />
								<span className="text-foreground">Select all</span>
							</CommandItem>
						</CommandGroup>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options &&
								options.length > 0 &&
								options.map((opt) => renderOption(opt))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

const Combobox: FC<ComboboxProps> = ({ placeholder, value, options, onChange, ...props }) => {
	const [open, setOpen] = useState<boolean>(false);

	const renderValue = (val: string) => {
		const option = options.find((opt) => opt.value === val) as ComboboxValue;

		return (
			<span key={option.value}>
				{option.icon && isValidElement(option.icon) && cloneElement(option.icon, {})}
				{option.label}
			</span>
		);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="w-[150px] justify-start">
					{(value && renderValue(value)) || placeholder}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" side="right" align="start">
				<Command>
					<CommandInput placeholder="Change status..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup className={cn("p-3")}>
							{options &&
								options.length > 0 &&
								options.map((opt) => (
									<CommandItem
										key={opt.value}
										value={opt.value}
										onSelect={onChange}
										className={cn("gap-2", "[&>.checkbox-wrapper]:hover:ring")}
									>
										<span className="text-foreground">{opt.label}</span>
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export { Combobox, MultiCombobox };
