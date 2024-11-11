import jwt from 'jsonwebtoken';
import {UserDto} from "../dto/UserDto";
import {ApiError} from "../error/ApiError";
import fs from "fs";
import path from "path";

export default function (role) {
    return function (req, res, next) {
        let user: UserDto;
        try {
            const token = req.headers.authorization.split(' ')[1];
            const publicKey = fs.readFileSync(path.resolve(__dirname, '..', '..', 'publicAccess.pem'), 'utf8');
            user = <UserDto>jwt.verify(token, publicKey);

        } catch {
            next(ApiError.unauthorized('Пользователь не авторизован'));
        }

        if (user!.role != role) {
            next(ApiError.forbidden('Нет доступа'));
        }
        next();
    }
}
