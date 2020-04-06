export interface UserCore {
    name: string;
    phone: string;
    email: string;
    password?: string;
    readonly role?: string;
    readonly created?: Date;
};

export interface User extends UserCore {
    readonly _id: string;
}