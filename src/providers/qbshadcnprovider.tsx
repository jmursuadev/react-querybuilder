import { ShadCNValueEditor } from "@/components/ui/shadcn-value-editor";
import { getCompatContextProvider } from "react-querybuilder";

export const shadcnControlElements = {
	valueEditor: ShadCNValueEditor,
};

export const shadcnTranslations = {
	fields: {
		placeholderLabel: "Value...",
	},
};

export const QueryBuilderShadCNProvider = getCompatContextProvider({
	controlElements: shadcnControlElements,
	translations: shadcnTranslations,
});
