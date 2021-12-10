import { Includeable } from "sequelize/types";
import { FindAndCountAllConfig, IQueryParamsRead, IWhereClause } from "../types/types";

export default (querys: IQueryParamsRead) => {
	const whereClause: IWhereClause = {};
	const includeModels: Includeable[] = [];

	const filtersConfig: { [key: string]: any } = {
		status: () => {
			whereClause.status = querys.status;
		},
		include: () => {
			includeModels.push(querys.include.toString());
		},
	};

	for (const requestFilters in querys) {
		if (Object.prototype.hasOwnProperty.call(querys, requestFilters)) {
			filtersConfig[requestFilters]();
		}
	}

	const options: FindAndCountAllConfig = {
		offset: querys.offset || 1,
		limit: querys.limit || 100,
		where: whereClause,
		include: includeModels,
	};

	return options;
};
