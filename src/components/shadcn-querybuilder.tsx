import { QueryBuilderShadCN } from "@/providers/qbshadcnprovider";
import { useEffect, useState } from "react";
import QueryBuilder, { add, generateID, RuleGroupTypeIC } from "react-querybuilder";
import { QueryBuilderDnD } from "@react-querybuilder/dnd";
import * as ReactDnD from "react-dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import fields from "@/data/fields";
import { Button } from "@/components";
import { PlusIcon } from "@radix-ui/react-icons";
import "react-querybuilder/dist/query-builder.scss";

// default value for group query
const defaultGroupQuery = (): RuleGroupTypeIC => {
	return {
		id: generateID(),
		rules: [],
	};
};

const initialQuery: RuleGroupTypeIC = {
	id: generateID(),
	rules: [defaultGroupQuery()],
};

const ShadCNQueryBuilder = () => {
	const [query, setQuery] = useState<RuleGroupTypeIC>(initialQuery);

	useEffect(() => {
		console.log("Query changed", query);
	}, [query]);

	const handleAddGroup = () => {
		setQuery(add(query, defaultGroupQuery(), []));
	};

	const handleClearQuery = () => {
		setQuery(initialQuery);
	};

	return (
		<QueryBuilderShadCN>
			<QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
				<div className="w-full">
					<QueryBuilder
						query={query}
						onQueryChange={setQuery}
						showCombinatorsBetweenRules
						fields={fields()}
					/>
					<div className="flex justify-between">
						<div>
							<Button variant="ghost" onClick={handleAddGroup}>
								<PlusIcon /> Group
							</Button>
						</div>
						<div className="flex gap-3">
							<Button variant="ghost" onClick={handleClearQuery}>
								Clear all
							</Button>
							<Button>Save as</Button>
						</div>
					</div>
				</div>
			</QueryBuilderDnD>
		</QueryBuilderShadCN>
	);
};

export { ShadCNQueryBuilder };
