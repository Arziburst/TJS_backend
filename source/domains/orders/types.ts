export type OrderedProduct = {
    readonly pid: string,
    readonly image: string,
    readonly price: number,
}

export interface OrderCore {
    readonly orderedProducts: Array<OrderedProduct>,
    readonly phone: string,
    readonly total?: number,
    readonly uid?: string,
    readonly email?: string,
    readonly comment?: string,
    status?: number,
    readonly created?: Date;
};

export interface Order extends OrderCore {
    readonly _id: string;
}