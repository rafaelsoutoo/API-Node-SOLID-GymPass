import { it, describe, expect, beforeEach, vi, afterEach} from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './checkin'

let checkInsRepository: inMemoryCheckInsRepository
let sut: CheckinUseCase

describe('Check-In Use Case', ()=> {
    beforeEach(() =>{
        checkInsRepository = new inMemoryCheckInsRepository()
        sut = new CheckinUseCase(checkInsRepository)


        vi.useFakeTimers()
    })

    afterEach(()=> {
        vi.useRealTimers()
    })// se eu for usar os test dps usará as datas reias
    
    it('should be able to check in', async()=> { 
        const {checkIn} = await sut.execute({
            gymId: 'g01',
            userId: 'u01'
        })

        console.log(checkIn.created_at)
        expect(checkIn.id).toEqual(expect.any(String)) // espreo q o id retornado seja igual há qualquer str
    })

    it('should not be able to check in twice in the same day', async()=> { 
        vi.setSystemTime(new Date(2002, 0, 20, 8, 0, 0))// garanto que os dois estão sendo criados na mesma data
        
        await sut.execute({
            gymId: 'g01',
            userId: 'u01'
        })

        await expect(()=> sut.execute({
            gymId: 'g01',
            userId: 'u01'
        })).rejects.toBeInstanceOf(Error) 
       })

       it('should be able to check in twice but in different days', async()=> { 
        vi.setSystemTime(new Date(2002, 0, 20, 8, 0, 0))// garanto que os dois estão sendo criados na mesma data
        
        await sut.execute({
            gymId: 'g01',
            userId: 'u01'
        })

        vi.setSystemTime(new Date(2002, 0, 21, 8, 0, 0))

        const {checkIn} = await sut.execute({
            gymId: 'g01',
            userId: 'u01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
       })

})