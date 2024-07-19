import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAutheticateUser(app: FastifyInstance, isAdmin = false) {
    await prisma.user.create({
        data: {
            name: 'Rafale',
            email: 'john@gmail.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
    })

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'john@gmail.com',
            password: '123456'
        })

    const { token } = authResponse.body

    return { token }
}