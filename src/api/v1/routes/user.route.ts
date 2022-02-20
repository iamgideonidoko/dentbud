import { Router } from 'express';
import { registerUser } from '../controllers/user.controller';

const userRoute = Router();

/*
@route          POST /api/v1/user)
@description    Register a new user.
@access         Public
*/

userRoute.post('/user', registerUser);

export default userRoute;
