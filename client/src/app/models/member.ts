import { Photo } from "./photo"

export interface member {
  id: number
  username: string
  photoUrl: string
  age: number
  knownAs: string
  created: Date
  lastActive: Date
  city: string
  country: string
  gender: string
  introduction: string
  lookingFor: string
  interests: string
  photos: Photo[]
}

