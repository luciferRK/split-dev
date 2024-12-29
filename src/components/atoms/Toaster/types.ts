export type ToasterFunc = (options: ToastOptions) => void;
export type ToastType = "info" | "success" | "error" | "warning" | "dark";

export interface ToastOptions {
	msg: string;
	desc?: string;
	action?: { title: string; onClick: Function } | boolean;
	showClose?: boolean;
	duration?: number;
}

export interface ToasterProps extends ToastOptions {
	type: ToastType;
	destroy?: () => void;
}
