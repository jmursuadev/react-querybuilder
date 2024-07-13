import { QueryBuilderShadCNProvider } from "@/providers/qbshadcnprovider";
import { SetStateAction, useEffect, useState } from "react";
import QueryBuilder, { generateID, RuleGroupType } from "react-querybuilder";
import { QueryBuilderDnD } from "@react-querybuilder/dnd";
import fields from "@/data/fields";
import "react-querybuilder/dist/query-builder-layout.scss";

export const ShadCNQueryBuilder = () => {
	const [query, setQuery] = useState<RuleGroupType>();

	useEffect(() => {
		console.log("Query changed", query);
	}, [query]);

	const defaultQuery: RuleGroupType = {
		combinator: "and",
		id: generateID(),
		not: false,
		rules: [
			{
				combinator: "and",
				id: generateID(),
				not: false,
				rules: [],
			},
		],
	};

	return (
		<QueryBuilderDnD>
			<QueryBuilderShadCNProvider>
				<QueryBuilder
					defaultQuery={defaultQuery}
					showCombinatorsBetweenRules
					onQueryChange={setQuery}
					fields={fields()}
				/>
			</QueryBuilderShadCNProvider>
		</QueryBuilderDnD>
	);
};
