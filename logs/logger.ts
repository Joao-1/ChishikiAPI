import winston, { createLogger, format } from "winston";

const { combine, timestamp, prettyPrint, json, printf } = format;

const errorFormat = printf(({ message, ...data }) => {
	const _data = message as unknown as { msg: string; _error: string; label: string };
	return `{timestamp: ${data.timestamp}, message: ${_data.msg}, local: ${_data.label}, details: {${_data._error}}}`;
});

const debug = createLogger({
	levels: {
		debug: 3,
	},
	transports: [
		new winston.transports.File({ filename: "./logs/debug.log", level: "debug" }),
		new winston.transports.Console({ level: "debug" }),
	],
});

const info = createLogger({
	levels: {
		info: 2,
	},
	format: combine(
		timestamp(),
		prettyPrint(),
		printf(({ message }) => {
			return message;
		})
	),
	transports: [new winston.transports.Console()],
});

const warn = createLogger({
	levels: {
		warn: 1,
	},
	transports: [
		new winston.transports.File({ filename: "./logs/warn.log", level: "warn" }),
		new winston.transports.Console({ level: "warn" }),
	],
});

const error = createLogger({
	levels: {
		error: 0,
	},
	format: combine(timestamp(), prettyPrint(), json(), errorFormat),
	transports: [
		new winston.transports.File({ filename: "./logs/error.log", level: "error" }),
		new winston.transports.Console({ level: "error" }),
	],
});

export default {
	debug(debugValue: unknown) {
		debug.debug(debugValue);
	},
	info(msg: string) {
		info.info(msg);
	},
	warn(msg: string) {
		warn.warn(msg);
	},
	error(msg: string, _error: string, label: string) {
		error.error({ msg, _error, label });
	},
};