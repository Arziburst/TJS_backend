/* eslint-disable no-extra-parens */
// Core
import { Request, Response } from 'express';
import dg from 'debug';

// Helpers
import { paginate } from '../../../helpers';

// Instruments
import { Products } from '../controller';

// Types
import { Pagination, Product } from '../types';

const debug = dg('router:products-pagination');

export const getAllByPagination = async (
    req: Request<any, any, any, Pagination>,
    res: Response,
) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const type = req.params.type;
        const query = req.query;

        const foundData = await Products.findByType(type === 'see-all' ? null : type);

        const sortProductsByPrice = ({
            array,
            isLowToHigh,
        }: {
            array: Product[]
            isLowToHigh: string
        }): Product[] => {
            if (array) {
                if (isLowToHigh === 'true') {
                    return array.slice().sort((a, b) => a.price - b.price);
                } else if (isLowToHigh === 'false') {
                    return array.slice().sort((a, b) => b.price - a.price);
                }
            }

            return array;
        };

        const sortedData = sortProductsByPrice({
            array:       foundData,
            isLowToHigh: query.isLowToHigh,
        });

        const data = paginate(sortedData, query.limit, query.page);

        const totalShowed = query.page * query.limit;

        const getTotalShowed = totalShowed <= foundData.length ? totalShowed : foundData.length;

        res.status(200).json({ data: {
            data,
            total:       foundData.length,
            totalShowed: getTotalShowed,
        } });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
