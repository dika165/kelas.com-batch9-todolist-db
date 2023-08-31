import * as UserRepo from '../repositories/user.js';
import { successResp } from '../utils/response.js';

export const createUser = async (request, response, next) => {
    try {
        let name = request.body.name; 
        let email = request.body.email;
        let password = request.body.password;

        const [result] = await UserRepo.createData(name, email, password);

        successResp(response, "success menambahkan data", {user_id: result.insertId}, 201);

    } catch (error) {
        next(error)
    }
    
}

export const getUser = async (request, response, next) => {
    try {
        const [result] = await UserRepo.getData(100);
        successResp(response, "success", result)
    } catch (error) {
        next(error);
    }
}

export const getUerById = async (request, response, next) => {
    try {
        let id = request.params.id;
        const [result] = await UserRepo.getDataById(id);

        successResp(response, "success", result[0])
    } catch(error) {
        next(error)
    }
}