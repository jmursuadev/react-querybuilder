import { DayPickerContextValue } from "react-day-picker";
import { FullField, QueryBuilderContextProviderProps, RuleGroupTypeIC } from "react-querybuilder";

export interface QueryBuilderShadCNContextType {
	recentField?: FullField | null;
	setRecentField?: (field: FullField | null) => void;
}

export type QueryBuilderShadCNProps = QueryBuilderContextProviderProps & {
	recentField?: FullField | null;
	setRecentField?: (field: FullField | null) => void;
};

export interface ShadCNDayPickerContextType extends DayPickerContextValue {
	numberOfMonths: number;
	setNumberOfMonths: (n: number) => void;
}

export interface QueryBuilderQueryContextType {
	query: RuleGroupTypeIC;
	setQuery: (query: RuleGroupTypeIC) => void;
}