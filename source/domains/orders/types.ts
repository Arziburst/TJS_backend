export type OrderedProduct = {
    readonly pid: string,
    readonly title: string,
    readonly available?: boolean,
    readonly image: string,
    readonly price: number,
}

export interface OrderCore {
    readonly orderedProducts: Array<OrderedProduct>,
    readonly firstName?: string,
    readonly lastName?: string,
    readonly phone?: string,
    readonly city?: string,
    readonly warehouse?: string,
    readonly total?: number,
    readonly uid?: string,
    readonly email?: string,
    readonly comment?: string,
    status?: number,
    readonly created?: Date;
}

export interface Order extends OrderCore {
    readonly _id: string;
}
