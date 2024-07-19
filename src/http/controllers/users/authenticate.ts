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


    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    }) // serve para criar um novo token

    const refreshToken = await reply.jwtSign({}, {
      sign: {
        sub: user.id,
        expiresIn: '7d', //perderá a auth se ficar 7 dias sem entrar, pois a cada 10m é atualizado o jwt
      }
    })

    return reply
      .setCookie('refreshToken', refreshToken,{
        path: '/', // quaais rotas tem acesso, no caso de / todas
        secure: true, // o cookie será encriptado através de HTTPs
        sameSite: true, // esse cookie só vai ser acessivél dentro do mesmo domínio
        httpOnly: true //apenas acessado pelo backEnd


      })
      .status(200)
      .send({
        token
      });

  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error
  }

}
