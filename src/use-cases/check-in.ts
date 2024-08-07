import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resouce-not-found-erro' 
import { getDistanceBetwennCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumberCheckInsErro } from '@/use-cases/errors/max-number-of-check-ins-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calculate distance between user and gym
    const distance = getDistanceBetwennCoordinates( //passa as cordenada da academia e do usuário
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) { //se a distancia for maior que 100m da erro
      throw new MaxDistanceError()
    }



    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate( //antes de fazer o chekin
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {  //se tem o chekin no mesmo dia 
      throw new MaxNumberCheckInsErro()
    }


    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}