import * as UserRepo from '../repositories/user.js';
import { errorResp, successResp } from '../utils/response.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_ACCESS_TOKEN = 'kelas.com';
const SECRET_REFRESH_TOKEN = 'backend';

export const createUser = async (request, response, next) => {
    try {
        let name = request.body.name; 
        let email = request.body.email;
        let password = request.body.password;
        let saltRound = 10;

        bcrypt.hash(password, saltRound, async (err, hash) => {

            const [result] = await UserRepo.createData(name, email, hash);
            successResp(response, "success menambahkan data", {user_id: result.insertId}, 201);
        })

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

export const authUser = async (request, response, next) => {
    try {
        let email = request.body.email;
        let password = request.body.password;
        const [result] = await UserRepo.getDataByEmail(email);

        if (result.length > 0) {
            const user = result[0];
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    let claims = {
                        id: user.user_id, 
                        name: user.name, 
                        email: user.email
                    };
                    let accessToken = jwt.sign(claims, SECRET_ACCESS_TOKEN, {expiresIn:'15m'});
                    let refreshToken = jwt.sign(claims, SECRET_REFRESH_TOKEN, {expiresIn: '30m'})
                    let data = {
                        access_token: accessToken, 
                        refresh_token: refreshToken,
                    }

                    successResp(response, "success login", data);
                } else {
                    errorResp(response, "invalid email or password",401)
                }
            })
        } else {
            errorResp(response, "invalid email or password",401)
        }
    } catch (error) {
        next(error)
    }
}

export const validateToken = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (accessToken == null) {
        errorResp(response, "invalid request, authorization not found!")
    }
    jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error, claims) => {
        if (error) {
            errorResp(response, error.message, 403)
        } else {
            request.claims = claims;
            console.log(claims)
            next()
        }
    })
}