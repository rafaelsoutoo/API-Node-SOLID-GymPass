import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFeatchUserCheckInsHistoryUseCase(){
    const checkInRepository = new PrismaCheckInsRepository();
    const userCase = new FetchUserCheckInsHistoryUseCase(checkInRepository);

    return userCase
}