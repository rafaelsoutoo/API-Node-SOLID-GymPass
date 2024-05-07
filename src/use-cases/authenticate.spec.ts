import { it, describe, expect} from 'vitest'
import { hash } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', ()=> {
    it('should be able to authenticate', async ()=> {
        const usersRepository = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)


        await usersRepository.create({ // criando um user pra auth
            name: 'rafaelsena',
            email: 'rafael@gmail.com',
            password_hash: await hash('123456', 6),
        })

        const {user} = await sut.execute({
            email: 'rafael@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })
    it('should not be able to authenticate with wrong email', async ()=> {
        const usersRepository = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        expect(()=> sut.execute({
            email: 'rafael@gmail.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
    it('should not be able to authenticate with wrong password', async ()=> {
        const usersRepository = new inMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)


        await usersRepository.create({ // criando um user pra auth
            name: 'rafaelsena',
            email: 'rafael@gmail.com',
            password_hash: await hash('123456', 6),
        })


        expect(()=> sut.execute({
            email: 'rafael@gmail.com',
            password: '123123'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})