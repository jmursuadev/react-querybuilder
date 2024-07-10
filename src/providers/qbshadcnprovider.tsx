import { ShadCNValueEditor, ShadCNValueSelector } from "@/components";
import { getCompatContextProvider } from "react-querybuilder";

export const shadcnControlElements = {
	valueEditor: ShadCNValueEditor,
	valueSelector: ShadCNValueSelector,
};

export const shadcnTranslations = {
	fields: {},
};

export const QueryBuilderShadCNProvider = getCompatContextProvider({
	controlElements: shadcnControlElements,
	translations: shadcnTranslations,
});
