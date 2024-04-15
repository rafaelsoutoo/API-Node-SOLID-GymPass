import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  //para criar uma user precisamos..
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6); // 6 é o rounts, hash codifica a senha do user

  const userWithSomeEmail = await prisma.user.findUnique({
    //funcao para email repetido
    where: {
      email,
    },
  });
  if (userWithSomeEmail) {
    throw new Error("E-mail already exists.");
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });
}
