import { toggleValueInArray } from "@/lib/utils";
import { use, useMemo } from "react";

export interface UseComboBoxHandlerProps {
	value: any;
	isValueArray?: boolean;
	handleOnChange: (value: any) => void;
	valueKey: string;
	options: any[];
}

export interface UseComboBoxHandlerReturn {
	valueArray: [];
	comboboxOnChange: (value: any) => void;
	flatOptions: any[];
	selectedAll: boolean;
}

export const useComboboxHandler = (props: UseComboBoxHandlerProps): UseComboBoxHandlerReturn => {
	const { value, isValueArray, handleOnChange, valueKey, options } = props;

	// useMemo is used to memoize the valueArray
	const valueArray = useMemo(() => {
		return isValueArray ? value : !Array.isArray(value) ? value.split(",") : value;
	}, [value, isValueArray]);

	const selectedAll = useMemo(() => valueArray.length === options.length, [valueArray, options]);

	const comboboxOnChange = (val: any) => {
		let newValue = toggleValueInArray([...valueArray], val, valueKey);

		// If the value is "donotfilter-all", then select all the options
		if (val === "donotfilter-all" && !selectedAll) {
			newValue = options.map((option) => option[valueKey]);
		}

		// If the value is "donotfilter-all" and all the options are selected, then deselect all the options
		if (val === "donotfilter-all" && selectedAll) {
			newValue = [];
		}

		isValueArray ? handleOnChange(newValue) : handleOnChange(newValue.join(","));
	};

	return { valueArray, comboboxOnChange, flatOptions: options, selectedAll };
};
