import request from 'supertest'
import { app } from '@/app'
import { describe } from 'node:test'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { CreateAndAutheticateUser } from '@/utils/test/create-and-authenticate-user'


describe('Create Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able to create a gym', async () => {
        const { token } = await CreateAndAutheticateUser(app, true)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaJs Gym',
                description: 'Some description',
                phone: '119999999',
                latitude: -16.2866407,
                longitude: -48.9505168,
            })


        expect(response.statusCode).toEqual(201)
    })
})