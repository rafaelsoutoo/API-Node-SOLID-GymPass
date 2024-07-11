import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCheckInUseCase } from "@/use-cases/fectories/make-check-in-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const createCheckInParmsSchema = z.object({
        gymId: z.string().uuid()
    })

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90 // tanto negativo e positivo
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),

    });

    const { gymId } = createCheckInParmsSchema.parse(request.params);
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

    const createCheckInUseCase = makeCheckInUseCase()

    await createCheckInUseCase.execute({
        gymId,
        userId: request.user.sub,
        userLatitude: latitude,
        userLongitude: longitude
    });

    return reply.status(201).send();
}
