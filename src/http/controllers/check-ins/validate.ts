import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeValidateCheckInUseCase } from "@/use-cases/fectories/make-validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {

    const validateCheckInParmsSchema = z.object({
        checkInId: z.string().uuid()
    })


    const { checkInId } = validateCheckInParmsSchema.parse(request.params);

    const validateCheckInUseCase = makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({
        checkInId
    });

    return reply.status(204).send();
}
