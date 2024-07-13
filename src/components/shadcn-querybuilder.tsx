import { QueryBuilderShadCNProvider } from "@/providers/qbshadcnprovider";
import { SetStateAction, useEffect, useState } from "react";
import QueryBuilder, { RuleGroupType } from "react-querybuilder";
import { QueryBuilderDnD } from "@react-querybuilder/dnd";
import fields from "@/data/fields";
import "react-querybuilder/dist/query-builder-layout.scss";

export const ShadCNQueryBuilder = () => {
	const [query, setQuery] = useState<RuleGroupType>();

	useEffect(() => {
		console.log("Query changed", query);
	}, [query]);

	return (
		<QueryBuilderDnD>
			<QueryBuilderShadCNProvider>
				<QueryBuilder
					showCombinatorsBetweenRules
					onQueryChange={setQuery}
					fields={fields()}
				/>
			</QueryBuilderShadCNProvider>
		</QueryBuilderDnD>
	);
};
