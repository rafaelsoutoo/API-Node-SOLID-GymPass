import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>; // recebo o email e devolvo o user
  create(data: Prisma.UserCreateInput): Promise<User>;
}
