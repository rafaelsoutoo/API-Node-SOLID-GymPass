import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './check-in'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberCheckInsErro } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: inMemoryGymsRepository
let sut: CheckinUseCase

describe('Check-In Use Case', () => {
    beforeEach(async() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new inMemoryGymsRepository()
        sut = new CheckinUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'g01',
            title: 'Java Gym',
            description: '',
            phone: '',
            latitude: -16.2866407,
            longitude: -48.9505168     
            
        }) 

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })// se eu for usar os test dps usará as datas reias

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'g01',
            userId: 'u01',
            userLatitude: -16.2866407,
            userLongitude: -48.9505168,
        })

        console.log(checkIn.created_at)
        expect(checkIn.id).toEqual(expect.any(String)) // espreo q o id retornado seja igual há qualquer str
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2002, 0, 20, 8, 0, 0))// garanto que os dois estão sendo criados na mesma data
        ''
        await sut.execute({
            gymId: 'g01',
            userId: 'u01',
            userLatitude: -16.2866407,
            userLongitude: -48.9505168,
        })

        await expect(() => sut.execute({
            gymId: 'g01',
            userId: 'u01',
            userLatitude: -16.2866407,
            userLongitude: -48.9505168,
        })).rejects.toBeInstanceOf(MaxNumberCheckInsErro)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2002, 0, 20, 8, 0, 0))// garanto que os dois estão sendo criados na mesma data

        await sut.execute({
            gymId: 'g01',
            userId: 'u01',
            userLatitude: -16.2866407,
            userLongitude: -48.9505168,
        })

        vi.setSystemTime(new Date(2002, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'g01',
            userId: 'u01',
            userLatitude: -16.2866407,
            userLongitude: -48.9505168,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {

        gymsRepository.items.push({ // criar uma academia com mais de 100m
            id: 'g02',
            title: 'Java Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-16.1960461),
            longitude: new Decimal(-48.707501),
        })

        await expect(() =>
            sut.execute({ // espero que quando executar dê erro
                gymId: 'g02',
                userId: 'u01',
                userLatitude: -16.2866407,
                userLongitude: -48.9505168,
            })).rejects.toBeInstanceOf(MaxDistanceError)

    })
})