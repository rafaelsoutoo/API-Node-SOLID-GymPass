import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true }) // ela ver os cookie da minha requisição e vê se existe o refreshToken

    const { role } = request.user

    const token = await reply.jwtSign(
        { role },
        {
            sign: {
                sub: request.user.sub
            }
        }) // serve para criar um novo token

    const refreshToken = await reply.jwtSign(
        { role }, {
        sign: {
            sub: request.user.sub,
            expiresIn: '7d', //perderá a auth se ficar 7 dias sem entrar, pois a cada 10m é atualizado o jwt
        }
    })

    return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/', // quaais rotas tem acesso, no caso de / todas
            secure: true, // o cookie será encriptado através de HTTPs
            sameSite: true, // esse cookie só vai ser acessivél dentro do mesmo domínio
            httpOnly: true //apenas acessado pelo backEnd


        })
        .status(200)
        .send({
            token
        });

}
