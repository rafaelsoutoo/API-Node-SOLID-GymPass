import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository' 
import { expect, describe, it, beforeEach } from 'vitest'
import { fetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: inMemoryGymsRepository
let sut: fetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new fetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -16.2866407,
      longitude: -48.9505168,
    })

    await gymsRepository.create({
        title: 'Far Gym',
        description: null,
        phone: null,
        latitude: -16.1960461,
        longitude: -48.707501,
    })

    const { gyms } = await sut.execute({
        userLatitude: -16.2866407,
        userLongitude: -48.9505168,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' }),
    ])
  })

 
})