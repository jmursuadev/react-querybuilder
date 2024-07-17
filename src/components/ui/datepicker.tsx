import React, { useEffect, useMemo } from "react";
import { DatepickerProps } from "@/types";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Label } from "./label";
import { addDays, format, isValid, startOfWeek, subMonths } from "date-fns";
import {
	CaptionProps,
	useDayPicker,
	DayPickerProvider,
	DayPickerProps,
	NavigationProvider,
	useInput,
} from "react-day-picker";
import { debounce, last, set } from "lodash";

const weekLabels = Array.from({ length: 7 }, (_, i) => {
	return format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i), "EEEEEE");
});

const BaseDatePicker: React.FC<DatepickerProps> = ({
	className,
	placeholder = "Select date",
	value,
	handleOnChange,
	...props
}) => {
	const daypicker = useDayPicker();
	const [open, setOpen] = React.useState<boolean>(false);
	const [numberOfMonths, setNumberOfMonths] = React.useState<number>(daypicker.numberOfMonths);

	const {
		dayPickerProps: { month, onDayClick, onMonthChange, selected },
		inputProps: {
			onChange: inputOnChange,
			onFocus,
			value: inputValue,
			placeholder: inputPlaceholder,
		},
		reset,
		setSelected,
	} = useInput({ format: "LLL dd, y" });

	const debounceHandleInputChange = useMemo(
		() =>
			debounce((e: React.ChangeEvent<HTMLInputElement>) => {
				const val = e.target.value;
				const parseDate = new Date(Date.parse(val));

				if (isValid(parseDate)) {
					setSelected(parseDate);
				}
			}, 1000),
		[setSelected]
	);

	useEffect(() => {
		let lastScrollTop = 0;

		function handleScroll(e: Event) {
			const target = e.target as HTMLElement;
			const clientHeight = target.clientHeight;
			const threshold = target.scrollHeight - clientHeight;
			const currentScrollTop = target.scrollTop;

			if (target && month && threshold <= currentScrollTop + 50) {
				if (onMonthChange) {
					setNumberOfMonths(numberOfMonths + 2);
				}
			} else if (
				target &&
				month &&
				currentScrollTop < lastScrollTop &&
				currentScrollTop <= 20
			) {
				if (onMonthChange) {
					onMonthChange(subMonths(month, 1) as Date);
					setNumberOfMonths(numberOfMonths + 1);
					target.scrollTop = 270;
				}
			}

			lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
		}

		setTimeout(() => {
			document
				.getElementById("calendar")
				?.addEventListener("scroll", handleScroll, { passive: true });
		}, 500);

		return () => {
			document.getElementById("calendar")?.removeEventListener("scroll", handleScroll);

			debounceHandleInputChange.cancel();
		};
	}, [open, month, numberOfMonths, onMonthChange, debounceHandleInputChange]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (inputOnChange) {
			inputOnChange(e);
		}

		debounceHandleInputChange(e);
	};

	const handleApply = () => {
		handleOnChange(format(selected as Date, "yyyy-MM-dd"));
		setOpen(false);
	};

	return (
		<Popover open={open}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className={cn(
						"max-w-[300px] justify-start flex-grow-1 flex-shrink-0 w-min-content bg-input max-h-input",
						className
					)}
					onClick={() => setOpen(!open)}
				>
					<span className="overflow-hidden w-full text-ellipsis">
						{value && value != "" ? value : placeholder ?? inputPlaceholder}
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-full p-0"
				align="start"
				onInteractOutside={() => setOpen(false)}
				asChild
			>
				<div>
					<div className="popover-header border-outline border-b px-4 pt-3 pb-0 flex flex-col gap-1">
						<div className="flex items-center gap-2">
							<Label htmlFor="input-date">Start</Label>
							<Input
								id="input-date"
								type="text"
								value={inputValue}
								onChange={handleInputChange}
								className="p-[8px] text-base !h-[38px] hover:ring-none focus:ring focus:border-primary hover:border-primary outline-none"
							/>
						</div>

						<div className="flex p-6 pb-2 items-center w-full justify-between">
							{weekLabels.map((day: string) => (
								<div className="text-[#8f8f91] text-[12px]" key={day}>
									{day}
								</div>
							))}
						</div>
					</div>
					<div className="max-h-[300px] overflow-y-auto p-[10px]" id="calendar">
						<Calendar
							selected={selected}
							onDayClick={onDayClick}
							onMonthChange={onMonthChange}
							className={daypicker.className}
							showOutsideDays={daypicker.showOutsideDays}
							numberOfMonths={numberOfMonths}
							weekStartsOn={daypicker.weekStartsOn}
							classNames={{
								head_cell: daypicker.classNames.head_cell,
							}}
							components={daypicker.components}
							month={month}
						/>
					</div>
					<div className="popover-footer flex justify-end gap-2 p-2 border border-t border-outline">
						<Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button size="sm" className="" onClick={handleApply}>
							Apply
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

const CustomCaption = ({ displayMonth }: CaptionProps) => {
	return (
		<h2 className="!font-normal position-relative mt-3">{format(displayMonth, "MMM yyy")}</h2>
	);
};

const customComponents = {
	Caption: CustomCaption,
};

const daypickerProps = {
	className: "w-full !p-0 !m-0",
	showOutsideDays: false,
	numberOfMonths: 12,
	weekStartsOn: 1,
	classNames: {
		head_cell: "hidden",
	},
	components: customComponents,
} satisfies DayPickerProps;

const DatePicker = (props: DatepickerProps) => {
	return (
		<DayPickerProvider initialProps={{ ...daypickerProps, onSelect: props.handleOnChange }}>
			<NavigationProvider>
				<BaseDatePicker {...props} />
			</NavigationProvider>
		</DayPickerProvider>
	);
};

export { DatePicker };
