import request from 'supertest'
import { app } from '@/app'
import { describe } from 'node:test'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { CreateAndAutheticateUser } from '@/utils/test/create-and-authenticate-user'


describe('Search Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able search gyms', async () => {
        const {token} = await CreateAndAutheticateUser(app, true)

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
                latitude: -16.2866407,
                longitude: -48.9505168,
            })


            const response = await request(app.server)
                .get('/gyms/search')
                .query({
                    q: 'Java'
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