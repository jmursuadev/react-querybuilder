import {
	ShadCNValueEditor,
	ShadCNValueSelector,
	ShadCNFieldSelector,
	ShadCNDragHandle,
	ShadCNRuleGroup,
	ShadCNRule,
	ShadCNCombinatorSelector,
} from "@/components";
import { TrashIcon } from "@/components/icons";
import { createContext, useContext, useState } from "react";
import {
	ControlElementsProp,
	FullField,
	getCompatContextProvider,
	QueryBuilderContextProvider,
	Translations,
} from "react-querybuilder";
import { QueryBuilderShadCNContextType, QueryBuilderShadCNProps } from "@/types";

const NullComponent = () => null;

export const shadcnControlElements = {
	valueEditor: ShadCNValueEditor,
	valueSelector: ShadCNValueSelector,
	fieldSelector: ShadCNFieldSelector,
	dragHandle: ShadCNDragHandle,
	ruleGroup: ShadCNRuleGroup,
	rule: ShadCNRule,
	combinatorSelector: ShadCNCombinatorSelector,
	addRuleAction: NullComponent,
	shiftActions: NullComponent,
	notToggle: NullComponent,
	addGroupAction: NullComponent,
	removeGroupAction: NullComponent,
	cloneGroupAction: NullComponent,
	lockGroupAction: NullComponent,
} satisfies ControlElementsProp<FullField, string>;

export const shadcnTranslations = {
	fields: {},
	removeRule: {
		label: <TrashIcon />,
	},
} satisfies Partial<Translations>;

export const shadcnControlClassnames = {
	queryBuilder:
		"shadcn-query-builder [&>.ruleGroup]:border-0 [&>.ruleGroup]:p-0 w-full [&>.ruleGroup>.ruleGroup-body]:!p-0",
	removeRule: "hover:bg-input rounded-md p-1",
	ruleGroup: "shadcn-rule-group !bg-white !border-outline !rounded-lg !pb-3 p-0",
	rule: "shadcn-rule [&.queryBuilder-invalid>.rule-value]:!border-destructive [&.queryBuilder-invalid>.rule-value]:placeholder:!text-destructive",
	body: "shadcn-rule-group-body px-5 py-3",
};

const QueryBuilderBaseProvider = getCompatContextProvider({
	controlElements: shadcnControlElements,
	translations: shadcnTranslations,
	controlClassnames: shadcnControlClassnames,
});

const QueryBuilderShadCNContext = createContext<QueryBuilderShadCNContextType>({});

const QueryBuilderShadCN: QueryBuilderContextProvider = (props: QueryBuilderShadCNProps) => {
	const [recentField, setRecentField] = useState<FullField | null>(null);

	return (
		<QueryBuilderShadCNContext.Provider value={{ recentField, setRecentField }}>
			<QueryBuilderBaseProvider {...props} />
		</QueryBuilderShadCNContext.Provider>
	);
};

export { QueryBuilderShadCN, QueryBuilderShadCNContext };
