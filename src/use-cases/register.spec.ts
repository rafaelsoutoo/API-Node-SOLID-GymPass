import { it, describe, expect} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', ()=> {
    it('should hash user password ipon registration', async()=> { // a senha deve ser hash assim q se cadastrar
        
        const registerUseCase = new RegisterUseCase({
            
            async findByEmail(){
                return null
            },

            async create(data) {
                return{
                    id: 'user1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date(),

                }
                
            },
        })

        const {user} = await registerUseCase.execute({
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
})