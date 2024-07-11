import request from 'supertest'
import { app } from '@/app'
import { describe } from 'node:test'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { CreateAndAutheticateUser } from '@/utils/test/create-and-authenticate-user'


describe('Nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able to list nearby gyms', async () => {
        const { token } = await CreateAndAutheticateUser(app)


        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaJs Gym',
                description: 'Some description',
                phone: '119999999',
                latitude: -16.2866407,
                longitude: -48.9505168,
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Type Gym',
                description: 'Some description',
                phone: '119999999',
                latitude: -16.1960461,
                longitude: -48.707501,
            })


        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -16.2866407,
                longitude: -48.9505168,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()


        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaJs Gym'
            })
        ])
    })
})