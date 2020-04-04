// Core
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Instruments
import { usersModel, IUsersModel } from './schema';
import { UserCore, User } from './types';

class UsersController {
    private readonly odm: Model<IUsersModel>;

    constructor() {
        this.odm = usersModel;
    }

    async register(body: UserCore): Promise<User> {
        const { password } = body;

        if (!password) {
            throw new Error('Password are not exist in register body');
        }

        const hashedPassword = await bcrypt.hash(password, 11);

        const user = {
            ...body,
            password: hashedPassword,
        };

        const data = await this.odm.create(user);

        return data;
    }

    // TODO TYPE credentials
    async login(credentials: { email: string, password: string }): Promise<string> {
        const { email, password } = credentials;

        const user: User | null = await this.odm.findOne({ email })
            .select('password')
            .lean();

        if (!user) {
            throw new Error('Credentials are not valid');
        }

        const { _id, password: userPassword } = user;

        if (!userPassword) {
            throw new Error('Password are not exist');
        }

        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            throw new Error('Credentials are not valid');
        }

        return _id;
    }

    async find(): Promise<User[]> {
        const data = await this.odm.find()
            .select('-password')
            .lean();

        return data;
    }

    async findById(_id: string): Promise<User | null> {
        const data = await this.odm.findById({ _id })
            .select('-password -_id -created')
            .lean();

        return data;
    }

    async findOneAndUpdate(_id: string, body: UserCore): Promise<User | null> {
        const data = await this.odm.findOneAndUpdate({ _id }, body, { new: true })
            .select('-password -_id -created')
            .lean();

        return data;
    }

    async findOneAndRemove(_id: string): Promise<boolean> {
        await this.odm.findOneAndRemove({ _id });

        return true;
    }

    async getRole(_id: string): Promise<string | undefined> {
        const user = await this.findById(_id);

        if (!user) {
            throw new Error('User not found');
        }

        return user.role;
    }
}

export const Users = new UsersController();