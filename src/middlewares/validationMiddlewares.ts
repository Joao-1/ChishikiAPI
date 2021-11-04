import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export default (validationType: 'body' | 'params' | 'query', schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {

        let validation = req[validationType];

        const { error } = schema.validate(validation, { abortEarly: false });
        if (error) {
            return res.status(422).json({
                status: 'failed',
                error: {
                    details: error.details.map(el => { return {
                        message: el.message,
                    }})
                },
            });
        }
        next();
    };
};