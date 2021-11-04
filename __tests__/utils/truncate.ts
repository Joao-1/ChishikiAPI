import { Model, ModelCtor } from 'sequelize';

export default (models: { [key: string]: ModelCtor<Model<any, any>> }) => {
    return Promise.all(
        Object.keys(models).map((key) => {
            console.log(key)
            return models[key].destroy({ where: {}, truncate: true });
        })
    );
};
