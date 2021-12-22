import { Includeable } from "sequelize/types";
import { FindAndCountAllConfig, IQueryParamsRead, IWhereClause } from "../types/types";

export default (querys: IQueryParamsRead, associations: string[]) => {
	const whereClause: IWhereClause = {};
	let includeModels: Includeable[] = [];
	let offset = 0;
	let limit = 99;

	const filtersConfig: { [key: string]: any } = {
		offset: () => {
			offset = (querys.offset as number) - 1;
		},
		limit: () => {
			limit = querys.limit as number;
		},
		servers: () => {
			whereClause.id = querys.servers;
		},
		status: () => {
			whereClause.status = querys.status;
		},
		include: () => {
			includeModels = querys.include.filter((value) => {
				return associations.includes(value);
			});
		},
	};

	for (const requestFilters in querys) {
		if (Object.prototype.hasOwnProperty.call(querys, requestFilters)) {
			filtersConfig[requestFilters]();
		}
	}

	const options: FindAndCountAllConfig = {
		where: whereClause,
		offset,
		limit,
		include: includeModels,
	};

	return options;
};
