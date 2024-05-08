import { it, describe, expect, beforeEach} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: inMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', ()=> {
    beforeEach(() =>{
        usersRepository = new inMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })
    
    it('should be able to register', async()=> { // deve ser possivelregistart
        const {user} = await sut.execute({
            name: 'Jonh',
            email: 'jonhasdas@gmail.com',
            password: '123456',
        })
        expect(user.id).toEqual(expect.any(String)) // espreo q o id retornado seja igual há qualquer str
    })

    it('should hash user password upon registration', async()=> { // a senha deve ser hash assim q se cadastrar
        const {user} = await sut.execute({
            name: 'Jonh',
            email: 'jonhasdas@gmail.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true) // espreo que minha comparação da senha senha true paraq o hash 
    })
    it('should not be ableto register with same email twice', async()=> { // nao deve ser possivel cadastrar com dois emais 
        const email = 'johntest@example.com'

        await sut.execute({
            name: 'Jonh',
            email,
            password: '123456',
        })

        await expect(()=>
            sut.execute({
                name: 'Jonh',
                email,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError) // caso retorna esse erro , esta correto

    })
})