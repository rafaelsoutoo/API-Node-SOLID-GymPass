import { fastify } from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie  from "@fastify/cookie";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { usersRoutes } from "./http/controllers/users/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();


app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false // n é um cookie assinado
    },
    sign: {
        expiresIn: '10m' 
    }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)


app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) { // se o erro for do zod é error de validação
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format })
    }
    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {

    }

    return reply.status(500).send({ message: 'Internal server Error' })
})