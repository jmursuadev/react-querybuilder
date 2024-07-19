import { QueryBuilderShadCNContext } from "@/contexts/qb-shadcn-context";
import { useContext } from "react";

/*
 * This hook is used to get the context of the QueryBuilderShadCNContext
 */
const useShadCN = () => {
	const context = useContext(QueryBuilderShadCNContext);

	if (!context) {
		throw new Error("useShadCN must be used within a QueryBuilderShadCN");
	}

	return context;
};

export { useShadCN };
