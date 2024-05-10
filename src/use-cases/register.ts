import { UsersRepository } from "@/repositories/users-repositorey"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "@prisma/client"

interface RegisterUseCaseRequest {
  //para criar uma user precisamos..
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse{ //qual o tipo de resposta que esse caSO DE USO VAI TER
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6); // 6 é o rounts, hash codifica a senha do user

    const userWithSomeEmail = await this.usersRepository.findByEmail(email)
    
    if (userWithSomeEmail) {
      throw new UserAlreadyExistsError
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
