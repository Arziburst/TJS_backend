// Core
import bcrypt from 'bcryptjs';

// ODM
import { users } from '../odm';

export class Users {
    constructor(data) {
        this.data = data;
    }

    async register() {
        const { password } = this.data;
        const hashedPassword = await bcrypt.hash(password, 11);

        const user = {
            ...this.data,
            password: hashedPassword,
        };

        const data = await users.create(user);

        return data;
    }

    async find() {
        const data = await users.find()
            .select('-_id -__v -__t -password -created -modified -hash')
            .lean();

        return data;
    }

    async findOne() {
        const hash = this.data;
        const data = await users.findOne({ hash })
            .select('-_id -__v -__t -password -created -modified -hash')
            .lean();

        return data;
    }

    async findById() {
        const data = await users.findById(this.data, { _id: true })
            .lean();

        return data;
    }

    async findOneAndUpdate() {
        const { hash, body } = this.data;

        const data = await users.findOneAndUpdate({ hash }, body, { new: true })
            .select('-_id -__v -__t -password -created -modified -hash')
            .lean();

        return data;
    }

    async findOneAndRemove() {
        const hash = this.data;
        await users.findOneAndRemove({ hash });

        return true;
    }

    async login() {
        const { email, password } = this.data;

        const user = await users
            .findOne({ email })
            .select('password hash')
            .lean();

        if (!user) {
            throw new Error('Credentials are not valid');
        }

        const { hash, password: userPassword } = user;

        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            throw new Error('Credentials are not valid');
        }

        return hash;
    }

    async getRole() {
        const { hash } = this.data;

        const user = await users
            .findOne({ hash })
            .select('role -_id')
            .lean();

        if (!user) {
            throw new Error('User not found');
        }

        return user.role;
    }
}
