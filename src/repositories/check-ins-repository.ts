import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>; // utilizado o Unchecked quando preciso fazer uma relação cocom os componentes ja exixtentes
    save(checkIn: CheckIn): Promise<CheckIn>; 
    findByUserIdOnDate(userId: string, data: Date): Promise<CheckIn | null>
    findById(id: string): Promise<CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise <CheckIn[]>
    countByUserId(userId: string): Promise<number>
}