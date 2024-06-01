import { it, describe, expect, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository' 
import { CheckinUseCase } from './check-in'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: inMemoryGymsRepository
let sut: CheckinUseCase

describe('Check-In Use Case', ()=> {
    beforeEach(() =>{
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new inMemoryGymsRepository()
        sut = new CheckinUseCase(checkInsRepository, gymsRepository)

        gymsRepository.items.push({
            id: 'g01',
            title: 'Java Gym',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })


        vi.useFakeTimers()
    })

    afterEach(()=> {
        vi.useRealTimers()
    })// se eu for usar os test dps usará as datas reias
    
    it('should be able to check in', async()=> {
        const {checkIn} = await sut.execute({
            gymId: 'g01',
            userId: 'u01',
            userLatitude: 0,
            userLongitude: 0,
        })

        console.log(checkIn.created_at)
        expect(checkIn.id).toEqual(expect.any(String)) // espreo q o id retornado seja igual há qualquer str
    })

    it('should not be able to check in twice in the same day', async()=> { 
        vi.setSystemTime(new Date(2002, 0, 20, 8, 0, 0))// garanto que os dois estão sendo criados na mesma data
        
        await sut.execute({
            gymId: 'g01',
            userId: 'u01',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(()=> sut.execute({
            gymId: 'g01',
            userId: 'u01',
            userLatitude: 0,
            userLongitude: 0,
        })).rejects.toBeInstanceOf(Error) 
       })

       it('should be able to check in twice but in different days', async()=> { 
        vi.setSystemTime(new Date(2002, 0, 20, 8, 0, 0))// garanto que os dois estão sendo criados na mesma data
        
        await sut.execute({
            gymId: 'g01',
            userId: 'u01',
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2002, 0, 21, 8, 0, 0))

        const {checkIn} = await sut.execute({
            gymId: 'g01',
            userId: 'u01',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toEqual(expect.any(String))
       })

})