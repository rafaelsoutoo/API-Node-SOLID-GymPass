import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resouce-not-found-erro";

interface CheckinUseCaseRequest{ // oq vai precisar
    userId: string
    gymId: string
    userLatitude:number
    userLongitude: number
}

interface CheckinUseCaseResponse {// oq vai retornar
    checkIn: CheckIn
}
    
export class CheckinUseCase{
    constructor(
        private checkinRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    
    ){}

    async execute({userId, gymId}:CheckinUseCaseRequest): Promise<CheckinUseCaseResponse>{
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym){
            throw new ResourceNotFoundError()
        }
        
        const checkInOnSameDate = await this.checkinRepository.findByUserIdOnDate(
            userId,
            new Date()
        )
        if (checkInOnSameDate){
            throw new Error()
        }

        const checkIn = await this.checkinRepository.create({
            gym_id: gymId,
            user_id: userId,
        })

        return {
            checkIn,
        }
    }
}