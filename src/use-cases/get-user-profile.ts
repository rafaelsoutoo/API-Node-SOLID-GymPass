import { UsersRepository } from "@/repositories/users-repositorey";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resouce-not-found-erro";

interface GetUserProfileUseCaseRequest{ // oq presisa enviar
    userId: string // so vai recer o id do user como parametro
}

interface GetUserProfileUseCaseResponse {// oq espero devolver
    user: User
}
    
export class GetUserProfileUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({userId}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
        const  user = await this.usersRepository.findById(userId)

        if (!user){
            throw new ResourceNotFoundError()// caso seja diferente de user 
        }

        return {
            user,
        }
    }
}