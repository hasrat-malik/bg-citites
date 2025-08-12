import { Joi } from 'celebrate';

export const citySchema = {
    search: {
        query: {
            country: Joi.string().required(),
            page: Joi.number().positive(),
            limit: Joi.number().positive()
        }
    }
}