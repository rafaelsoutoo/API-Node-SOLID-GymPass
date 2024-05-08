import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repositorey";

export class PrismaUsersRepository implements UsersRepository {
  
  findById(id: string): Promise<User| null> {
    throw new Error ('jkbasjdkbajsb')
    
  }
  
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user
  } //todos operações do database sempre pasaram nos repositorios
  
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
