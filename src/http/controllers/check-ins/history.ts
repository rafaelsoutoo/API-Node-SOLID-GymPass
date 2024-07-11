import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFeatchUserCheckInsHistoryUseCase } from "@/use-cases/fectories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1) // converte p/ number

    });

    const {  page } = checkInHistoryQuerySchema.parse(request.query);

    const fetchUserCheckINHistoryUseCase = makeFeatchUserCheckInsHistoryUseCase()

    const { checkIns } = await fetchUserCheckINHistoryUseCase.execute({
        userId: request.user.sub,
        page
    });

    return reply.status(200).send({
        checkIns,
    });
}
