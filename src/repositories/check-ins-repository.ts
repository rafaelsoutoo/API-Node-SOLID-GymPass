import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>; // utilizado o Unchecked quando preciso fazer uma relação cocom os componentes ja exixtentes
    
}