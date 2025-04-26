import { Location, useLocation } from "react-router-dom";

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
