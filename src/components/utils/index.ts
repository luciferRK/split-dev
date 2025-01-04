import { Location, useLocation } from "react-router-dom";

export const isNullOrUndefined = (item: any) => {
	if (item === null || typeof item === "undefined") {
		return true;
	}
	return false;
};

export const isEmpty = (item: any) => {
	if (isNullOrUndefined(item)) {
		return true;
	}
	const type = item.constructor.name as string;
	switch (type) {
		case "Number":
			return isNaN(item);
		case "String":
			return item === "";
		case "Array":
			return item.length === 0;
		case "Object":
			return Object.keys(item).length === 0;
		default:
			return false;
	}
};

const hasOwn = {}.hasOwnProperty;

function parseValue(arg: any) {
	if (typeof arg === "string") {
		return arg;
	}

	if (typeof arg !== "object") {
		return "";
	}

	if (Array.isArray(arg)) {
		return classNames(arg);
	}

	if (
		arg.toString !== Object.prototype.toString &&
		!arg.toString.toString().includes("[native code]")
	) {
		return arg.toString();
	}

	let classes = "";

	for (const key in arg) {
		if (hasOwn.call(arg, key) && arg[key]) {
			classes = appendClass(classes, key);
		}
	}

	return classes;
}

function appendClass(value: any, newClass: any) {
	if (!newClass) {
		return value;
	}

	return value ? value + " " + newClass : newClass;
}

export default function classNames(...args: any[]) {
	let classes = "";
	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg) {
			classes = appendClass(classes, parseValue(arg));
		}
	}
	return classes;
}

export const ifElse = (
	condition: boolean | Boolean,
	ifValue: any,
	elseValue: any
) => (condition ? ifValue : elseValue);

export const or = (value1: any, value2: any) => value1 || value2;

export const and = (value1: any, value2: any) => value1 && value2;

export const useUrlParams = (location: Location = useLocation()): any => {
	const queryParams = new URLSearchParams(location.search);
	return Array.from(queryParams.entries()).reduce(
		(prev, curr) => ({
			...prev,
			[curr[0]]: curr[1],
		}),
		{}
	);
};

export const getProperty = (
	obj: { [key: string]: any } | any = {},
	property: string[] = [],
	defaultValue: any = undefined
) => {
	if (isEmpty(obj)) {
		return defaultValue;
	}
	let info: any = obj;
	for (const prop of property) {
		if (isEmpty(info)) {
			return defaultValue;
		} else {
			info = info[prop];
		}
	}
	if (isEmpty(info)) {
		return defaultValue;
	}
	return info;
};

export const handleError = (error: any) => {
	if (error.constructor.name === "String" && !error.includes("CUS:ERR"))
		if (window.location.host.includes("localhost")) {
			console.log("ERR:", error);
			// window.open(`https://www.google.com/search?q=${error.toString()}`);
		} else {
			console.error("ERR:", error);
		}
};

export const sortObject = (obj: any, key: string | undefined = undefined) => {
	if (key) {
		return Object.entries(obj)
			.sort((a: any, b: any) => b[1][key] - a[1][key])
			.reduce((sortedObj: any, entry: any) => {
				sortedObj[entry[0]] = entry[1];
				return sortedObj;
			}, {});
	} else {
		return Object.keys(obj)
			.sort()
			.reduce((prev: any, curr) => {
				prev[curr] = obj[curr];
				return prev;
			}, {});
	}
};
