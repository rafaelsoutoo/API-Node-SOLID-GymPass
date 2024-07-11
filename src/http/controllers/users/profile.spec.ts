import request from 'supertest'
import { app } from '@/app'
import { describe } from 'node:test'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { CreateAndAutheticateUser } from '@/utils/test/create-and-authenticate-user'


describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able to get user profile', async () => {
        const {token} = await CreateAndAutheticateUser(app)

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()


        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: 'john@gmail.com'
        }))
    })
})