import {NextFunction, Request, Response} from "express";
import {ApiError} from "../error/ApiError";
import {UserDto} from "../dto/UserDto";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export default function (req: Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers;
    const textError: string = 'Пользователь не авторизован';
    if (!authorization) {
        next(ApiError.unauthorized(textError));
    }

    const tokenData: string[] = authorization!.split(' ');
    if (!(tokenData[0] === 'Bearer') || !tokenData[1]) {
        next(ApiError.unauthorized(textError));
    }

    let user: UserDto;
    try {
        const publicKey = fs.readFileSync(path.resolve(__dirname, '..', '..', 'publicAccess.pem'), 'utf8');
        user = <UserDto>jwt.verify(tokenData[1], publicKey);
        req['user'] = user;
    } catch (error) {
        next(ApiError.unauthorized(textError));
    }
    next();
}
