import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function isObject(obj: any) {
	return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

export { toOptions, toFullOptionMap } from "react-querybuilder";
export { cn, isObject };
