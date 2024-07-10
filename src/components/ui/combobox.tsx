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
import { ComboboxProps, ComboboxValue, MultiComboboxProps } from "@/types/combobox";
import { useState, isValidElement, cloneElement, FC, Fragment } from "react";
import { cn, isObject, toggleObjectInArray, toOptions } from "@/lib/utils";
import { FullOption, toFlatOptionArray } from "react-querybuilder";

const MultiCombobox: FC<MultiComboboxProps> = ({
	placeholder,
	value,
	options,
	onChange,
	...props
}) => {
	const [open, setOpen] = useState<boolean>(false);

	const renderOption = (opt: ComboboxValue): JSX.Element | JSX.Element[] => {
		if (opt.options && opt.options.length > 0) {
			return (
				<div key={opt.label}>
					<div>
						<span>{opt.label}</span>
					</div>
					{opt.options.map((opt: ComboboxValue) => renderOption(opt))}
				</div>
			);
		}
		return (
			<CommandItem
				key={opt.value}
				value={opt.value}
				onSelect={(val: string) => {
					const _value = toFlatOptionArray(options as FullOption[]).find(
						(_opt) => _opt.value === val
					);
					console.log("VAL", val, _value);
					handleOnChange(_value ?? null);
				}}
				className={cn("gap-2", "[&>.checkbox-wrapper]:hover:ring")}
			>
				<Checkbox
					checked={
						!!value &&
						Array.isArray(value) &&
						!!value.find((_val) => _val.value === opt.value)
					}
				/>
				<span className="text-foreground">{opt.label}</span>
			</CommandItem>
		);
	};

	const handleOnChange = (val: ComboboxValue | null) => {
		onChange(toggleObjectInArray(value as any[], val));
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="max-w-[300px] justify-start flex-grow-1 flex-shrink-0 w-min-content"
				>
					<span className="overflow-hidden w-full text-ellipsis">{value && value.length > 0 ? value.map((v) => v.value ?? v).join(", ") : placeholder}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" side="right" align="start">
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup className={cn("p-3")}>
							<CommandItem
								key={"all"}
								value={"all"}
								onSelect={(val) => {
									handleOnChange({ value: "all", label: "Select all" });
								}}
								className={cn("gap-2", "[&>.checkbox-wrapper]:hover:ring")}
							>
								<Checkbox checked={false} showMinus />
								<span className="text-foreground">Select all</span>
							</CommandItem>

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

	const renderValue = (val: ComboboxValue) => {
		return (
			<span key={val.value}>
				{val.icon && isValidElement(val.icon) && cloneElement(val.icon, {})}
				{val.label}
			</span>
		);
	};

	const handleOnChange = (val: ComboboxValue | null) => {
		onChange(val);
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
										onSelect={(val: any) => {
											const _value = options.find(
												(_opt) => _opt.value === val
											);
											handleOnChange(_value ?? null);
										}}
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
