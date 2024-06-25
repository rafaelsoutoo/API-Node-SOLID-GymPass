import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUseCaseRequest{ // oq vai precisar
    userId: string
    page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {// oq vai retornar
    checkIns: CheckIn[]
}
    
export class FetchUserCheckInsHistoryUseCase{
    constructor(
        private checkinRepository: CheckInsRepository,
    ){}

    async execute({
        userId,
        page 
    }:FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse>{
        const checkIns = await this.checkinRepository.findManyByUserId(userId, page)

        return {
            checkIns,
        }
    }
}