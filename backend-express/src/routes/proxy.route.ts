import { Router } from 'express';
import validateDto from '../middlewares/validateDto.middleware';
import { converseRasaAjvValidate } from '../schemas/proxy.schema';
import { converseRasa } from '../controllers/proxy.controller';

const proxyRoute = Router();

/*
@route 			POST /api/proxy/rasa/converse (chat rasa)
@description 	converse dentbud rasa ai
@access 		Public
*/
proxyRoute.post('/rasa/converse', validateDto(converseRasaAjvValidate), converseRasa);

export default proxyRoute;
