import React, { cloneElement, createRef, memo, use, useEffect, useMemo, useRef } from "react";
import { DatepickerProps } from "@/types";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Label } from "./label";
import { addDays, addMonths, format, isValid, startOfWeek, subMonths } from "date-fns";
import {
	CaptionProps,
	DayPickerProvider,
	DayPickerProps,
	NavigationProvider,
	useInput,
	useNavigation,
} from "react-day-picker";
import { debounce, first, set } from "lodash";
import { ShadCNDayPickerProvider } from "@/contexts/daypicker/shadcn-daypicker-context";
import { useDayPicker } from "@/hooks/useDayPicker";
import InfiniteScroll from "react-infinite-scroll-component";

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
	const [open, setOpen] = React.useState<boolean>(false);
	const daypickerRef = createRef<HTMLDivElement>();
	const nav = useNavigation();
	const { numberOfMonths, setNumberOfMonths, ...daypicker } = useDayPicker();

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
		return () => debounceHandleInputChange.cancel();
	}, [debounceHandleInputChange]);

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
				className="w-full p-0 overflow-hidden"
				align="start"
				onInteractOutside={() => setOpen(false)}
				asChild
			>
				<div>
					<div
						className="popover-header border-outline border-b px-4 pt-3 pb-0 flex flex-col gap-1 relative bg-white"
						style={{ zIndex: 1 }}
					>
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
					<Calendar
						{...daypicker}
						mode="default"
						selected={selected}
						onDayClick={onDayClick}
						onMonthChange={onMonthChange}
						className={cn(daypicker.className, "[&>.months]:!flex-col-reverse !p-3")}
						showOutsideDays={daypicker.showOutsideDays}
						weekStartsOn={daypicker.weekStartsOn}
						classNames={{
							head_cell: daypicker.classNames.head_cell,
						}}
						numberOfMonths={numberOfMonths}
						components={daypicker.components}
						month={month}
						reverseMonths={true}
					/>
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

const Months = ({ children }: { children: React.ReactNode }) => {
	const { numberOfMonths, setNumberOfMonths } = useDayPicker();
	const { goToMonth, currentMonth } = useNavigation();

	return (
		<div
			id="calendar-months"
			className={cn(
				"months flex flex-col sm:flex-col sm:mt-4 sm:space-y-0 [&>div:last-child]:sm:!mb-0 flex-col-reverse overflow-auto max-h-[300px]"
			)}
		>
			<InfiniteScroll
				className="flex flex-col-reverse h-auto"
				style={{
					display: "flex",
					flexDirection: "column-reverse",
				}}
				dataLength={children && Array.isArray(children) ? children.length : 0}
				hasMore={true}
				next={() => {
					setNumberOfMonths(numberOfMonths + 2);
					goToMonth(subMonths(currentMonth, 2));
				}}
				loader={<span className="hidden">Loadding...</span>}
				onScroll={(e) => {
					const target = e.target as HTMLElement;

					if (target.scrollTop === 0) {
						goToMonth(addMonths(currentMonth, 1));
						target.scrollTop = -252;
					}
				}}
				scrollableTarget="calendar-months"
				inverse={true}
			>
				{children}
			</InfiniteScroll>
		</div>
	);
};

const customComponents = {
	Caption: CustomCaption,
	Months,
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
				<ShadCNDayPickerProvider>
					<BaseDatePicker {...props} />
				</ShadCNDayPickerProvider>
			</NavigationProvider>
		</DayPickerProvider>
	);
};

export { DatePicker };
