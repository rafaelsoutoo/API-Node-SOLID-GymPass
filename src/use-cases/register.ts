import { UsersRepository } from "@/repositories/users-repositorey";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  //para criar uma user precisamos..
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6); // 6 é o rounts, hash codifica a senha do user

    const userWithSomeEmail = await this.usersRepository.findByEmail(email)
    if (userWithSomeEmail) {
      throw new UserAlreadyExistsError
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
