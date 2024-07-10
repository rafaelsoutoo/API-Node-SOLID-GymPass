import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT) // chamara o middlewares sempre para todas rotas aq
  

}
