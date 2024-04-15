import { prisma } from "@/lib/prisma";
import {Prisma} from '@prisma/client'


export class PrismaUsersRepository {//todos operações do database sempre pasaram nos repositorios
    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data,
          });

          return user
    }
}

