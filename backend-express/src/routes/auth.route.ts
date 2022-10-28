import { Router } from 'express';
import { loginUser, logoutUser, refreshUserToken } from '../controllers/auth.controller';
import validateDto from '../middlewares/validateDto.middleware';
import { loginUserAjvValidate, refreshTokenAjvValidate, logoutUserSchemaValidate } from '../schemas/auth.schema';

const authRoute = Router();

/*
@route 			POST /api/v1/auth/login (login user)
@description 	authenticate user.
@access 		Public
*/
authRoute.post('/auth/login', validateDto(loginUserAjvValidate), loginUser);

/*
@route 			POST /api/v1/auth/login (logout user)
@description 	logout user
@access 		Public
*/
authRoute.post('/auth/logout', validateDto(logoutUserSchemaValidate), logoutUser);

/*
@route 			POST /api/v1/auth/refresh (refresh token)
@description 	refresh user token
@access 		Public
*/
authRoute.post('/auth/refresh', validateDto(refreshTokenAjvValidate), refreshUserToken);

export default authRoute;
