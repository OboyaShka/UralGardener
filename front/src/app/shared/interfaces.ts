export interface User {
  _id?: string
  phone: string
  password: string
  email?: string
  fio?: string
}

export interface AuthResponse {
  accessToken: string
  expiresIn: string
}
