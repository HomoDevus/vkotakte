import { Types } from 'mongoose'

type User = {
  email?: string
  name?: string
  age?: number
  city?: string
  avatar?: string
  _id: Types.ObjectId
}

export function mapUserResponse(userData: User) {
  return {
    email: userData.email,
    name: userData.name,
    age: userData.age,
    city: userData.city,
    avatar: userData.avatar,
    id: userData._id,
  }
}

export function mapUserUpdate(userData: User) {
  return {
    name: userData.name,
    age: userData.age,
    city: userData.city,
    avatar: userData.avatar,
  }
}
