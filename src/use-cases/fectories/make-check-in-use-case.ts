import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckinUseCase } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInUseCase(){
    const checkInRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository()
    const userCase = new CheckinUseCase(checkInRepository, gymsRepository);

    return userCase
}