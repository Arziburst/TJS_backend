import { Users as UsersModel } from '../models';

export class Users {
    constructor(data) {
        this.models = {
            users: new UsersModel(data),
        };
    }
    
    async register() {
        const data = await this.models.users.register();

        return data;
    }

    async find() {
        const data = await this.models.users.find();

        return data;
    }

    async findOne() {
        const data = await this.models.users.findOne();

        return data;
    }

    async findById() {
        const data = await this.models.users.findById();

        return data;
    }

    async findOneAndUpdate() {
        const data = await this.models.users.findOneAndUpdate();

        return data;
    }

    async findOneAndRemove() {
        const data = await this.models.users.findOneAndRemove();

        return data;
    }

    async login() {
        const data = await this.models.users.login();

        return data;
    }

    async getRole() {
        const data = await this.models.users.getRole();

        return data;
    }
}
