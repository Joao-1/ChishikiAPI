import { Model, ModelCtor } from "sequelize";

export default (models: { [key: string]: ModelCtor<Model<any, any>> }) => {
	return Promise.all(
		Object.keys(models).map((key) => {
			return models[key].truncate({ cascade: true, where: {} });
		})
	);
};
