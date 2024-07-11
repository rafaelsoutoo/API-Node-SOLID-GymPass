import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/fectories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90 // tanto negativo e positivo
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),

    });

    const {latitude, longitude} = nearbyGymsQuerySchema.parse(request.query);

    const nearbyGymUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } = await nearbyGymUseCase.execute({userLatitude: latitude, userLongitude: longitude});

    return reply.status(200).send({
        gyms,
    });
}
