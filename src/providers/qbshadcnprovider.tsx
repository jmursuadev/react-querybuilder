import { ShadCNValueEditor, ShadCNValueSelector } from "@/components";
import { TrashIcon } from "@/components/icons";
import { getCompatContextProvider } from "react-querybuilder";

export const shadcnControlElements = {
	valueEditor: ShadCNValueEditor,
	valueSelector: ShadCNValueSelector,
};

export const shadcnTranslations = {
	fields: {},
	removeRule: {
		label: <TrashIcon />,
	},
};

export const shadcnControlClassnames = {
	removeRule: "hover:bg-input rounded-md p-1",
};

export const QueryBuilderShadCNProvider = getCompatContextProvider({
	controlElements: shadcnControlElements,
	translations: shadcnTranslations,
	controlClassnames: shadcnControlClassnames,
});
