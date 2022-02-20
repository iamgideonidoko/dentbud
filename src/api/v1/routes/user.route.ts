import { Router } from 'express';
import { registerUser } from '../controllers/user.controller';

const router = Router();

/*
@route          POST api/users/reguser (reg user)
@description    Register a new user.
@access         Public
*/

router.post('/user', registerUser);

export default router;
