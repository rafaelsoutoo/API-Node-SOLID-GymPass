import request from 'supertest'
import { app } from '@/app'
import { describe } from 'node:test'
import { afterAll, beforeAll, expect, it } from 'vitest'


describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able to authenticate', async () => {

        await request(app.server) // crio um user 
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john@gmail.com',
                password: '123456'
            })


        const response = await request(app.server)
            .post('/sessions')
            .send({
                email: 'john@gmail.com',
                password: '123456'
            })

        expect(response.statusCode).toEqual(200) 
        expect(response.body).toEqual({
            token: expect.any(String) // espero status 200 e um token como str
        })
    })
})