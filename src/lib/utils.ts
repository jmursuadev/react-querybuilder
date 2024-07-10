import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function isObject(obj: any) {
	return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

function toggleObjectInArray(array: any[], object: any) {
	if (!object) return array;

	const valueKey = object.hasOwnProperty("value") ? "value" : "name";

	const index = array.findIndex((item) => item[valueKey] === object[valueKey]); // Using isEqual for deep comparison
	if (index === -1) {
		array.push(object); // Object not found, so push it
	} else {
		array.splice(index, 1); // Object found, so remove it
	}

	return array;
}

function toFullOption(obj: any) {
	if (isObject(obj)) {
		let newObj = { ...obj };
		if (newObj.hasOwnProperty("options")) {
			newObj.parent = true;
			newObj.options = toFullOptionList(newObj.options);
		}

		newObj.value = obj.value ?? obj.name;
		return newObj;
	}

	return {
		name: obj,
		value: obj,
	};
}

function toFullOptionList(options: any[]) {
	return options.map((opt) => toFullOption(opt));
}

export { toOptions, toFullOptionMap } from "react-querybuilder";
export { cn, isObject, toggleObjectInArray, toFullOptionList, toFullOption };
