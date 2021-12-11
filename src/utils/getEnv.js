module.exports = () => {
	let env;
	switch (process.env.NODE_ENV.trim()) {
		case "dev":
			env = ".env.dev";
			break;
		case "test":
			env = ".env.test";
			break;
		case "production":
			env = ".env";
			break;
		default:
			env = ".env.dev";
	}
	return env;
};
