export interface ViewsCore {
    readonly ipAdress?: string;
    viewedProducts: Array<string>;
    readonly created?: Date;
    modified?: string;
}

export interface Views extends ViewsCore {
    readonly _id: string;
}
