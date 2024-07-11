import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAutheticateUser(app: FastifyInstance) {
    await request(app.server) // crio um user 
        .post('/users')
        .send({
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456'
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