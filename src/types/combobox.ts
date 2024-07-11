import { ReactElement, JSXElementConstructor } from "react";

export interface ComboboxOption {
	value?: string;
	label: string;
	parent?: boolean; // used for grouping
	options?: ComboboxOption[];
	[key: string]: any;
}

export interface ComboboxValue extends ComboboxOption {
	icon?: ReactElement<any, string | JSXElementConstructor<any>>;
}

/**
 * Dont use this type directly, use ComboboxProps or MultiComboboxProps instead
 */
export interface ComboboxBaseProps {
	id?: string;
	options: ComboboxOption[];
	placeholder?: string;
	value: any;
	labelKey?: string;
	valueKey?: string;
}

export interface ComboboxProps extends ComboboxBaseProps {
	onChange: (value: any) => void;
}

export interface MultiComboboxProps extends ComboboxBaseProps {
	onChange: (value: any) => void;
	isValueArray?: boolean;
}
