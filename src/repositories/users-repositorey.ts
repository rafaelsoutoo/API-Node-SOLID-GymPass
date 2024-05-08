import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>; // recebo o email e devolvo o user ou null
  create(data: Prisma.UserCreateInput): Promise<User>;
}
