import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {

  await request.jwtVerify()// busca o token e valida

  console.log(request.user.sub);
  
    
  return reply.status(200).send();
}
