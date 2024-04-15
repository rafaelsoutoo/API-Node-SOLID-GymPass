import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repositorey";
import { hash } from "bcryptjs";

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
      throw new Error("E-mail already exists.");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
