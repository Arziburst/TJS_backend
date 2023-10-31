export type OrderedProduct = {
    readonly pid: string,
    readonly image: string,
    readonly price: number,
}

export interface OrderCore {
    readonly orderedProducts: Array<OrderedProduct>,
    readonly phone?: string,
    readonly total?: number,
    readonly uid?: string,
    readonly email?: string,
    readonly comment?: string,
    status?: number,
    statusPayment?: 'paid' | 'not paid',
    readonly created?: Date;
}

export interface Order extends OrderCore {
    readonly _id: string;
}

export type LiqPayStatusResponse = {
    result: string | 'ok';
    payment_id: number;
    action: string | 'pay';
    status: string | 'success';
    version: number;
    type: string;
    paytype: string;
    public_key: string;
    acq_id: number;
    order_id: string;
    liqpay_order_id: string;
    description: string;
    sender_card_mask2: string;
    sender_card_bank: string;
    sender_card_type: string;
    sender_card_country: number;
    ip: string;
    amount: number;
    currency: 'UAH',
    sender_commission: number;
    receiver_commission: number;
    agent_commission: number;
    amount_debit: number;
    amount_credit: number;
    commission_debit: number;
    commission_credit: number;
    currency_debit: 'UAH',
    currency_credit: 'UAH',
    sender_bonus: number;
    amount_bonus: number;
    mpi_eci: string; // String(number)
    is_3ds: boolean,
    language: 'en' | 'ru' | 'uk',
    create_date: number;
    end_date: number;
    transaction_id: number;
}
