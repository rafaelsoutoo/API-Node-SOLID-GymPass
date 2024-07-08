import { fetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository();
    const userCase = new fetchNearbyGymsUseCase(gymsRepository);

    return userCase
}