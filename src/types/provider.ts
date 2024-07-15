import { FullField, QueryBuilderContextProviderProps } from "react-querybuilder";

export interface QueryBuilderShadCNContextType {
	recentField?: FullField | null;
	setRecentField?: (field: FullField | null) => void;
}

export type QueryBuilderShadCNProps = QueryBuilderContextProviderProps & {
	recentField?: FullField | null;
	setRecentField?: (field: FullField | null) => void;
};
