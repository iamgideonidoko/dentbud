import { Router } from 'express';
import { registerUser } from '../controllers/user.controller';
import { newUserAjvValidate } from '../schemas/user.schema';
import validateDto from '../middlewares/validateDto.middleware';

const userRoute = Router();

/*
@route          POST /api/v1/user)
@description    Register a new user.
@access         Public
*/

userRoute.post('/user', validateDto(newUserAjvValidate), registerUser);

export default userRoute;
