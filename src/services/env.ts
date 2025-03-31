const env = {
	FIREBASE: {
		API_KEY: import.meta.env.VITE_API_KEY,
		AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
		PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
		STORAGE_BUCKET: import.meta.env.VITE_STORAGE_BUCKET,
		MESSAGIN_SENDER_ID: import.meta.env.VITE_MESSAGIN_SENDER_ID,
		APP_ID: import.meta.env.VITE_APP_ID,
		MEASUREMENT_ID: import.meta.env.VITE_MEASUREMENT_ID,
	},
};

export default env;
