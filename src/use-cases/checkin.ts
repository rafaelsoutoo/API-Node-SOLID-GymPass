import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckinUseCaseRequest{ // oq vai precisar
    userId: string
    gymId: string
}

interface CheckinUseCaseResponse {// oq vai retornar
    checkIn: CheckIn
}
    
export class CheckinUseCase{
    constructor(private checkinRepository: CheckInsRepository){}

    async execute({userId, gymId}: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse>{
        const checkIn = await this.checkinRepository.create({
            gym_id: gymId,
            user_id: userId,
        })

        return {
            checkIn,
        }
    }
}