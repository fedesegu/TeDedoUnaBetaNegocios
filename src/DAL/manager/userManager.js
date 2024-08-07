import {usersModel} from "../../models/user.model.js";

class UsersManager {
    async findAll() {
        const response = await usersModel.find();
        return response; 
    }
    async findById(id) {
        const response = await usersModel.findById(id);
        return response;
    }
    async createOne(obj) {
        const response = await usersModel.create(obj);
        return response;
    }
    async updateOne(id, obj) {
        const result = await usersModel.updateOne({ _id: id }, obj);
        return result;
    }
}

export const usersManager = new UsersManager();