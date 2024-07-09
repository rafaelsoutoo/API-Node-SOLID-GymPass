// test enviroment consegue mudar variaveis de ambientes apenas para testes especificos
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {//vai receber o nome schema
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)//vai ler essa url

  url.searchParams.set('schema', schema)

  return url.toString()
}


export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',

  async setupVM() {
    const vm = await import('node:vm')
    const context = vm.createContext()
    return {
      getVmContext() {
        return context
      },
      teardown() {

      }
    }
  },
  setup() {//qual código quero executar antes do meus arquivos de teste
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE` // vai ser apagada logo em seguida
        )
        await prisma.$disconnect()

      }
    }
  }
}

// npm link
// vai criar um pacote local na minha maquina
// npm link vitest-environment-prisma, cria dentro do meu projeto





