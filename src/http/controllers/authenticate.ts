import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/fectories/make-authenticate-use-case";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  //criação do user
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body); //validação desses dados, throw automatico

  try {
    const authenticateUseCase = makeAuthenticateUseCase()


    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError){
      return reply.status(400).send({message: error.message}); 
    }
    throw error
  }

  return reply.status(200).send();
}
