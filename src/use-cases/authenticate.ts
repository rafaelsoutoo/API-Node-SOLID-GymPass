import { UsersRepository } from "@/repositories/users-repositorey";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUserCaseRequest{ // oq presisa enviar
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {// oq espero devolver
    user: User
}
    
export class AuthenticateUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({email, password}: AuthenticateUserCaseRequest): Promise<AuthenticateUseCaseResponse>{
        const  user = await this.usersRepository.findByEmail(email)

        if (!user){
            throw new InvalidCredentialsError()// caso seja diferente de user 
        }

        const doesPasswordMatches = await compare(password, user.password_hash)// compere pega a senha sem o hash uma gerada e compara
        
        if (!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return {
            user,
        }
    }
}