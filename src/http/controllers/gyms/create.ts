import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateGymUseCase } from "@/use-cases/fectories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90 // tanto negativo e positivo
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    });

    const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body); 

    const createGymUseCase = makeCreateGymUseCase()

    await createGymUseCase.execute({
        title, description, phone, latitude, longitude
    });

    return reply.status(201).send();
}
