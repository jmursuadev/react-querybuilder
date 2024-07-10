import { QueryBuilderShadCNProvider } from "@/providers/qbshadcnprovider";
import { SetStateAction, useEffect, useState } from "react";
import QueryBuilder, { RuleGroupType, RuleGroupTypeAny, usePrevious } from "react-querybuilder";

export const ShadCNQueryBuilder = () => {
	const [query, setQuery] = useState<RuleGroupType>();

	useEffect(() => {
		console.log("Query changed", query);
	}, [query]);

	return (
		<QueryBuilderShadCNProvider>
			<QueryBuilder showCombinatorsBetweenRules onQueryChange={setQuery} />
		</QueryBuilderShadCNProvider>
	);
};
