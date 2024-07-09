"use client";

import QueryBuilder, { RuleGroup } from "react-querybuilder";
import { ClientOnly } from "./ClientOnly";
import "react-querybuilder/dist/query-builder.css";
import { Card, CardContent } from "@/components/ui/card";
import { ShadCNQueryBuilder } from "@/components/ui/shadcn-querybuilder";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ClientOnly>
				<ShadCNQueryBuilder />
			</ClientOnly>
		</main>
	);
}
