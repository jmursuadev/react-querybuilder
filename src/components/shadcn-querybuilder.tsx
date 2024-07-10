import { QueryBuilderShadCNProvider } from "@/providers/qbshadcnprovider";
import { SetStateAction, useEffect, useState } from "react";
import QueryBuilder, { QueryBuilderProps, RuleGroupType } from "react-querybuilder";
import fields from "@/data/fields";

export const ShadCNQueryBuilder = () => {
	const [query, setQuery] = useState<RuleGroupType>();

	useEffect(() => {
		console.log("Query changed", query);
	}, [query]);

	return (
		<QueryBuilderShadCNProvider>
			<QueryBuilder showCombinatorsBetweenRules onQueryChange={setQuery} fields={fields()} />
		</QueryBuilderShadCNProvider>
	);
};
