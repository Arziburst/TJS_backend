export const discountHandler = (price: number, discount: number): number => {
    const discountResult = price * (discount / 100);

    return Math.round(price - discountResult);
};
