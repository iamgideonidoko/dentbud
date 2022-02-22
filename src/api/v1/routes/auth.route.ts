import { Router } from 'express';
import { loginUser, refreshUserToken } from '../controllers/auth.controller';
import validateDto from '../middlewares/validateDto.middleware';
import { loginUserAjvValidate, refreshTokenAjvValidate } from '../schemas/auth.schema';

const authRoute = Router();

/*
@route 			POST /api/v1/auth/login (login user)
@description 	authenticate the user.
@access 		Public
*/
authRoute.post('/auth/login', validateDto(loginUserAjvValidate), loginUser);

/*
@route 			POST /api/v1/auth/refresh (refresh token)
@description 	authenticate the user.
@access 		Public
*/
authRoute.post('/auth/refresh', validateDto(refreshTokenAjvValidate), refreshUserToken);

export default authRoute;
