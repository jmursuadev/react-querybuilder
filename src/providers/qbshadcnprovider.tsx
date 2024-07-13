import { ShadCNValueEditor, ShadCNValueSelector, ShadCNFieldSelector, ShadCNAddRule } from "@/components";
import { TrashIcon } from "@/components/icons";
import { createContext, useState } from "react";
import { add, FullField, getCompatContextProvider } from "react-querybuilder";

const NullComponent = () => null;

export const shadcnControlElements = {
	valueEditor: ShadCNValueEditor,
	valueSelector: ShadCNValueSelector,
	fieldSelector: ShadCNFieldSelector,
	addRuleAction: ShadCNAddRule,
	addGroupAction: NullComponent,
};

export const shadcnTranslations = {
	fields: {},
	removeRule: {
		label: <TrashIcon />,
	}
};

export const shadcnControlClassnames = {
	removeRule: "hover:bg-input rounded-md p-1",
	ruleGroup: "!bg-white !border-outline !rounded-lg !pb-3",
	header: "order-2",
	body: "order-1",
	rule: "[&.queryBuilder-invalid>.rule-value]:!border-destructive [&.queryBuilder-invalid>.rule-value]:placeholder:!text-destructive",
};

const QueryBuilderBaseProvider = getCompatContextProvider({
	controlElements: shadcnControlElements,
	translations: shadcnTranslations,
	controlClassnames: shadcnControlClassnames,
});

interface QueryBuilderShadCNContextType {
	recentField: FullField | null;
	setRecentField: (field: FullField | null) => void;
}

const QueryBuilderShadCNContext = createContext<QueryBuilderShadCNContextType>({});

const QueryBuilderShadCNProvider = ({ children }: { children: JSX.Element }) => {
	const [recentField, setRecentField] = useState<FullField | null>(null);

	return (
		<QueryBuilderShadCNContext.Provider value={{ recentField, setRecentField }}>
			<QueryBuilderBaseProvider>{children}</QueryBuilderBaseProvider>
		</QueryBuilderShadCNContext.Provider>
	);
};

export { QueryBuilderShadCNProvider, QueryBuilderShadCNContext };