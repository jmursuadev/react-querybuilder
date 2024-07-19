import type { ShadCNDayPickerContextType } from "@/types";
import { createContext, ReactNode, useState } from "react";
import { useDayPicker } from "react-day-picker";

const ShadCNDayPickerContext = createContext<ShadCNDayPickerContextType | undefined>(undefined);

/*
 * Create a new context provider that wraps the DayPickerContext and NavigationContext
 * This provider will allow us to set the number of months to display in the calendar
 * that will be used in the DayPicker component to display the infinite scroll calendar
 */
const ShadCNDayPickerProvider = ({ children }: { children: ReactNode }) => {
	const daypickerContext = useDayPicker();

	const [numberOfMonths, setNumberOfMonths] = useState<number>(daypickerContext.numberOfMonths);

	const dpContext = {
		...daypickerContext,
		numberOfMonths,
		setNumberOfMonths,
	};

	return (
		<ShadCNDayPickerContext.Provider value={dpContext}>
			{children}
		</ShadCNDayPickerContext.Provider>
	);
};

export { ShadCNDayPickerProvider, ShadCNDayPickerContext };
