import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resouce-not-found-erro";

interface ValidateCheckInUseCaseRequest{ // oq vai precisar
    checkeInId: string
}

interface ValidateCheckInUseCaseResponse {// oq vai retornar
    checkIn: CheckIn
}
    
export class ValidateCheckInUseCase{
    constructor(
        private checkinRepository: CheckInsRepository,
    ){}

    async execute({
        checkeInId
    }:ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse>{
        const checkIn = await this.checkinRepository.findById(checkeInId)

        if (!checkIn){
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date()

        await this.checkinRepository.save(checkIn)

       
        return {
            checkIn,
        }
    }
}