import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserMatricsUseCase } from "@/use-cases/fectories/make-get-user-matrics-use-case";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
   
    const metricsGymUseCase = makeGetUserMatricsUseCase()

    const { checkInsCount } = await metricsGymUseCase.execute({
        userId: request.user.sub
    });

    return reply.status(200).send({
        checkInsCount,
    });
}
