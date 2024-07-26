"use client";

import { DynamicTable } from "@ui/table";
import { ClientOnly } from "./ClientOnly";
import { ShadCNQueryBuilder } from "@components/shadcn-querybuilder";
import { TableField } from "@/types";

// create fields with following format Name, Email, Distinct ID, Updated at, Country Code, Region, City
const fields = [
	{ label: "Name", name: "name" },
	{ label: "Email", name: "email" },
	{ label: "Distinct ID", name: "distinct_id" },
	{ label: "Updated at", name: "updated_at" },
	{ label: "Country Code", name: "country_code" },
	{ label: "Region", name: "region" },
	{ label: "City", name: "city" },
] satisfies TableField[];

// generate dummy data for table with 10 rows
const sampleData = Array.from({ length: 10 }, (_, i) => ({
	name: `Name ${i}`,
	email: `Email ${i}`,
	distinct_id: `Distinct ID ${i}`,
	updated_at: `Updated at ${i}`,
	country_code: `Country Code ${i}`,
	region: `Region ${i}`,
	city: `City ${i}`,
}));

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col gap-10 items-center p-24">
			<ClientOnly>
				<ShadCNQueryBuilder />
			</ClientOnly>
			<DynamicTable classNameWrapper="max-h-[600px]" fields={fields} data={sampleData} />

		</main>
	);
}
