import { it, describe, expect, beforeEach} from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './checkin'

let checkInsRepository: inMemoryCheckInsRepository
let sut: CheckinUseCase

describe('Check-In Use Case', ()=> {
    beforeEach(() =>{
        checkInsRepository = new inMemoryCheckInsRepository()
        sut = new CheckinUseCase(checkInsRepository)
    })
    
    it('should be able to check in', async()=> { 
        const {checkIn} = await sut.execute({
            gymId: 'g01',
            userId: 'u01'
        })
        expect(checkIn.id).toEqual(expect.any(String)) // espreo q o id retornado seja igual há qualquer str
    })

})