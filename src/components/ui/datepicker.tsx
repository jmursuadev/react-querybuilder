import React from "react";
import { DatepickerProps } from "@/types";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Label } from "./label";

const DatePicker: React.FC<DatepickerProps> = ({ className, placeholder, value, ...props }) => {
	const [input, setInput] = React.useState<string>("");

	return (
		<Popover>
			<PopoverTrigger>
				<Button
					variant="outline"
					size="sm"
					className={cn(
						"max-w-[300px] justify-start flex-grow-1 flex-shrink-0 w-min-content bg-input max-h-input",
						className
					)}
				>
					<span className="overflow-hidden w-full text-ellipsis">
						{value ?? placeholder}
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<div className="border-outline border-b p-4 flex items-center gap-2">
					<Label htmlFor="input-date">Start</Label>
					<Input
						id="input-date"
						type="text"
						value={input}
						onInput={props.onChange}
						className="p-[8px] text-base h-[38px] hover:ring-none focus:ring hover:border-primary hover:border-1"
					/>
				</div>
				<Calendar
					{...props}
					className="w-full"
					showOutsideDays={true}
					onDayClick={(day) => {
						props.onChange(day);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
};

export { DatePicker };
