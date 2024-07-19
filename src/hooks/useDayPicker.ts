import { useContext } from "react";
import { ShadCNDayPickerContext } from "@/contexts/daypicker/shadcn-daypicker-context";

export const useDayPicker = () => {
	const context = useContext(ShadCNDayPickerContext);

	if (!context) {
		throw new Error("useDaypicker must be used within a DaypickerProvider");
	}

	return context;
};
