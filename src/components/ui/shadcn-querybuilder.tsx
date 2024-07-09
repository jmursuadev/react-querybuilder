import { QueryBuilderShadCNProvider } from "@/providers/qbshadcnprovider";
import { SetStateAction, useState } from "react";
import QueryBuilder, { RuleGroupType, RuleGroupTypeAny } from "react-querybuilder";

export const ShadCNQueryBuilder = () => {
	const [query, setQuery] = useState<RuleGroupType>();

	return (
		<QueryBuilderShadCNProvider>
			<QueryBuilder showCombinatorsBetweenRules query={query} onQueryChange={setQuery} />
		</QueryBuilderShadCNProvider>
	);
};
