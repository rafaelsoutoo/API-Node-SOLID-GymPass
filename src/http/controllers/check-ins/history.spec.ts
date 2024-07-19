import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateAndAutheticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-in History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list history of check-ins', async () => {
    const { token } = await CreateAndAutheticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({ // crio a academia
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    await prisma.checkIn.createMany({
        data: [
            {
                gym_id: gym.id,
                user_id: user.id
            },
            {
                gym_id: gym.id,
                user_id: user.id
            }
        ]
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([ // espero que dentro do body tenho uma arry com vários obj
        expect.objectContaining({
            gym_id: gym.id,
            user_id: user.id
        }),
        expect.objectContaining({
            gym_id: gym.id,
            user_id: user.id
        })
    ])
  })
})