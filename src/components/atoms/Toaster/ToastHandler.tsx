import { createRoot } from "react-dom/client";
import { ToasterFunc, ToastOptions, ToastType } from "./types";
import Toaster from "./Toaster";

const createContainer = () => {
	let wrapper = document.querySelector("#toaster-wrapper");

	if (!wrapper) {
		wrapper = document.createElement("div");
		wrapper.id = "toaster-wrapper";
		const body = document.getElementsByTagName("body")[0];
		body.insertAdjacentElement("beforeend", wrapper);
	}

	const container = document.createElement("div");
	container.className = "toaster-container";

	wrapper.appendChild(container);

	return container;
};

const createToaster = (type: ToastType, options: ToastOptions) => {
	const container = createContainer();
	console.log("container", container);
	const root = createRoot(container);

	console.log("root", root);

	const {
		msg = "",
		desc = "",
		showClose = false,
		action = false,
		duration,
	} = options;

	root.render(
		<Toaster
			destroy={() => {
				console.log("destory called");
				root.unmount();
				container.remove();
				const wrapper = document.querySelector("#toaster-wrapper");
				if (wrapper !== null && wrapper.childNodes.length === 0) {
					const body = document.getElementsByTagName("body")[0];
					body.removeChild(wrapper);
				}
			}}
			type={type}
			msg={msg}
			desc={desc}
			showClose={showClose}
			action={action}
			duration={duration}
		/>
	);
};

export const toastSuccess: ToasterFunc = (options) => {
	console.log("called toastSuccess");
	createToaster("success", options);
};

export const toastError: ToasterFunc = (options) => {
	createToaster("error", options);
};
