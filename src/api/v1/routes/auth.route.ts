import { Router } from 'express';
import { loginUser } from '../controllers/auth.controller';
import validateDto from '../middlewares/validateDto.middleware';
import { loginUserAjvValidate } from '../schemas/auth.schema';

const authRoute = Router();

/*
@route 			POST /api/v1/auth/login (login user)
@description 	authenticate the user.
@access 		Public
*/
authRoute.post('/auth/login', validateDto(loginUserAjvValidate), loginUser);

export default authRoute;
