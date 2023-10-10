export const paginate = (array: Array<any>, limit: number, page: number): any[] => {
    const pageLocal = Number(page) === 0 ? 1 : page;

    const result = array.slice((pageLocal - 1) * limit, pageLocal * limit);

    return result;
};
