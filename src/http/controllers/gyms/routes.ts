import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { search } from './search';
import { nearby } from './nearby';
import { create } from './create';

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT) // chamara o middlewares sempre para todas rotas aq

    app.post('/gyms', create)

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)
  

}