import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export { toOptions, toFullOption, toFullOptionList, toFullOptionMap } from "react-querybuilder";
