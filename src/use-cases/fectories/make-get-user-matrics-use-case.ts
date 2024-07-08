import { GetUserMetricsUseCase } from "../get-user-matrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMatricsUseCase(){
    const checkInRepository = new PrismaCheckInsRepository();
    const userCase = new GetUserMetricsUseCase(checkInRepository);

    return userCase
}