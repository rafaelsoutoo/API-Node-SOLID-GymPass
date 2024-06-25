import { it, describe, expect, beforeEach} from 'vitest'
import { RegisterUseCase } from './register'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: inMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', ()=> {
    beforeEach(() =>{
        gymsRepository = new inMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })
    
    it('should be able to create gym', async()=> { 
        const { gym } = await sut.execute({
            title: 'JavaJs Gym',
            description: null,
            phone: null,
            latitude: -16.2866407,
            longitude: -48.9505168,
        })
        expect(gym.id).toEqual(expect.any(String))
    })

})