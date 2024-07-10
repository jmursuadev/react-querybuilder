import { ReactElement, JSXElementConstructor } from "react";

export interface ComboboxOption {
	value: string;
	label: string;
	parent?: boolean;
	options?: ComboboxOption[];
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
}

export interface ComboboxProps extends ComboboxBaseProps {
	value: ComboboxValue | null;
	onChange: (value: ComboboxValue | null) => void;
}

export interface MultiComboboxProps extends ComboboxBaseProps {
	value: ComboboxValue[] | null;
	onChange: (value: ComboboxValue[]) => void;
}
