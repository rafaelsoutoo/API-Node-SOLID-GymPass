import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface GetUserMetricsUseCaseRequest{ // oq vai precisar
    userId: string
}

interface GetUserMetricsUseCaseResponse {// oq vai retornar
    checkInsCount: number
}
    
export class GetUserMetricsUseCase{
    constructor(
        private checkinRepository: CheckInsRepository,
    ){}

    async execute({
        userId,
    }:GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse>{
        const checkInsCount = await this.checkinRepository.countByUserId(userId)

        return {
            checkInsCount,
        }
    }
}