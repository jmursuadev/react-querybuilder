export interface TableField {
	label: string;
	name: string;
	className?: string;
	props?: any;
}

export interface TableProps {
	fields: TableField[];
	data: any[];
	className?: string;
	classNameWrapper?: string;
}
