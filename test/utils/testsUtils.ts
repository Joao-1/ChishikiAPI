import { PrismaClient } from "@prisma/client";

const truncateDb = (client: PrismaClient) => {
	const propertyNames = Object.getOwnPropertyNames(client);
	const modelNames = propertyNames.filter((propertyName) => !propertyName.startsWith("_"));

	return Promise.all(modelNames.map((model) => client[model].deleteMany()));
};

export default truncateDb;
