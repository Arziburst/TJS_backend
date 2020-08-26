export interface ImageCore {
    readonly imageUrl: string;
    readonly public_id: string;
}

export interface Image extends ImageCore {
    readonly _id: string;
}
