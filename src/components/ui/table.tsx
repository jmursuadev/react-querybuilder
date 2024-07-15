import * as React from "react";

import { cn } from "@/lib/utils";
import { TableField, TableProps } from "@/types";

const Table = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement> & { classNameWrapper?: string }
>(({ className, classNameWrapper, ...props }, ref) => (
	<div className={cn("relative w-full overflow-auto", classNameWrapper)}>
		<table
			ref={ref}
			className={cn(
				"w-full caption-bottom text-sm border-separate border-spacing-0 rounded-t-sm",
				className
			)}
			{...props}
		/>
	</div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead
		ref={ref}
		className={cn(
			"[&_tr_th]:border-y [&_tr_th]:border-outline [&_tr_th:first-child]:border-l [&_tr_th:last-child]:border-r",
			"[&_tr_th]:bg-input [&_tr_th:first-child]:rounded-tl-md [&_tr_th:last-child]:rounded-tr-md",
			className
		)}
		{...props}
	/>
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn(
			"[&_tr_td]:border-b [&_tr_td]:border-outline [&_tr_td:first-child]:border-l [&_tr_td:last-child]:border-r",
			"[&_tr:last-child_td:first-child]:rounded-bl-md [&_tr:last-child_td:last-child]:rounded-br-md",
			className
		)}
		{...props}
	/>
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tfoot
		ref={ref}
		className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
		{...props}
	/>
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
	({ className, ...props }, ref) => (
		<tr
			ref={ref}
			className={cn(
				"border-b transition-colors hover:bg-input data-[state=selected]:bg-muted",
				className
			)}
			{...props}
		/>
	)
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn(
			"px-[22px] py-[5px] text-left align-middle font-medium text-foreground-gray font-[600] [&:has([role=checkbox])]:pr-0",
			className
		)}
		{...props}
	/>
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn(
			"px-[22px] py-[5px] align-middle [&:has([role=checkbox])]:pr-0 text-[#626266] font-normal",
			className
		)}
		{...props}
	/>
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

const DynamicTable = React.forwardRef<
	React.ElementRef<typeof Table> & TableProps,
	React.ComponentPropsWithoutRef<typeof Table> & TableProps
>(({ fields, data, className, ...props }, ref) => {
	return (
		<Table {...props} ref={ref}>
			<TableHeader>
				<TableRow>
					{fields.map((field: TableField) => (
						<TableHead key={field.name} {...field.props}>
							{field.label}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((row, index) => (
					<TableRow key={index}>
						{fields.map((field, index) => (
							<TableCell key={index}>{row[field.name]}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
});
DynamicTable.displayName = "DynamicTable";

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
	DynamicTable,
};
