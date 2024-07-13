"use client";

import { ClientOnly } from "./ClientOnly";
import { ShadCNQueryBuilder } from "@/components/shadcn-querybuilder";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ClientOnly>
				<ShadCNQueryBuilder />
			</ClientOnly>
		</main>
	);
}
